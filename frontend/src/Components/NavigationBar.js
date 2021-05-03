import React from 'react';
import { Nav, Navbar} from 'react-bootstrap';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
const Styles = styled.div`
    .navbar {
        background-color: #2f566a
    }
    .navbar-brand, .navbar-nav, .nav-link {
        color: #bbb !important;
        &:hover{
            color: white !important;
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
            <Nav.Link as={Link} to="/Contracts">
              Contracts
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/Stocks">
              Stocks
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/CampFin">
              Campaign Finance
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/About">
              About
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/SiteSearch">
              Site Search
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/TPMVisuals">
              Visualizations
            </Nav.Link>
          </Nav.Item>
        </Nav>
            </Navbar.Collapse>
        </Navbar>
    </Styles>
)

export default NavigationBar;