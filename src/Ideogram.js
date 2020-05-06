import React, { Component } from 'react';
import * as d3 from 'd3'

class Ideogram extends Component {

  // Rendu avec D3: le contenu du svg
  renderIdeogram(props) {

    if (props.ideogramData.length !== 0) {

      // var node = this.node
      var ideogram_length = props.width
      var ideogram_thickness = props.height
      var data = props.ideogramData
      var res = props.res

      // 0 - Filtering data on ideogram's resolution
      data = data.filter(el=>el.res==res)
      var ideogram_bp = (data[data.length - 1].bp_stop - data[0].bp_start)

      // 1- Data, with key
      var u = d3.select('#myideogram').selectAll('rect').data(data, d => d.chromosome+d.res+d.arm+d.band)

      // 2- Remove
      u.exit().remove()

      // 3- Enter & 4- Append
      var enter = u.enter()
      .append('rect')
          .attr('id',     d => d.arm+d.band)
          .attr('height', ideogram_thickness)
          .attr('y',      0)
          .attr('x',      d => (d.bp_start/ideogram_bp)*ideogram_length)
          .attr('width',  d => ((d.bp_stop-d.bp_start)/ideogram_bp)*ideogram_length)
          .attr('class',  function(d) {
                  if (d.stain=='gpos') { return 'chr_region '+d.stain+' d'+d.density }
                  else                 { return 'chr_region '+d.stain }
          })

      // 5- Merge
      u = u.merge(enter)

      // 6- Adding event listeners
      d3.selectAll('.chr_region').on("mouseover", function() {
          d3.select(this).classed('chr_region_selected', true)
      })
      d3.selectAll('.chr_region').on("mouseleave", function() {
          d3.select(this).classed('chr_region_selected', false)
      })

    } //Fin if
  } //Fin renderIdeogram

  // React's Lifecycle
  componentDidMount(){
    this.setChrName(this.props.chromosome)
  }
  componentDidUpdate(){
    this.renderIdeogram(this.props)
    // console.log('Ideogram.js componentDidUpdate')
    // console.log(this.props.ideogramData.length)
  }

  // Chromosome Identification
  setChrName(chromosome) {
    console.log(chromosome)
    d3.select("#ideogram").append("h1")
      .text('Chromosome '+chromosome)
      .attr('id',    'chr_no')
      .attr('class', 'noselect chr_no mt-2')
      // .attr('data-toggle', "tooltip")
      // .attr('data-placement', "top")
      // .attr('title', 'asdjaklsjd')
  }

  // Rendu initial avec React: juste le svg sans contenu
  render() {
    return (
      <div id='ideogram'>
        <svg
          id='myideogram'
          ref={node => this.node = node}
          width={this.props.width}
          height={this.props.height}>
        </svg>
      </div>
    )
  }
};

export default Ideogram;