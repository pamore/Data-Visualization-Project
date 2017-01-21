
function compareTwoUsers_TextBubble(user1Id, user2Id){
	
	var width="350" ,height="350";
	d3.select("#svgUser1").selectAll("*").remove();
	d3.select("#svgUser2").selectAll("*").remove();

	var svgLabel = d3.select("#bubbleCloudLabel")
					.attr("height", "40")
					.attr("width", "500");
	
	var svg1 = d3.select("#svgUser1")
    .attr("height", height)
    .attr("width", width);

    var svg2 = d3.select("#svgUser2")
    .attr("height", height)
    .attr("width", width);
	
	svgLabel.append("circle")
	.attr("cx","130")
    .attr("cy","30")
	.attr("r","6")
	.attr("fill","Salmon");
	svgLabel.append("text")
	.attr("x","140")
    .attr("y","35")
	.attr("style","font-family:sans-serif;font-size:130%;")
	.attr("fill","blue")
	.text("Tag Words");
	
	svgLabel.append("circle")
	.attr("cx","260")
    .attr("cy","30")
	.attr("r","6")
	.attr("fill","lightBlue");
	svgLabel.append("text")
	.attr("x","270")
    .attr("y","35")
	.attr("style","font-family:sans-serif;font-size:130%;")
	.attr("fill","blue")
	.text("Non-Tag Words");
	
	var format = d3.format(",d");

	var color = d3.scaleOrdinal(d3.schemeCategory20c);

	var pack = d3.pack()
	.size([width, width/1.2])
    .padding(1.5);

    //BUBBLE OF USER 1
	d3.csv("flare3.csv", function(d) {
	  d.value = +d.value;
	  d.userid = +d.userid;
	  if (d.userid == user1Id) return d;
	}, 
	function(error, classes) {
	    if (error) throw error;

	    var root = d3.hierarchy({children: classes})
	        .sum(function(d) { return d.value; })
	        .each(function(d) {
	          if (id = d.data.id) {
	            var id, i = id.lastIndexOf(".");
	            d.id = id;
	            d.package = id.slice(0, i);
	            d.class = id.slice(i + 1);
	          }
	        });

	    var node = svg1.selectAll(".node")
	      .data(pack(root).leaves())
	      .enter().append("g")
	      .attr("class", "node")
	      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

	    node.append("circle")
	      .attr("id", function(d) { return d.id; })
	      .attr("r", function(d) { return d.r; })
	      .style("fill", function(d) { 
	      	if(d.data.tag == "yes"){
	      		return "Salmon";
	      	}else if(d.data.tag == "No"){
	      		return "LightBlue";
	      	}
	      	else
	      		return "white";
	      })
	      .attr("stroke","black")
      	  .attr("stroke-width",1);

	    node.append("clipPath")
	      .attr("id", function(d) { return "clip-" + d.id; })
	      .append("use")
	      .attr("xlink:href", function(d) { return "#" + d.id; });

	    node.append("text")
	      .attr("clip-path", function(d) { return "url(#clip-" + d.id + ")"; })
	      .selectAll("tspan")
	      .data(function(d) { return d.class.split(/(?=[A-Z][^A-Z])/g); })
	      .enter().append("tspan")
	      .attr("x", 0)
	      .attr("y", function(d, i, nodes) { return 13 + (i - nodes.length / 2 - 0.5) * 10; })
	      .text(function(d) { return d; })
	      .style("text-anchor", "middle")
	      //.style("text-shadow","-1px -1px 0 #000,1px -1px 0 #000,-1px 1px 0 #000,1px 1px 0 #000")
           .attr("font-family", "sans-serif")
           .attr("font-size", "15px");
           //.attr("fill", "white");

	    node.append("title")
	      .text(function(d) { return d.id + "\n" + format(d.value); });
    });

	//BUBBLE OF USER 2
	d3.csv("flare3.csv", function(d) {
	  d.value = +d.value;
	  d.userid = +d.userid;
	  if (d.userid == user2Id) return d;
	}, 
	function(error, classes) {
	    if (error) throw error;

	    var root = d3.hierarchy({children: classes})
	        .sum(function(d) { return d.value; })
	        .each(function(d) {
	          if (id = d.data.id) {
	            var id, i = id.lastIndexOf(".");
	            d.id = id;
	            d.package = id.slice(0, i);
	            d.class = id.slice(i + 1);
	          }
	        });

	    var node = svg2.selectAll(".node")
	      .data(pack(root).leaves())
	      .enter().append("g")
	      .attr("class", "node")
	      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

	    node.append("circle")
	      .attr("id", function(d) { return d.id; })
	      .attr("r", function(d) { return d.r; })
	      .style("fill", function(d) { 
	      	if(d.data.tag == "yes"){
	      		return "Salmon";
	      	}else if(d.data.tag == "No"){
	      		return "LightBlue";
	      	}
	      	else
	      		return "white";
	     })
	    .attr("stroke","black")
      	.attr("stroke-width",1);

	    node.append("clipPath")
	      .attr("id", function(d) { return "clip-" + d.id; })
	      .append("use")
	      .attr("xlink:href", function(d) { return "#" + d.id; });

	    node.append("text")
	      .attr("clip-path", function(d) { return "url(#clip-" + d.id + ")"; })
	      .selectAll("tspan")
	      .data(function(d) { return d.class.split(/(?=[A-Z][^A-Z])/g); })
	      .enter().append("tspan")
	      .attr("x", 0)
	      .attr("y", function(d, i, nodes) { return 13 + (i - nodes.length / 2 - 0.5) * 10; })
	      .text(function(d) { return d; })
	      .style("text-anchor", "middle")
	      //.style("text-shadow","-1px -1px 0 #000,1px -1px 0 #000,-1px 1px 0 #000,1px 1px 0 #000")
           .attr("font-family", "sans-serif")
           .attr("font-size", "15px");
           //.attr("fill", "white");

	    node.append("title")
	      .text(function(d) { return d.id + "\n" + format(d.value); });
    });
}

