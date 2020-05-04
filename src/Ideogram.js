import React, { Component } from 'react';
import * as d3 from 'd3'

class Ideogram extends Component {

  // Constructeur
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     res      : this.props.res,
  //     width    : this.props.width,
  //     height   : this.props.height,
  //     geneName : this.props.geneName
  //   };
  // }

  // Rendu avec D3: le contenu du svg
  renderIdeogram(props) {
    const node               = this.node
    const ideogram_length    = node.width  // Pour animer: node.width.animVal.value
    const ideogram_thickness = node.height // Pour animer: node.height.animVal.value
    const data               = props.ideogramData
    const res                = props.res

    // 0 - Filtering data on ideogram's resolution
    if (res==400 | res==550 | res==850) { data = data.filter(d => (d['res']==res)) }
    else                                { data = data.filter(d => (d['res']==400)) }
    var ideogram_bp = (data[data.length - 1].bp_stop - data[0].bp_start)

    // 1- Data, with key
    var u = d3.select('svg').selectAll('rect').data(data, d => d.chromosome+d.res+d.arm+d.band)

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

  }

  // React's Lifecycle
  componentWillReceiveProps(nextProps) {
    if (nextProps.ideogramData.lenght) {
      this.renderIdeogram(nextProps)
    }
  }
  shouldComponentUpdate() {
    return false;
  }


  // Rendu initial avec React: juste le svg sans contenu
  render() {
    return (
      <svg
        ref={node => this.node = node}
        width={this.props.width}
        height={this.props.height}>
      </svg>
    )
  }
};

export default Ideogram;