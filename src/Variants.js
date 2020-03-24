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
      geneId:   this.props.location.state.geneId,//'xyz', //props.geneId,
      geneInfo: null
    };
}

  // Event handlers
  componentDidMount = (event) => {
    this.snippyApi();
    // this.setState({geneInfo: 'allo'}); //ajax...
}

  // Details du gene sur l'API Flask de l'application
  snippyApi() {
    var gene = this.state.geneId
    $.ajax({
        url     : 'http://127.0.0.1:5000/features',
        data    : {'gene': gene},
        type    : 'POST',
        dataType: 'json',
        error   : function() {var a = 1}, //dummy alert(gene),//
        success : data => {this.setState({geneInfo: data})}
    });
    // alert(this.state.geneInfo)
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