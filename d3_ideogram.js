//////////////////////////////////////////////////////////////////////////
//   IDEOGRAM
///////////////////////////////////////////////////////////////////////////

alert('allo')

// Chromosome & resolution selection
// var chr_select = document.getElementById('chromosome')
var chromosome = 1 //chr_select.options[chr_select.selectedIndex].value
var res        = 400 //d3.select('input[name="i_res"]:checked').node().value

// Ideograms size
var ideogram_thickness = 36
var ideogram_length    = 375


// Event listener
// d3.select('#chromosome').on("change", function() {
//     chromosome = chr_select.options[chr_select.selectedIndex].value
//     getIdeogram(chromosome, res)
//     d3.select("#chr_no").text(chromosome)
// })
// d3.selectAll('input[name="i_res"]').on("change", function() {
//     res = d3.select('input[name="i_res"]:checked').node().value
//     getIdeogram(chromosome, res)
// })

// Parent element
d3.select("#ideogram").append("svg")
    .attr('width',  ideogram_length)
    .attr('height', ideogram_thickness)
// Chromosome Identification
d3.select("#ideogram").append("h1")
    .text(chromosome)
    .attr('id',    'chr_no')
    .attr('class', 'chr_no')


// Getting external date & Drawing ideogram
function getIdeogram(chromosome, res) {

    // API Request
    d3.json(`http://127.0.0.1:5000/ideogram?chromosome=${chromosome}`)
    .then(data => {

        // 0 - Filtering data on ideogram's resolution
        if (res==400 | res==550 | res==850) { data = data.filter(d => (d['res']==res)) }
        else                                { data = data.filter(d => (d['res']==400)) }
        var ideogram_bp = (data[data.length - 1].bp_stop - data[0].bp_start)

        // 1- Data, with key
        var u = d3.select('#ideogram').select('svg').selectAll('rect').data(data, d => d.chromosome+d.res+d.arm+d.band)

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

        // 6- Event listeners
        d3.selectAll('.chr_region').on("mouseover", function() {
            d3.select(this).classed('chr_region_selected', true)
        })
        d3.selectAll('.chr_region').on("mouseleave", function() {
            d3.select(this).classed('chr_region_selected', false)
        })

    })

}

// call function
getIdeogram(chromosome, res);
