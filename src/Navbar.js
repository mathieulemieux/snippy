import React, { Component } from 'react';
import {Link}               from "react-router-dom";
import './navbar.module.css';


class Navbar extends Component {
  render() {
    return (
      <div>

        <nav className="navbar navbar-expand-sm navbar-light fixed-top bg-light main-nav py-3 shadow-sm" data-toggle="affix">
          <div className="container justify-content-center">
              <ul className="nav navbar-nav flex-fill w-100 flex-nowrap">
                  <li className="nav-item">
                      <Link to="/" className="nav-link">Accueil</Link>
                  </li>
                  <li className="nav-item">
                      <Link to="/search" className="nav-link">Choisir un gène</Link>
                  </li>
                  {/* <li className="nav-item">
                      <Link to="/variants" className="nav-link disabled">Visualiser</Link>
                  </li> */}
              </ul>
              <ul className="nav navbar-nav flex-fill justify-content-center">
                <a href="#" className="navbar-brand">
                  <img className="d-inline-block align-top mr-2" src="hipster.png" width="35" height="35" alt="" />
                </a>
              </ul>
              <ul className="nav navbar-nav flex-fill w-100 justify-content-end">
                  <li className="nav-item">
                      <a className="nav-link" href="#" data-toggle="modal" data-target="#aide"><small>Aide</small></a>
                  </li>
                  <li className="nav-item">
                      <a className="nav-link" href="#" data-toggle="modal" data-target="#apropos"><small>À propos</small></a>
                  </li>
              </ul>
          </div>
        </nav>

        {/* // <!-- Modal Aide--> */}
        <div id="aide" className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="aideTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="aideTitle">Aide</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                ...
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Fermer</button>
              </div>
            </div>
          </div>
        </div>

        {/* // <!-- Modal A propos--> */}
        <div id="apropos" className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="aproposTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="aproposTitle">À propos</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                ...
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Fermer</button>
              </div>
            </div>
          </div>
        </div>

    </div>
    )
  }
};

export default Navbar;