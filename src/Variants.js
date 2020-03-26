import React, { Component } from 'react';
import $        from 'jquery';
import Ideogram from './Ideogram.js';
// import Features from './Features.js';
// import Tracks   from './Tracks.js';


class Variants extends Component {

  // Constructeur
  constructor(props) {
    super(props);
    this.state = {
      apiUrl       : 'https://snippy-restapi.herokuapp.com',
      // geneInfo     : this.props.geneInfo,
      geneId       : this.props.location.state.geneId, // En provenance d'un 'link' dans GeneItem.js?
      geneData     : "",
      ideogramData : []
    };
  }

  // Event handlers
  componentDidMount = (event) => {
    this.getGeneInfo();
    // this.setState({geneInfo: 'allo'}); //ajax...
  }

  // Details du gene sur l'API Flask de l'application
  getGeneInfo() {
    var apiUrl = this.state.apiUrl
    var geneId = this.state.geneId
    $.ajax({
        url     : `${apiUrl}/gene`,
        data    : {'id': geneId},
        type    : 'POST',
        dataType: 'json',
        error   : function() {var a = 1}, //dummy alert(gene),//
        success : data => {this.setState({geneData: data})} //, alert(data[data.length-1].bp_stop)
    });
  }

  // Rendu
  render() {
    return (
      <div>
        <Ideogram
          ideogramData={this.state.ideogramData}
          res={400}
          width={375}
          height={36}
        />
        {/* <Features /> */}
        {/* <Tracks   /> */}
      </div>    
    )
  }

};


const x = state => {
  return {

  }
}

export default connect()(Variants)