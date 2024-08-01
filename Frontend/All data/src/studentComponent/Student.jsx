import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Studentportal/Student.css'

function Student() {
  let [rollNumber, setRollNumber] = useState("");
  let [studentCard, setStudentCard] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // fetch student api
    fetch(`http://localhost:5000/api/users/studentCard/${rollNumber}`)
      .then(data => data.json())
      .then(data =>{if (!data.rollno) {
        alert("Some fields are empty in the student data.");
      } else{
        setStudentCard(data)
      }
      setRollNumber("")
      });
  };

  const saveCard = () => {
    const getElement = document.getElementById("student-card");
    html2canvas(getElement).then((canvas) => {
      canvas.toBlob(blob => saveAs(blob, "student-card.png"));
    });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Student Portal</h1>
      <Form onSubmit={handleSubmit} className="mb-4">
        <Form.Group className="mb-3" controlId="formRollNumber">
          <Form.Control
            type="text"
            placeholder="Enter your roll number"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          View Card
        </Button>
      </Form>

      {studentCard && (
        <div id="student-card" className="student-card">
          <h2 className="text-center">Identity Card</h2>
          <p><strong>Name:</strong> {studentCard.name}</p>
          <p><strong>Course:</strong> {studentCard.course}</p>
          <p><strong>Roll no:</strong> {studentCard.rollno}</p>
          <p><strong>Batch Number:</strong> {studentCard.batch}</p>
          {/* Add more fields as necessary */}
        </div>
      )}
      {studentCard && (
        <div className="text-center mt-3">
          <Button variant="success" onClick={saveCard}>Save</Button>
        </div>
      )}
    </div>
  );
}

export default Student;
