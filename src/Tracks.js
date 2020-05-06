import React, { Component } from 'react';
import $        from 'jquery';
import * as d3 from 'd3';




class Tracks extends Component {

  // Constructeur
  constructor(props) {
    super(props);
    this.state = {
      // data = {},
      // Positions in sequence
      pos_start        : 0,          // On initialise le positionnement de l'affichage des position à 0, donc complètement à gauche
      pos_nb           : 62,         // Nb de positions qui sont affichées à la fois
      pos_width        : 11,         // Largeur en pixels de chaque position
      // Tracks
      info_height      : 40,         // Nb de pixels en hauteur pour la track Info
      nc_height        : 15,         // Nb de pixels en hauteur pour l'affichage de chaque nucléotide?
      tracks_height    : 40 + 15*5,  // Hauteur totale pour les 2 tracks combinées - Quickfix (this.state.info_height + this.state.nc_height*5)
      // Navigation
      track_nav_width  : 45,         // Largeur, en pixels, des flèches rouges à gauche et à droite?
      track_nav_height : 40 + 15*5   // Hauteur, en pixels, des flèches rouges à gauche et à droite? - Quickfix (this.statetracks_height)
    };
  }

  // React's Lifecycle
  componentDidMount(){
    this.buildTracks()
  }
  componentDidUpdate(){
    this.doUpdateTracks()
    // console.log('------------ ICI componentDidUpdate -----------')
    // console.log(this.props.sequenceData)
    // console.log('------------ ICI -----------')
  }


  buildTracks() {

    var track_nav_width  = this.state.track_nav_width
    var track_nav_height = this.state.track_nav_height

    // Populate data
    // data = fetchedData

    // left arrow
    var nav_left = d3.select('#tracks').append('svg')
        .attr('id',     'track_nav_left')
        .attr('width',  track_nav_width)
        .attr('height', track_nav_height)
        .attr('class',  'track_nav')
    nav_left.append('polyline')
        .attr('id',     'nav_left')
        .attr('points', `${track_nav_width/3}     ${track_nav_height/2},
                        ${(track_nav_width/3)*2} ${(track_nav_height/2)+15},
                        ${(track_nav_width/3)*2} ${(track_nav_height/2)-15}`)
    nav_left.append('line')
        .attr('x1', (track_nav_width/3)*2)
        .attr('y1', 0)
        .attr('x2', (track_nav_width/3)*2)
        .attr('y2', track_nav_height)

    // Track container
    d3.select('#tracks').append('g')

    // Right arrow
    var nav_right = d3.select('#tracks').append('svg')
        .attr('id',     'track_nav_right')
        .attr('width',  track_nav_width)
        .attr('height', track_nav_height)
        .attr('class',  'track_nav')
    nav_right.append('polyline')
        .attr('id',     'nav_right')
        .attr('points', `${(track_nav_width/3)*2} ${track_nav_height/2},
                        ${track_nav_width/3}     ${(track_nav_height/2)+15},
                        ${track_nav_width/3}     ${(track_nav_height/2)-15}`)
    nav_right.append('line')
        .attr('x1', track_nav_width/3)
        .attr('y1', 0)
        .attr('x2', track_nav_width/3)
        .attr('y2', track_nav_height)

    // Event listeners
    const incr = 10
    d3.select('#nav_left' ).on("click", f => this.setState((prevState) => ({pos_start: prevState.pos_start -incr})))
    d3.select('#nav_right').on("click", f => this.setState((prevState) => ({pos_start: prevState.pos_start +incr})))

    // d3.select('#nav_right').on("click", f => this.doUpdateTracks(1))
    // d3.select('#nav_right').on("click", function(d) {
    //   this.setState({pos_start : 10})
    //   // this.doUpdateTracks()
    // }) //1
    // Get Tracks!!
    // this.doUpdateTracks(0)
    
  }

