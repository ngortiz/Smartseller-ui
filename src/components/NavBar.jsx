import React from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import './styles.css'

const NavBar = () => {
  return (
    <Navbar expand='lg'>
      <Container>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <img
              src='src/imagenes/icono.png'
              width='50'
              alt='Logo de la página web'
            ></img>
            <Nav.Link href='#home'>Inicio</Nav.Link>
            <Nav.Link href='#link'>Productos</Nav.Link>
            <Nav.Link href='#link'>Administracion</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <NavDropdown id='basic-nav-dropdown'>
          <NavDropdown.Item href='#action/3.2'>
            Cambiar contraseña
          </NavDropdown.Item>
          <NavDropdown.Item href='#action/3.3'>Salir</NavDropdown.Item>
          <NavDropdown.Divider />
        </NavDropdown>
      </Container>
    </Navbar>
  )
}

export default NavBar
