import React, { useState } from 'react'
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas'
function Student() {
let [rollNumber,setrollNumber] = useState("")
let [studentCard,setstudentCard] = useState(null)

const handleSubmit = (e) =>{
    e.preventDefault()
    // fetch student api
 fetch(`http://localhost:5000/api/users/studentCard/${rollNumber}`)
    .then(data => data.json())
    .then(data => setstudentCard(data))
}
function saveCard() {
const getElement = document.getElementById("student-card")
html2canvas(getElement).then((canvas) => {
    canvas.toBlob(blob => saveAs(blob , "student-card.png"))
})
}
    return (
        <div>
        <h1>Student Portal</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your roll number"
            value={rollNumber}
            onChange={(e) => setrollNumber(e.target.value)}
            required
          />
          <button type="submit">View Card</button>
        </form>
  
        {studentCard && (
        <div id='student-card' style={{border:"2px solid black"}}>
          <h2>Student Card</h2>
          <p>Name : {studentCard.name}</p>
          <p>Course : {studentCard.course}</p>
          <p>Roll no : {studentCard.rollno} </p>
          <p>Batch Number: {studentCard.batch}</p>
          {/* Add more fields as necessary */}
        </div>
      )}
<button onClick={saveCard}>save</button>
      </div>
  )
}

export default Student