  // Prend en compte l'incrémentation gauche(-1)/droite(1)
  doUpdateTracks() { //incr
    
    if (!$.isEmptyObject(this.props.sequenceData)) {      // old -> props.sequenceData.length > 0
      // alert('allo')
      // var incr = 1
      var pos_start = this.state.pos_start
      var pos_nb    = this.state.pos_nb
      var pos_stop  = pos_start + pos_nb
      var data      = this.props.sequenceData
      // if ((pos_start + incr >= 0 ) & ( pos_start + pos_nb + incr <= data.length )){
      if ((pos_start >= 0 ) & ( pos_start + pos_nb <= data.length )){
        // alert('allo')
        // pos_start    = pos_start + incr
        // var pos_stop = pos_start + pos_nb
        var myData   = data.slice(pos_start, pos_stop); // Slicing par index, pas les vraies positions des nucléotides
        // this.setState({pos_start : pos_start})
        this.updateTracks(myData);
      } //Fin if #2
    } //Fin if #1

  }



  // Rendu avec D3: le contenu du svg
  updateTracks(data) {

    var pos_width        = this.state.pos_width
    var info_height      = this.state.info_height
    var nc_height        = this.state.nc_height
    var tracks_height    = this.state.tracks_height
    // var data             = props.sequenceData
    // var pos_start        = this.state.pos_start
    // var pos_nb           = this.state.pos_nb
    // var track_nav_width  = this.state.track_nav_width
    // var track_nav_height = this.state.track_nav_height

    // 1- Data, with key function
    // var u = d3.select('#tracks').selectAll('svg').data(data, d => d.pos)   // ---Good old without 'g'
    var u = d3.select('#tracks').select('g').selectAll('svg').data(data, d => d.pos)

    // 2- Remove
    u.exit().remove()

    // 3- Enter
    var enter = u.enter()
    .append('svg')
        .attr('id',     d => d.pos)
        .attr('x',      (d, i) => i*pos_width)
        .attr('width',  pos_width)
        .attr('height', tracks_height)
        .attr('class',  'track_column')
        .attr('data-toggle', 'tooltip')
        .attr('data-placement', 'top')
        .attr('title', 'test') //d => d.pos

    // 4- Append (each track: 1 content info 'rect'; 4+1 nucleotides 'text')
    enter.append('rect')
        .attr('y',      d => info_height - (d.info*(info_height/2)))
        .attr('width',  pos_width)
        .attr('height', d => d.info*(info_height/2))
        .attr('class',  function(d) {
                if   (d.exon==='true') { return 'i_content i_exon' }
                else                  { return 'i_content i_intron' }
            })
        
    for (var i = 0; i < 4; i++) {     
        enter.append('text')
            .text(d => d.alt[i])
            .attr('y',           info_height + nc_height + (nc_height*i))
            .attr('x',           pos_width/2)
            .attr('text-anchor', 'middle')
            .attr('class',       function(d) {
                if      (d.alt_i[i]==="0") { return 'nc ref' }
                else if (d.alt_i[i]==="1") { return 'nc v_syn' }
                else if (d.alt_i[i]==="2") { return 'nc v_mis' }
                else if (d.alt_i[i]==="3") { return 'nc v_non' }
                else if (d.alt_i[i]==="4") { return 'nc v_non' }
                else                      { return 'nc' }
            })
            
    }

    // Étoiles pour populations...
    // enter.append('text')
    //     .text(function(d) {
    //         if (d.pop=='true') { return '*' } // d.pop pas pour ca maintenant!
    //     })
    //     .attr('y',           info_height + nc_height + (nc_height*4))
    //     .attr('x',           pos_width/2)
    //     .attr('text-anchor', 'middle')
    //     .attr('class', 'nc pop')

    // 5- Merge
    u = u.merge(enter)

    // Event listener
    d3.selectAll('.track_column').on("mouseover", function() {
        d3.select(this).classed('track_column_selected', true)
    })
    d3.selectAll('.track_column').on("click", function() {
        alert(this.id)
    })
    d3.selectAll('.track_column').on("mouseleave", function() {
        d3.select(this).classed('track_column_selected', false)
    })

  } //Fin UpdateTracks


  render() {
    return (
      <div id='tracks'></div>
    )
  }
};

export default Tracks;