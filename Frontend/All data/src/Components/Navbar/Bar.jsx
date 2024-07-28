import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom/dist';
function Bar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#">Students Generate Cards</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/">Generate Card</Nav.Link>
            <Nav.Link as={Link} to="/read" >All Card</Nav.Link>
            <Nav.Link as={Link} to="/student" >student portal</Nav.Link>
         
          </Nav>
                 </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Bar;