function generateCircle(percent){
    
    var colors = {
        'pink': '#E1499A',
        'yellow': '#f0ff08',
        'green': '#47e495'
    };

    var color = colors.green;

    var radius = 70;
    var border = 5;
    var padding = 30;
    var startPercent = 0;
    var endPercent = percent/100;


    var twoPi = Math.PI * 2;
    var formatPercent = d3.format('.0%');
    var boxSize = (radius + padding) * 2;


    var count = Math.abs((endPercent - startPercent) / 0.01);
    var step = endPercent < startPercent ? -0.01 : 0.01;

    

    var parent = d3.select('div#compareText');

    var svg = parent.append('svg')
        .attr('width', boxSize)
        .attr('height', boxSize);
    
    var arc = d3.arc()
    .startAngle(0)
    .innerRadius(radius)
    .outerRadius(radius - border);

    var defs = svg.append('defs');

    var filter = defs.append('filter')
        .attr('id', 'blur');

    filter.append('feGaussianBlur')
        .attr('in', 'SourceGraphic')
        .attr('stdDeviation', '7');

    var g = svg.append('g')
        .attr('transform', 'translate(' + boxSize / 2 + ',' + boxSize / 2 + ')');

    var meter = g.append('g')
        .attr('class', 'progress-meter');

    meter.append('path')
        .attr('class', 'background')
        .attr('fill', '#000')
        .attr('fill-opacity', 0.5)
        .attr('d', arc.endAngle(twoPi));

    var foreground = meter.append('path')
        .attr('class', 'foreground')
        .attr('fill', color)
        .attr('fill-opacity', 1)
        .attr('stroke', color)
        .attr('stroke-width', 5)
        .attr('stroke-opacity', 1)
        .attr('filter', 'url(#blur)');

    var front = meter.append('path')
        .attr('class', 'foreground')
        .attr('fill', color)
        .attr('fill-opacity', 1);

    var numberText = meter.append('text')
        .attr('fill', '#000')
        .attr('text-anchor', 'middle')
        .attr('dy', '.35em');

    function updateProgress(progress) {
        foreground.attr('d', arc.endAngle(twoPi * progress));
        front.attr('d', arc.endAngle(twoPi * progress));
        numberText.text(formatPercent(progress));
    }

    var progress = startPercent;

    (function loops() {
        updateProgress(progress);

        if (count > 0) {
            count--;
            progress += step;
            setTimeout(loops, 10);
        }
    })();
    

}