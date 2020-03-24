import React, { Component } from 'react';

class Home extends Component {
  render() {
    return (
        <main role="main">
            <div className="jumbotron">
                <div id="banner" className="container">
                    <h1 className="display-3">Tous différents</h1>
                    <p>Le génôme humain s'étend sur 46 chromosomes et fait près de 3 milliards de nucléotides, l'alphabet de base de l'ADN.</p>
                    <p>Sans surprise, de nombreuses variations existent entre les individus et les populations.</p>
                    <p>Un SNP (<i>Single Nucleotide Polymorphism</i>) correspond à une différence au niveau d'un seul nucléotide;</p>
                    <p>c'est le type le plus commun de variation et on en compte de 4 à 5 millions d'une personne à l'autre!</p>
                    <p><strong>Snippy</strong> montre les SNPs dans les gènes et leur répartition entre populations.</p>
                    {/* <small>{"\u2020"} /snipster/</small> */}
                    <div>
                        <a className="btn btn-outline-primary btn-lg" href="#section1" role="button">Comment ça marche ?</a>
                        <a className="btn btn-outline-success btn-lg ml-2" href="#" role="button">Explorez</a>
                    </div>
                </div>
            </div>
            {/* <div id="section1">
                asfadfsdfsdf
            </div> */}

            <div className="container">
                <section id="section1" className="row">
                    <div className="col-md-4">
                        <img src="diversity3.png" className="img-fluid" alt="" width="300" height="300" />
                    </div>
                    <div className="col-md-8">
                        <h2>Rescenser la diversité génétique</h2>
                        <p>
                            Le <i>Human genome Project</i> et la construction d'un génome humain de référence.
                            Les initiatives subséquentes pour rescenser la diversité génétique humaine.
                            Le projet <i>1000 Genomes</i> et ses 2500+ personnes séquencées.
                            
                        </p>
                    </div>
                </section>
                <section id="section2" className="row">
                    <div className="col-md-4">
                        <img src="protein.png" className="img-fluid" alt="" width="300" height="300" />
                    </div>
                    <div className="col-md-8">
                        <h2>Analyse fonctionnelle</h2>
                        <p>
                            Nombreuses mutations.
                            SNPs intra-géniques.
                            Déduire la répercussion fonctionnelle d'une substitution de nucléotide.
                            Mutation silensieuse, altération de la traduction ou arrêt prématuré de la transcription. 
                        </p>
                    </div>
                </section>
                <section id="section3" className="row">
                    <div className="col-md-4">
                        <img src="barchart.svg" className="img-fluid" alt="" width="300" height="300" />
                        {/* plot.png */}
                    </div>
                    <div className="col-md-8">
                        <h2>Répartition parmis les populations</h2>
                        <p>
                            On nomme allèle chacune des variations intra-géniques existantes.
                            Calculer la répartition des allèles dans la population.
                            Identifier les positions qui divergent significativement entre populations.
                        </p>
                    </div>
                </section>
                <section id="section4" className="row">
                    <div className="col-md-4">
                        <img src="snipster.png" className="img-fluid" alt="" width="300" height="300" />
                    </div>
                    <div className="col-md-8">
                        <h2>Accès à l'information</h2>
                        <p>
                            Regrouper les données.
                        </p>
                        <p>
                            Outil pour la visualisation de l'information.
                        </p>
                        <p>
                            Snippy!
                        </p>
                    </div>
                </section>
            </div>
         
        </main>
    )
  }
};

export default Home;