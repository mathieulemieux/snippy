import React, { Component } from 'react';
import {Link}               from "react-router-dom";

class GeneItem extends Component {
    render() {
        var gene = this.props.gene
        var sep  = (gene.otheraliases==="") ? "" : "alias: "
        console.log(gene)
        // console.log(Math.abs(gene.genomicinfo[0].chrstart - gene.genomicinfo[gene.genomicinfo.length-1].chrstop))
        // console.log(gene.name)
        // console.log(gene.maplocation)
        // console.log(gene.nomenclaturename)
        // console.log(gene.chrstart+1)

        // Calcul de bp
        if (gene.genomicinfo.length !== 0) {var bp = Math.abs(gene.genomicinfo[0].chrstart - gene.genomicinfo[gene.genomicinfo.length-1].chrstop)}
        else                               {var bp = 0}

        return (

            <Link
                to={{
                    pathname: `${process.env.PUBLIC_URL}/variants`,
                    state: {
                        geneId: gene.uid,
                        chrName: gene.chromosome,
                        name: gene.name,
                        maplocation: gene.maplocation,
                        nomenclaturename: gene.nomenclaturename,
                        pos_debut: gene.chrstart+1,
                        bp: bp
                    }
                }}
                id={gene.uid}
                className="nav-link list-group-item list-group-item-action"
                title={`Autres désignations :\n${gene.otherdesignations}\n\nDescription (anglais) :\n${gene.summary}`}
            >
            {/* <a id={gene.uid} className="list-group-item list-group-item-action" href="/variants" title={`Autres désignations :\n${gene.otherdesignations}\n\nDescription (anglais) :\n${gene.summary}`}> */}
                <div className="d-flex w-100 justify-content-between">    
                    <h6 className="mb-1">{gene.name} | <span className="text-secondary">{gene.description}</span></h6>
                </div>
                {/* <small className="mb-1"> ( <strong>{gene.name}</strong>{sep}{gene.otheraliases} )</small> */}
                <small className="text-success">(ID: <strong>{gene.uid}</strong>)</small>
                <small className="mb-1"> {sep}{gene.otheraliases}</small>
            {/* </a> */}
            
            </Link>

        )
    }
};

export default GeneItem;