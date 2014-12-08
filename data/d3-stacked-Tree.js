<script>
/*
This is Michael Bostock's collapsible tree -- with my data

    http://bl.ocks.org/mbostock/4063570
    as part of his d3.js project
    https://github.com/mbostock/d3/wiki/Gallery
*/

require.config({paths: {d3: "http://d3js.org/d3.v3.min"}});
require(["d3"], function(d3) {

var style = document.getElementsByTagName('style')[0];
if ( style == null ) {
  style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = '';
  document.getElementsByTagName('head')[0].appendChild(style);
}
style.innerHTML = style.innerHTML +  
         "\n#display_container *" +
         "{  font-family: Arial; } " +
         "\n" +
         "#display_container .node rect {" +
         "  cursor: pointer;" +
         "  fill: #fff;" +
         "  fill-opacity: .5;" +
         "  stroke: #3182bd;" +
         "  stroke-width: 1.5px;" +
         "}" +
         "\n" +
         "#display_container .node text {" +
         "  font: 14px sans-serif;" +
         "  pointer-events: none;" +
         "}" +
         "\n" +
         "#display_container path.link {" +
         "  fill: none;" +
         "  stroke: #9ecae1;" +
         "  stroke-width: 1.5px;" +
         "}";


var margin = {top: 30, right: 20, bottom: 30, left: 20},
    width = 800 - margin.left - margin.right,
    barHeight = 25,
    barWidth = width * .7;

var i = 0,
    duration = 400,
    root;

var tree = d3.layout.tree()
    .size([0, 100]);

var diagonal = d3.svg.diagonal()
    .projection(function(d) { return [d.y, d.x]; });

var svg = d3.select("#display_container").append("svg")
    .attr("width", width + margin.left + margin.right)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


function update(source) {

  // Compute the flattened node list. TODO use d3.layout.hierarchy.
  var nodes = tree.nodes(root);

  var height = Math.max(150, nodes.length * barHeight + margin.top + margin.bottom);

  d3.select("svg")
      .attr("height", height);

  d3.select(self.frameElement)
      .style("height", height + "px");

  // Compute the "layout".
  nodes.forEach(function(n, i) {
    n.x = i * barHeight;
  });

  // Update the nodes
  var node = svg.selectAll("g.node")
      .data(nodes, function(d) { return d.id || (d.id = ++i); });

  var nodeEnter = node.enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
      .style("opacity", 1e-6);

  // Enter any new nodes at the parent's previous position.
  nodeEnter.append("rect")
      .attr("y", -barHeight / 2)
      .attr("height", barHeight)
      .attr("width", barWidth)
      .style("fill", color)
      .on("click", toggle);

  nodeEnter.append("text")
      .attr("dy", 3.5)
      .attr("dx", 5.5)
      .text(function(d) {
          return d.name + (d.n_descendants ? " (" + d.n_descendants + " titles)" : "");
      });

  // Transition nodes to their new position.
  nodeEnter.transition()
      .duration(duration)
      .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })
      .style("opacity", 1);

  node.transition()
      .duration(duration)
      .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })
      .style("opacity", 1)
    .select("rect")
      .style("fill", color);

  // Transition exiting nodes to the parent's new position.
  node.exit().transition()
      .duration(duration)
      .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
      .style("opacity", 1e-6)
      .remove();

  // Update the links
  var link = svg.selectAll("path.link")
      .data(tree.links(nodes), function(d) { return d.target.id; });

  // Enter any new links at the parent's previous position.
  link.enter().insert("path", "g")
      .attr("class", "link")
      .attr("d", function(d) {
        var o = {x: source.x0, y: source.y0};
        return diagonal({source: o, target: o});
      })
    .transition()
      .duration(duration)
      .attr("d", diagonal);

  // Transition links to their new position.
  link.transition()
      .duration(duration)
      .attr("d", diagonal);

  // Transition exiting nodes to the parent's new position.
  link.exit().transition()
      .duration(duration)
      .attr("d", function(d) {
        var o = {x: source.x, y: source.y};
        return diagonal({source: o, target: o});
      })
      .remove();

  // Stash the old positions for transition.
  nodes.forEach(function(d) {
    d.x0 = d.x;
    d.y0 = d.y;
  });
}

// Toggle children on click.
function toggle(d) {
  if (d.children) {
    d._children = d.children;
    d.children = null;
  } else {
    d.children = d._children;
    d._children = null;
  }
  update(d);
}

function color(d) {
  return d._children ?  "#1181E6" : d.children ?  "#1181C6" : "#B7DFF5" ;
  //return d._children ?  "#81BfD7" : d.children ?  "#1181C6" : "#B7DFF5" ;
  // #3182bd #c6dbef #fd8d3c
}



root = %s;  // Python to add the JSON in string formatting
root.x0 = 0;
root.y0 = 0;

function get_n_descendants(d) {
  if (d.children) {
    d.n_descendants = d.children.reduce(
        function(pv, cv) {return pv + get_n_descendants(cv); },0);
  return d.n_descendants;
  } else {
    return 1;
  }
}

get_n_descendants(root);


function toggleAll(d) {
  if (d.children) {
    d.children.forEach(toggleAll);
    toggle(d);
  }
}
  
// Initialize the display to show a few nodes.
root.children.forEach(toggleAll);
  
update(root);

});
</script>
