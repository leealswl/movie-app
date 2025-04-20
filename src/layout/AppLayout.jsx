import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Outlet} from 'react-router-dom'; //라우터 안에있는 자손들 가져옴
import './AppLayout.style.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Footer from '../Footer/Footer';


const AppLayout = () => {
  return (
    <div>
    <Navbar expand="lg" className="bg-body-tertiary">
    <Container fluid>
      <Navbar.Brand href="/">
        <img src="/main-logo.png" 
        alt="Movie-Day Logo"
        width={120}
        height={100}
        className='nav-logo'
         />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: '100px' }}
          navbarScroll
        >
          <Nav.Link href="/" className='nav-home'>Home</Nav.Link>
          <Nav.Link href="/movies" className='nav-movies'>Movies</Nav.Link>
          
    
        </Nav>
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
          <Button variant="danger">
            <i className="bi bi-search"></i>
            </Button>
        </Form>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  <Outlet />
  <Footer/>
  </div>
    
  )
}

export default AppLayout