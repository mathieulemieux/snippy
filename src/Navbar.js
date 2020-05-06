import React, { Component } from 'react';
import {Link}               from "react-router-dom";
import './navbar.module.css';


class Navbar extends Component {
  render() {
    return (
      <div>

        {/* // <!-- Navbar --> */}
        <nav className="navbar navbar-expand-sm navbar-light fixed-top bg-light main-nav py-3 shadow-sm" data-toggle="affix">
          <div className="container justify-content-center">
              {/* // <!-- Left section ('Accueil' & 'Choisir un gène') --> */}
              <ul className="nav navbar-nav flex-fill w-100 flex-nowrap">
                  <li className="nav-item noselect">
                      <Link to={`${process.env.PUBLIC_URL}/`} className="nav-link">Accueil</Link>
                  </li>
                  <li className="nav-item noselect">
                      <Link to={`${process.env.PUBLIC_URL}/search`} className="nav-link">Commencer l'exploration!</Link>
                  </li>
                  {/* <li className="nav-item">
                      <Link to="/variants" className="nav-link disabled">Visualiser</Link>
                  </li> */}
              </ul>
              {/* // <!-- Mid section (Logo) --> */}
              <ul className="nav navbar-nav flex-fill justify-content-center">
                <a href={`${process.env.PUBLIC_URL}/`} className="navbar-brand noselect">
                  <img className="d-inline-block align-top mr-2" src="hipster.png" width="35" height="35" alt="" />
                </a>
              </ul>
              {/* // <!-- Right section ('Aide' & 'À propos') --> */}
              <ul className="nav navbar-nav flex-fill w-100 justify-content-end">
                  <li className="nav-item">
                      <a className="nav-link noselect" data-toggle="modal" data-target="#aide"><small>Aide</small></a> {/* href="#" */}
                  </li>
                  <li className="nav-item">
                      <a className="nav-link noselect" data-toggle="modal" data-target="#apropos"><small>À propos</small></a> {/* href="#" */}
                  </li>
              </ul>
          </div>
        </nav>

        {/* // <!-- Modal 'Aide' --> */}
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
                <p>La façon d’utiliser <i>Snippy</i> est plutôt intuitive :</p><br/>
                <ol>
                  <li>À partir de la page d'accueil, cliquez sur <i>Commencer l’exploration</i> dans la barre de navigation;</li>
                  <li>Identifier ensuite des gènes d'intérêt à l'aide de l'outil de recherche par mots-clés;</li>
                  <li>Parmi la liste des gènes obtenus, choisissez celui dont vous souhaitez explorer les variations génétiques en cliquant sur l'item correspondant;</li>
                  <li>Finalement, naviguez à travers la séquence du gène avec les flèches de déplacement latéral.</li>
                </ol>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Fermer</button>
              </div>
            </div>
          </div>
        </div>

        {/* // <!-- Modal 'A propos' --> */}
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
                  <p>
                    <i>Snippy</i> a été conçu et réalisé par Mathieu Lemieux et Mathieu Simard au printemps 2020 comme projet de session dans le cadre du cours BIF7104 du DESS en bioinformatique à l’UQAM.
                    <br/><br/>Pour plus d'informations, contactez-nous à <b>lemieux.mathieu@courrier.uqam.ca</b> et <b>simard.mathieu.7@courrier.uqam.ca</b> respectivement.
                  </p>
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