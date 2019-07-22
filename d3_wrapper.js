
function make_multi_line_graph(array_of_array_of_vals) {
  const array_of_arrays_of_objs = [];
  const all_vals = [];
  for(let i = 0; i < array_of_array_of_vals.length; i++) {
    const vals = array_of_array_of_vals[i];
    const val_objs = [];
    for(let j = 0; j < vals.length; j++) {
      val_objs.push({
        val: vals[j],
        index: j,
      });
      all_vals.push(vals[j]);
    }
    array_of_arrays_of_objs.push(val_objs);
  }

  const margin = {top: 20, right: 200, bottom: 60, left: 80},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;
  const x = d3.scaleLinear().range([0, width]);
  const y = d3.scaleLinear().range([height, 0]);
  const z = d3.scaleOrdinal(d3.schemeCategory10);

  // Add the svg element
  d3.select("svg").remove();
  const svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

  const value_line = d3.line()
      .x(function(d) { return x(d.index); })
      .y(function(d) { return y(d.val); });

  x.domain([0, array_of_arrays_of_objs[0].length]);
  y.domain([0, d3.max(all_vals)]);
  z.domain([0, array_of_arrays_of_objs.length]);

  for(var i = 0; i < array_of_arrays_of_objs.length; i++)
    svg.append("path")
        .data([array_of_arrays_of_objs[i]])
        .attr("class", "line")
        .attr("d", value_line)
        .style("stroke", z(i))
        .style("fill", "none");
}
