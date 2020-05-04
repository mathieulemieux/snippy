import React, { Component } from 'react';
import {Link}               from "react-router-dom";

class GeneItem extends Component {
    render() {
        var gene = this.props.gene
        var sep  = (gene.otheraliases==="") ? "" : "alias: "
        return (

            <Link to={{
                    pathname: `${process.env.PUBLIC_URL}/variants`,
                    state: {
                        geneId: gene.uid
                    }
                }}

                id={gene.uid} className="nav-link list-group-item list-group-item-action" title={`Autres désignations :\n${gene.otherdesignations}\n\nDescription (anglais) :\n${gene.summary}`}>
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