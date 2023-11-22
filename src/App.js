import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Navbar expand="lg" className="bg-body-tertiary app-navbar">
        <Container>
          <Navbar.Brand to="/" as={Link}>
            Rewards
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/transactions">
                Transactions
              </Nav.Link>
              <Nav.Link as={Link} to="/points">
                Points
              </Nav.Link>
              <Nav.Link as={Link} to="/monthly">
                Monthly points
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <Outlet />
      </Container>
    </div>
  );
}

export default App;
