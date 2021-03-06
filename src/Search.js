import React, { Component } from 'react';
import $                    from 'jquery';
import GeneItem             from './GeneItem';


class Search extends Component {
    
    // Constructeur
    constructor(props) {
        super(props);
        this.state = {
            title      : "Choisissez un gène d'intérêt",
            placeholder: "Nom, descriptif ou GeneID (NCBI)",
            exemples   : ["DMD*", "Dystro*", "1756"],
            keyword    : "",
            idList     : null,
            geneInfo   : null,
            msgError   : "Une erreur s'est produite avec le serveur. Veuillez réessayer."
        };
    }

    // Event handlers
    handleChange = (event) => {
        this.setState({keyword: event.target.value});
    }
    handleSubmit = (event) => {
        event.preventDefault();  // Prevent page reloading by form submit default behavior
        this.esearch();
    }
    handleClick = (event) => {
        if (event.target.className === "exemple") {
            this.setState({keyword: event.target.text}, () => {this.esearch()})
        };
    }  

    // Deux recherches distinctes sur les APIs de NCBI
    esearch() {
        var term = this.state.keyword
        $.ajax({
            url     : `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi`,
            data    : {
                        'db'     : 'gene',
                        'term'   : `human[orgn] (${term}[gfn] OR ${term}[gn] OR ${term}[uid])`,
                        'RetMax' : '25',
                        'retmode': 'json',
                        'sort'   : 'name' //chromosome, name, relevance, Gene Weight?
            },
            type    : 'POST',
            dataType: 'json',
            error   : function() {var a = 1}, //dummy
            success : data => {
                this.setState({idList: data.esearchresult.idlist}, () => {
                    // if (data.esearchresult.count!=="0"){
                        this.esummary() // Recherche no2
                    // }
                })}
        });
    }
    esummary() {
        var id = this.state.idList.join()
        $.ajax({
            url     : `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi`,
            data    : {
                        'db'     : 'gene',
                        'id'     : id,
                        'retmode': 'json',
            },
            type    : 'POST',
            dataType: 'json',
            error   : function() {var a = 1}, //dummy
            success : data => {
                if (data.result) {
                    // console.log('yes')
                    this.setState({geneInfo: data.result.uids.map(uid => data.result[uid])})
                }else{
                    // console.log('no')
                    this.setState({geneInfo: null})
                }
                // console.log(`data: ${data}`)
                // console.log(`data: ${data.result}`)
                // console.log(`data: ${data.result.uids}`)
                // this.setState({geneInfo: data.result.uids.map(uid => data.result[uid])})
                // console.log(`geneInfo: ${this.state.geneInfo}`)
            }
        });    
    }

    // Rendu HMTL
    geneList() {
        // return this.state.geneInfo.map(g => <GeneItem key={g.uid} gene={g} />)
        if (this.state.geneInfo) { //if (this.state.idList.length!==0) {
            // console.log('-----')
            // console.log(this.state.geneInfo)
            console.log('yes')
            return this.state.geneInfo.map(g => <GeneItem key={g.uid} gene={g} />)
        }else{
            // alert('Aucun résultats disponibles pour cette recherche')
            console.log('no')
            return 'Aucun résultats'
        }
        
    }
    render() {
        return (
            <div className="container">
                <div id="search" className="my-3 p-3 bg-white rounded shadow-sm">

                    {/* Formulaire */}
                    <h6 className="border-bottom border-gray mb-4 pb-2 mb-0">{this.state.title}</h6>
                    <form id="form" className="form-inline my-2 my-lg-0" onSubmit={(e) => {this.handleSubmit(e)}}>
                        <input id='keyword' className="form-control mr-sm-2" type="text"  aria-label="Search" placeholder={this.state.placeholder} onChange={(e) => {this.handleChange(e)}} value={this.state.keyword} style={{width: '350px'}} />
                        <button className="btn btn-outline-success my-2 my-sm-0"><i className="fas fa-search"></i></button>
                    </form>    
                    <div className="mt-1 ml-1">
                        <small>
                            <span>Ex. </span><a className="exemple" href="javascript:void(0)" onClick={this.handleClick}>{this.state.exemples[0]}</a>
                            <span>,   </span><a className="exemple" href="javascript:void(0)" onClick={this.handleClick}>{this.state.exemples[1]}</a>
                            <span> ou </span><a className="exemple" href="javascript:void(0)" onClick={this.handleClick}>{this.state.exemples[2]}</a>
                        </small>
                    </div>
                    
                    {/* Resultats */ }
                    {/* {this.state.geneInfo && */}
                        <div id="results">
                            <h6 className="border-bottom border-gray mt-5 mb-4 pb-2 mb-0">Résultats</h6>
                            <div id="gene_list">{this.geneList()}</div>
                        </div>
                    {/* } */}
                    
                </div>
            </div>
        )
    }
};

export default Search;