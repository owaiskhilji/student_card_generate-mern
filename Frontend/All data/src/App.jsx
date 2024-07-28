import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import  Nav  from './Components/Navbar/Bar'
import Update from './Components/Update/Update'
import Create from './Components/Create/Create'
import Read from './Components/Read/Read'
import Student from './studentComponent/Student'
function App() {
  return (
    
<div>
  <BrowserRouter>
  <Nav/>
  <Routes>
    <Route path='/' element={<Create/>}/>
    <Route path='/read' element={<Read/>}/>
    <Route path='/:id' element={<Update/>}/>
    <Route path='/student' element={<Student/>}/>
  </Routes> 
   </BrowserRouter>

</div>      
    
  )
}

export default App
