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
        <img src='data:image/png;base64,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'
        alt=''
        width={120}
        height={80}
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