import React, { Component } from 'react';
import {Link}               from "react-router-dom";

class Home extends Component {
  render() {
    return (
        <main role="main">
            
            {/* JUMBOTRON */}
            <div className="jumbotron">
                <div id="banner" className="container">
                    <h1 className="display-3">Tous et toutes différents</h1>
                    <p>Le génome humain s'étend sur 46 chromosomes et fait près de 3 milliards de nucléotides, l'alphabet de base de l'ADN.</p>
                    <p>Sans surprise, de nombreuses variations existent entre les individus et les populations.</p>
                    <p>Un SNP (<i>Single Nucleotide Polymorphism</i>) correspond à une différence au niveau d'un seul nucléotide;</p>
                    <p>c'est le type le plus commun de variation et on en compte de 4 à 5 millions d'une personne à l'autre!</p>
                    <p><strong>Snippy</strong> montre les SNPs dans les gènes et leur répartition entre populations.</p>
                    {/* <small>{"\u2020"} /snipster/</small> */}
                    <div>
                        <a className="btn btn-outline-primary btn-lg" href="" data-toggle="modal" data-target="#aide" role="button">Comment ça marche ?</a>
                        {/* <a className="btn btn-outline-primary btn-lg" role="button">Comment ça marche ?</a> */}
                        
                        {/* <a className="btn btn-outline-success btn-lg ml-2" href="#" role="button">Explorez</a> */}
                        <Link to={`${process.env.PUBLIC_URL}/search`} className="btn btn-outline-success btn-lg ml-2" role="button">Explorez</Link>
                    </div>
                </div>
            </div>

            {/* SECTIONS */}
            <div className="container">

                {/* CAROUSEL */}
                <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                    <ol class="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
                    </ol>
                    <div class="carousel-inner">
                        {/* SECTION 1 - 'Recenser la diversité génétique' */}
                        <div class="carousel-item active">
                            <section id="section1" className="row">
                                <div className="col-md-4 text-center">
                                    <img src="diversity3.png" className="img-fluid" alt="" width="285" height="285" />
                                </div>
                                <div className="col-md-8">
                                    <h2>Échantillonner la diversité génétique</h2>
                                    <p>
                                        Si le <i>Human genome Project</i> a mené à l'élaboration d'un génome humain 
                                        de référence, des initiatives subséquentes, tel le projet <i>1000 Genomes</i>, 
                                        ont permis d'échantillonner la diversité génétique humaine parmi les populations.
                                    </p>
                                </div>
                            </section>
                        </div>
                        {/* SECTION 2 - 'Analyse fonctionnelle' */}
                        <div class="carousel-item">
                            <section id="section2" className="row">
                                <div className="col-md-4 text-center">
                                    {/* <img src="protein.png" className="img-fluid" alt="" width="300" height="300" /> */}
                                    <img src="protein.png" className="img-fluid" alt="" width="182" height="182" />
                                </div>
                                <div className="col-md-8">
                                    <h2>Analyse fonctionnelle</h2>
                                    <p>
                                        Les variations génétiques observées peuvent être analysées pour l'identification 
                                        des effets fonctionnels. Les SNPs intra-géniques peuvent être silensieux, 
                                        altérer la traduction ou même arrêter prématurément la transcription.
                                    </p>
                                </div>
                            </section>
                        </div>
                        {/* SECTION 3 - 'Répartition parmis les populations' */}
                        <div class="carousel-item">
                            <section id="section3" className="row">
                                <div className="col-md-4 text-center">
                                    {/* <img src="barchart.svg" className="img-fluid" alt="" width="300" height="300" /> */}
                                    {/* plot.png */}
                                    <img src="barchart.svg" className="img-fluid" alt="" width="175" height="175" />
                                </div>
                                <div className="col-md-8">
                                    <h2>Répartition parmis les populations</h2>
                                    <p>
                                        On nomme allèle chacune des variations intra-géniques. La proportion relative 
                                        des allèles peut être mesurée au sein des diverses populations humaines et ensuite 
                                        être comparées entre-elles.
                                    </p>
                                </div>
                            </section>
                        </div>
                        {/* SECTION 4 - 'Accès à l'information' */}
                        <div class="carousel-item">
                            <section id="section4" className="row">
                                <div className="col-md-4 text-center">
                                    {/* <img src="snipster.png" className="img-fluid" alt="" width="300" height="300" /> */}
                                    <img src="hipster.png" className="img-fluid" alt="" width="200" height="200" />
                                </div>
                                <div className="col-md-8">
                                    <h2>Visualiser l'information</h2>
                                    <p>
                                        Regrouper les données de variations génétiques et les présenter dans une interface 
                                        simple d'utilisation; c'est la mission derrière l'outil de visualisation <i>Snippy</i> !
                                    </p>
                                </div>
                            </section>
                        </div>
                    </div>
                    <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                        <span aria-hidden="true"></span> {/* class="carousel-control-prev-icon" */}
                        <span class="sr-only">Précédent</span>
                    </a>
                    <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                        <span aria-hidden="true"></span> {/* class="carousel-control-next-icon" */}
                        <span class="sr-only">Suivant</span>
                    </a>
                </div>

            </div>
         
        </main>
    )
  }
};

export default Home;