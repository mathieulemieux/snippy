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
      apiUrl        : 'https://snippy-snp.herokuapp.com', //'http://127.0.0.1:5000',//'https://snippy-snp.herokuapp.com', //'https://snippy-restapi.herokuapp.com',
      geneId        : this.props.location.state.geneId,
      chrName       : this.props.location.state.chrName,
      sequenceData  : {},
      sequenceDataX : [], // Transformations à partir de sequenceData, pour faciliter l'affichage des nucléotides dans Tracks.js
      ideogramData  : [],
      exonsData     : [],
      sizeChromosome: 0//,
      // dataPop       : []
    };
  }

  // Lifecycle
  componentDidMount = (event) => {
    console.log('Variants.js componentDidMount')
    console.log(this.props.location.state)
    this.getIdeogram();
    this.getExons();
    this.getSequence();
  }

  // Collecte des données sur l'API Flask de l'application
  // Ideogram
  getIdeogram() {
    var apiUrl  = this.state.apiUrl //'http://127.0.0.1:5000'//'https://snippy-snp.herokuapp.com'
    var chrName = this.props.location.state.chrName //this.state.chrName
    $.ajax({
        url     : `${apiUrl}/ideogram`, //`${apiUrl}/exons`,
        data    : {'name': chrName}, //{'gene': geneId},
        type    : 'POST',
        dataType: 'json',
        error   : error => {this.setState({
          ideogramData: []
          })
        },
        success : data => {this.setState({
          ideogramData   : data,
          sizeChromosome : 0 //this.getSizeChromosome(data)
          })
        }
    });
  }
  // Exons
  getExons() {
    var apiUrl = this.state.apiUrl //'http://127.0.0.1:5000'
    var geneId = this.props.location.state.geneId
    $.ajax({
        url     : `${apiUrl}/exons`,
        data    : {'gene': geneId},
        type    : 'POST',
        dataType: 'json',
        error   : error => {this.setState({
            exonsData: []
          })
        },
        success : data => {this.setState({
            exonsData: data
          })
        }
    });
  }
  // Sequence
  getSequence() {
    var apiUrl = this.state.apiUrl //'http://127.0.0.1:5000'
    var geneId = this.props.location.state.geneId
    $.ajax({
        url     : `${apiUrl}/sequence`,
        data    : {'gene': geneId},
        type    : 'POST',
        dataType: 'json',
        error   : error => {this.setState({
          sequenceData: {}
        })
      },
      success : data => {
        this.setState({
          sequenceData  : data,
          sequenceDataX : this.getSequenceDataX(data)//,
          // dataPop       : this.getDataPop(data)
        })
      }
    });
  }

  // Taille du chromosome pour calculer la position du gene
  // getSizeChromosome(data) {
  //   for (var i = 0; i < data.length; i++) {
  //     1===1
  //   }
  // }

  // Transformations pour sequenceDataX
  getSequenceDataX(sequenceData) {

    var data = []
    for (var i = 0; i < sequenceData.ref.length; i++) {
      
      // pos
      const pos = this.props.location.state.pos_debut + i   // .toString()

      // alt et alt_i (Code des effets fonctionnels)
      const car = sequenceData.ref.charAt(i)
      var alt = car.toUpperCase()
      var alt_i = "0" // commence toujours par 0=référence
      let variant = sequenceData.var.find(obj => {return obj.pos === pos})
      var pop = []
      if (variant) {  // Si variant à la position correspondante

        // alt et alt_i
        if (variant.alt[0] === "1"){alt = alt.concat("A"); alt_i = alt_i.concat(variant.alt_i[0])}
        if (variant.alt[1] === "1"){alt = alt.concat("C"); alt_i = alt_i.concat(variant.alt_i[1])}
        if (variant.alt[2] === "1"){alt = alt.concat("G"); alt_i = alt_i.concat(variant.alt_i[2])}
        if (variant.alt[3] === "1"){alt = alt.concat("T"); alt_i = alt_i.concat(variant.alt_i[3])}

        
        
        // console.log(`variant.pop.length: ${variant.pop.length}`)
        // var i
        // for (i=0; i < variant.pop.length; i++) {
        //   var x = variant.pop[i]
        //   var sumX = 0
        //   for (var j=0; j < variant.pop[i].length; j++){
        //     sumX = sumX + parseInt(variant.pop[i][j])
        //   }
        //   var y = variant.total_pop[i]-sumX
        //   // Modifier pour tenir compte de la seq de référence
        //   if(alt[0] === "A"){x[0]=y}
        //   else if (alt[0] === "C") {x[1]=y}
        //   else if (alt[0] === "G") {x[2]=y}
        //   else if (alt[0] === "T") {x[3]=y}
        //   pop.push(x)
        // }

        //


        // données populationnelles
        pop.push([ parseInt(variant.pop[0][0]), parseInt(variant.pop[0][1]), parseInt(variant.pop[0][2]), parseInt(variant.pop[0][3]) ]) // variant.pop[0][0], variant.pop[0][1], variant.pop[0][2], variant.pop[0][3]
        pop.push([ parseInt(variant.pop[1][0]), parseInt(variant.pop[1][1]), parseInt(variant.pop[1][2]), parseInt(variant.pop[1][3]) ])
        pop.push([ parseInt(variant.pop[2][0]), parseInt(variant.pop[2][1]), parseInt(variant.pop[2][2]), parseInt(variant.pop[2][3]) ])
        pop.push([ parseInt(variant.pop[3][0]), parseInt(variant.pop[3][1]), parseInt(variant.pop[3][2]), parseInt(variant.pop[3][3]) ])
        pop.push([ parseInt(variant.pop[4][0]), parseInt(variant.pop[4][1]), parseInt(variant.pop[4][2]), parseInt(variant.pop[4][3]) ])
        // pop.push(variant.pop[1])
        // pop.push(variant.pop[2])
        // pop.push(variant.pop[3])
        // pop.push(variant.pop[4])
        // modifs
        var popSum=[]
        popSum.push(pop[0].reduce((a, b) => a + b, 0))
        popSum.push(pop[1].reduce((a, b) => a + b, 0))
        popSum.push(pop[2].reduce((a, b) => a + b, 0))
        popSum.push(pop[3].reduce((a, b) => a + b, 0))
        popSum.push(pop[4].reduce((a, b) => a + b, 0))
        if (alt[0] === "A") {
          pop[0][0] = parseInt(variant.total_pop[0]) - popSum[0]
          pop[1][0] = parseInt(variant.total_pop[1]) - popSum[1]
          pop[2][0] = parseInt(variant.total_pop[2]) - popSum[2]
          pop[3][0] = parseInt(variant.total_pop[3]) - popSum[3]
          pop[4][0] = parseInt(variant.total_pop[4]) - popSum[4]
        }
        if (alt[0] === "C") {
          pop[0][1] = parseInt(variant.total_pop[0]) - popSum[0]
          pop[1][1] = parseInt(variant.total_pop[1]) - popSum[1]
          pop[2][1] = parseInt(variant.total_pop[2]) - popSum[2]
          pop[3][1] = parseInt(variant.total_pop[3]) - popSum[3]
          pop[4][1] = parseInt(variant.total_pop[4]) - popSum[4]
        }
        if (alt[0] === "G") {
          pop[0][2] = parseInt(variant.total_pop[0]) - popSum[0]
          pop[1][2] = parseInt(variant.total_pop[1]) - popSum[1]
          pop[2][2] = parseInt(variant.total_pop[2]) - popSum[2]
          pop[3][2] = parseInt(variant.total_pop[3]) - popSum[3]
          pop[4][2] = parseInt(variant.total_pop[4]) - popSum[4]
        }
        if (alt[0] === "T") {
          pop[0][3] = parseInt(variant.total_pop[0]) - popSum[0]
          pop[1][3] = parseInt(variant.total_pop[1]) - popSum[1]
          pop[2][3] = parseInt(variant.total_pop[2]) - popSum[2]
          pop[3][3] = parseInt(variant.total_pop[3]) - popSum[3]
          pop[4][3] = parseInt(variant.total_pop[4]) - popSum[4]
        }

        // totaux par pop
        pop[0].push(parseInt(variant.total_pop[0]))
        pop[1].push(parseInt(variant.total_pop[1]))
        pop[2].push(parseInt(variant.total_pop[2]))
        pop[3].push(parseInt(variant.total_pop[3]))
        pop[4].push(parseInt(variant.total_pop[4]))
        // pop[0].push(pop[0].reduce((a, b) => a + b, 0))
        // pop[1].push(pop[1].reduce((a, b) => a + b, 0))
        // pop[2].push(pop[2].reduce((a, b) => a + b, 0))
        // pop[3].push(pop[3].reduce((a, b) => a + b, 0))
        // pop[4].push(pop[4].reduce((a, b) => a + b, 0))
        // pop.push(variant.total_pop)

        // totaux par nucléotide
        pop.push([
          pop[0][0]+pop[1][0]+pop[2][0]+pop[3][0]+pop[4][0],
          pop[0][1]+pop[1][1]+pop[2][1]+pop[3][1]+pop[4][1],
          pop[0][2]+pop[1][2]+pop[2][2]+pop[3][2]+pop[4][2],
          pop[0][3]+pop[1][3]+pop[2][3]+pop[3][3]+pop[4][3],
          pop[0][4]+pop[1][4]+pop[2][4]+pop[3][4]+pop[4][4]
        ])

      }

      // exon
      if (car === car.toUpperCase()) {var exon = "false"}
      else                           {var exon = "true"}

      // info
      const info = "1.5"

      // Objet final
      const obj = {
        "pos"    : pos,
        "info"   : info,
        "exon"   : exon,
        "alt"    : alt,
        "alt_i"  : alt_i,
        "pop"    : pop
      }
      data.push(obj);

    }

    // console.log('----------------')
    // console.log(sequenceData)
    console.log('----------------')
    console.log(data)
    console.log('----------------')
    // console.log(data)
    // console.log(data.length)
    // console.log(sequenceData.ref.length)
    // console.log('----------------')

    return(data)

  }

  // // Données populationnelles
  // getDataPop(sequenceData) {
  //   var dataPop = []
  //   console.log(`sequenceData.var.length: ${sequenceData.var.length}`)
  //   for (var i = 0; i < sequenceData.var.length; i++) {
  //     var obj = i
  //     dataPop.push(obj);
  //   }
  //   console.log(dataPop)
  //   return dataPop
  // }


  // Rendu
  render() {
    return (
      <main role="main">
        <div className='container'>

          <div className='shadow bg-white rounded mt-4 p-4'>
            <div className='row align-items-end mb-3 noselect'>
              <div className='col-2 ml-2 text-left'>
                <h3>Gène</h3>
              </div>
              <div className='col-9 ml-4 text-right'>
                <p><strong>{this.props.location.state.name}</strong> (id. {this.props.location.state.geneId})</p>
                <p>{this.props.location.state.nomenclaturename}</p>
              </div>
            </div>
            <div className='row'>
              <div className='col-3 text-right'>
                <Ideogram
                  ideogramData={this.state.ideogramData}
                  chromosome={this.props.location.state.chrName}
                  maplocation={this.props.location.state.maplocation}
                  res={400}
                  width={240}
                  height={36}
                />
              </div>
              <div className='col-9 text-left pl-5'>
                <Features
                  exonsData={this.state.exonsData}
                  length={700}
                  thickness={30}
                  geneId={this.props.location.state.geneId}
                  name={this.props.location.state.name}
                  nomenclaturename={this.props.location.state.nomenclaturename}
                />
              </div>
            </div>
          </div>

          <div className='shadow bg-white rounded my-2 p-4'>
            <div className='row'>
              <div className='col-3'>
                <div className='text-right noselect'>
                  <p className='mt-2'>Contenu en information</p>
                  <p>Séquence de référence</p>
                  <p>Polymorphismes</p>
                </div>
                <br/>
                <div className='text-left'>
                  <h4 className='my-3 noselect'>Légende</h4>
                  {/* <p className='mb-1'>Polymorphismes :</p> */}
                  <div className='nc'>
                    <p><span className='ref'>ACGT</span> Nucléotide de référence &</p>
                    <p><span className='v_white'>ACGT</span> Polymorphisme non codant</p>
                    <p><span className='v_syn'>ACGT</span> Polymorphisme synonyme</p>
                    <p><span className='v_mis'>ACGT</span> Polymorphisme mis-sense</p>
                    <p><span className='v_non'>ACGT</span> Polymorphisme non-sense</p>
                  </div>
                </div>
              </div>
              <div className='col-9 text-left'>
                <Tracks
                  sequenceData={this.state.sequenceDataX} // this.state.sequenceData
                  // dataPop={this.state.dataPop}
                  pos_debut={this.state.pos_debut}
                  bp={this.state.bp}
                />
              </div>
            </div>
          </div>

        </div>
       </main>
    )
  }

};


// export default connect()(Variants)
export default Variants