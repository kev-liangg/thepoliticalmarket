import React from 'react';
import { Nav, Navbar} from 'react-bootstrap';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
const Styles = styled.div`
    .navbar{
        background-color: #2f566a
    }
    .navbar-brand, navbar-nav nav-link{
        color: #bbb;
        &:hover{
            color: white;
        }
    }
`;

const NavigationBar = () => (
    <Styles>
        <Navbar expand="lg">
            <Navbar.Brand href = "/">Home</Navbar.Brand>
            <Navbar.Toggle aria-controls = "basic-navbar-nav" />
            <Navbar.Collapse id ="basic-navbar-nav">
            <Nav className="ml-auto"> 
          <Nav.Item>
            <Nav.Link>
              <Link to="/Contracts">Contracts</Link>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>
              <Link to="/Stocks">Stocks</Link>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>
              <Link to="/CampFin">Campaign Finance</Link>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>
              <Link to="/About">About</Link>
            </Nav.Link>
          </Nav.Item>
        </Nav>
            </Navbar.Collapse>
        </Navbar>
    </Styles>
)

export default NavigationBar;