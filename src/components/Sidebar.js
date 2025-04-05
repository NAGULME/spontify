import React from 'react';
import { Nav } from 'react-bootstrap';
import '../styles/Sidebar.scss';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Nav className="flex-column">
        <Nav.Link className="nav-item active">
          <i className="fas fa-home"></i>
          For You
        </Nav.Link>
        <Nav.Link className="nav-item">
          <i className="fas fa-chart-line"></i>
          Top Tracks
        </Nav.Link>
        <Nav.Link className="nav-item">
          <i className="fas fa-heart"></i>
          Favorites
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;
