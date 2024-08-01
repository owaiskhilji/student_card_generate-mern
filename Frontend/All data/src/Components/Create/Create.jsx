import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function Create() {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [batch, setBatch] = useState('');
  const [rollno, setRollno] = useState('');
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    let addUser = { name, course, batch,rollno };
    try {
      const response = await fetch("http://localhost:5000/api/users/", {
        method: 'POST',
        body: JSON.stringify(addUser),
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const result = await response.json();
      if (!response.ok) {
        setError(result.error);
      } else {
        setError("");
        navigate("/read");
        console.log("Data fetch is Done:", result);
      }
    } catch (error) {
      setError("An error occurred while creating the user.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mt-5">
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
                  <label htmlFor="name" className="form-label">Name : </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => { setName(e.target.value) }}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="rollno" className="form-label">Roll No :</label>
                  <input
                    type="number"
                    value={rollno}
                    onChange={(e) => { setRollno(e.target.value) }}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="course" className="form-label">Course :</label>
                  <input
                    type="text"
                    value={course}
                    onChange={(e) => { setCourse(e.target.value) }}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="batch" className="form-label">Batch No :</label>
                  <input
                    type="number"
                    value={batch}
                    onChange={(e) => { setBatch(e.target.value) }}
                    className="form-control"
                    required
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
