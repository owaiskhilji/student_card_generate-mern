import React, { useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
function Create() {
  let [name, setName] = useState("");
  let [course, setcourse] = useState("");
  let [batch, setbatch] = useState('');
  let [rollno, setRollno] = useState('');
  let [error, setError] = useState("");
let getNavigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    getNavigate("/read")
    let addUser = { name, course, batch,rollno };
    let response = await fetch("http://localhost:5000/api/users/", {
      method: 'POST',
      body: JSON.stringify(addUser),
      headers: {
        'Content-Type': 'application/json'
      },
    });
    let result = await response.json();
    console.log(result)
    if (!result.ok) {
      setError(result.error);
      
    }
    else {
      setError("");
      console.log("Data fetch is Done:", result);
    }
  };

  return (
    <div className="container mt-5 ">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h2>Enter the data</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => { setName(e.target.value) }}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Roll No </label>
                  <input
                    type="number"
                    value={rollno}
                    onChange={(e) => { setRollno(e.target.value) }}
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Course</label>
                  <input
                    type="text"
                    value={course}
                    onChange={(e) => { setcourse(e.target.value) }}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="age" className="form-label">Batch No </label>
                  <input
                    type="number"
                    value={batch}
                    onChange={(e) => { setbatch(e.target.value) }}
                    className="form-control"
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Create;
