import React, { Component } from 'react';
import * as d3 from 'd3'

class Features extends Component {

   // Rendu avec D3: le contenu du svg
   renderFeatures(props) {

    if (props.exonsData.length > 0) {

      // var node = this.node
      var gene_length      = props.length
      var gene_thickness   = props.thickness
      var exon_thickness   = gene_thickness - 4
      var intron_thickness = 3
      var data             = props.exonsData
      var gene_bp          = data[data.length - 1].bp_stop - data[0].bp_start +1
      var pos_debut        = data[0].bp_start

      // console.log(`gene_length: ${gene_length}`)
      console.log(`gene_bp: ${gene_bp}`)
      // console.log(`data.length - 1: ${data.length - 1}`)
      // console.log(`data: ${data}`)

      // 1- Data, with key function
      var u = d3.select('#features').select('svg').selectAll('rect').data(data, d => d.bp_start)

      // 2- Remove
      u.exit().remove()

      // 3- Enter & 4- Append
      var enter = u.enter()
      .append('rect')
          .attr('id',     d => d.bp_start)
          .attr('height', function(d) {
              if (d.feature=='exon') { return exon_thickness }
              else                   { return intron_thickness }
          })
          .attr('y',      function(d) {
              if (d.feature=='exon') { return (gene_thickness - exon_thickness)/2 }
              else                   { return (gene_thickness - intron_thickness)/2 }
          })
          .attr('x',      d => ((d.bp_start-pos_debut)/gene_bp)*gene_length)
          .attr('width',  d => ((d.bp_stop-d.bp_start)/gene_bp)*gene_length)
          .attr('class',  d => d.feature)

      // 5- Merge
      u = u.merge(enter)

    } //Fin if
  } //Fin renderFeatures

  // React's Lifecycle
  componentDidMount(){

    var gene_line = d3.select('#gene_line').append('svg')
        .attr('id',     'gene_line_svg')
        .attr('width',  1040)
        .attr('height', 30)
        .attr('class',  'gene_line')
    // gene_line.append('polyline')
    //     .attr('id',     'gene_line')
    //     .attr('points', `${track_nav_width/3}     ${track_nav_height/2},
    //                     ${(track_nav_width/3)*2} ${(track_nav_height/2)+15},
    //                     ${(track_nav_width/3)*2} ${(track_nav_height/2)-15}`)
    gene_line.append('line')
        .attr('x1', 20)
        .attr('y1', 5)
        .attr('x2', 1020)
        .attr('y2', 5)



    // this.setIdentification(this.props)
  }
  componentDidUpdate(){
    this.renderFeatures(this.props)
  }

  // Identification
  // setIdentification(props) {
  //   console.log('identification')
  //   d3.select("#features").append("p")
  //     .text(`${props.name} (${props.geneId}) - ${props.nomenclaturename}`)
  //     .attr('class', 'noselect mt-2')
  //     // .attr('id',    '')
  // }

  render() {
    return (
      <div id='features'>
        <svg
          id='myfeatures'
          ref={node => this.node = node}
          width={this.props.length}
          height={this.props.thickness}>
        </svg>
      </div>
    )
  }
};

export default Features;