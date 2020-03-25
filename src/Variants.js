import React, { Component } from 'react';
import $        from 'jquery';
import Ideogram from './Ideogram.js';
import Features from './Features.js';
import Tracks   from './Tracks.js';


class Variants extends Component {

  // Constructeur
  constructor(props) {
    super(props);
    this.state = {
      apiUrl  : 'https://snippy-restapi.herokuapp.com',
      geneId  : this.props.location.state.geneId,
      geneInfo: null
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
    var gene   = this.state.geneId
    $.ajax({
        url     : `${apiUrl}/features`,
        data    : {'gene': gene},
        type    : 'POST',
        dataType: 'json',
        error   : function() {var a = 1}, //dummy alert(gene),//
        success : data => {this.setState({geneInfo: data}, alert(data[data.length-1].bp_stop))}
    });
    
}

  // Rendu
  render() {
    return (
      <div>
        <Ideogram />
        <Features />
        <Tracks   />
      </div>    
    )
  }
};

export default Variants;