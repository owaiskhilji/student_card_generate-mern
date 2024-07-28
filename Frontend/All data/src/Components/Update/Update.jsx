import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

function Update() {
  let [name, setName] = useState("");
  let [course, setCourse] = useState("");
  let [batch, setBatch] = useState('');
  let [rollno, setRollno] = useState('');
  let [error, setError] = useState("");
  let [showModal, setShowModal] = useState(true);
  let navigate = useNavigate()
  const { id } = useParams();

  const getData = async () => {
    let response = await fetch(`http://localhost:5000/api/users/${id}`);
    let result = await response.json();
    console.log(result);
    if (!result.ok) {
      setError(result.error);
    } else {
      setError("");
      setName(result.name);
      setCourse(result.course);
      setBatch(result.batch);
      setRollno(result.rollno)
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleEdit = async (e) => {
    e.preventDefault();
    let updateUser = { name, course, batch,rollno };
    let response = await fetch(`http://localhost:5000/api/users/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updateUser),
      headers: {
        'Content-Type': 'application/json'
      },
    });
    let result = await response.json();
    console.log(result);
    navigate("/read");
    if (!result.ok) {
      setError(result.error);
    } else {
      setError("");
      setShowModal(false);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    navigate("/read");
  };

  return (
    <div className="container   mt-5">
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enter the data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleEdit}>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Roll no</label>
              <input required
                type="text"
                value={rollno}
                onChange={(e) => setRollno(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="course" className="form-label">Course</label>
              <input required
                type="text"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="batch" className="form-label">Batch No</label>
              <input required
                type="number"
                value={batch}
                onChange={(e) => setBatch(e.target.value)}
                className="form-control"
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Submit</button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Update;

