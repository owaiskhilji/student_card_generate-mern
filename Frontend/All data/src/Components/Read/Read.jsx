import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Link} from 'react-router-dom';
function Read() {
  let [data, setData] = useState([]);
  let [error, setError] = useState('');

  const getData = async () => {
    try {
      let response = await fetch("http://localhost:5000/api/users/");
      let result = await response.json();
      if (response.ok) {
        setData(result);
        setError('');
        console.log("Data fetch is Done:", result);
      } else {
        setError(result.error || 'An error occurred');
        console.log("loading.....");
      }
    } catch (error) {
      setError('Failed to fetch data');
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (id) => {
    let resDelete = await fetch(`http://localhost:5000/api/users/${id}`,{
      method: 'DELETE'
    })
    let result = await resDelete.json();
    if (resDelete.ok) {
      setError('Deleted Successfully');
  setTimeout(()=>{
    setError("");
    getData()
  },2000)
    } else {
      setError(result.error || 'An error occurred');
      console.log("loading.....");
    }
  }


  return (
    <div className="container mt-5">
      {error && <div className="alert alert-danger">{error}</div>}
      <h1>All Cards Generated </h1>
      <br />
      {data.length > 0 ? (
        <div className="row">
          {data.map((user, index) => (
            <div key={index} className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <h6 className="card-title">Name : {user.name}</h6>
                  <p className="card-text">Roll no : {user.rollno}</p>
                  <p className="card-text">Course : {user.course}</p>
                  <p className="card-text">Batch : {user.batch}</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                  <Button variant="outline-danger" style={{ marginRight: '5px', padding: '2px 8px' }} onClick={()=>handleDelete(user._id)}>Delete</Button>
                  <Button as={Link} to={`/${user._id}`} variant="outline-info" style={{ padding: '2px 8px' }}>Edit</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>Loading data...</div>
      )}
    </div>
  );
}

export default Read;
