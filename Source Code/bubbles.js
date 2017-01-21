var datapoints2;
var postValueInit = document.getElementById("post_slider").value;
  var width = 800,
    height = 380;
  var noOfCirclesSelected = 0;
  var firstNotFilled = true;
  var svg = d3.select("#chart")
    .attr("height", 100)
    .attr("width", 1200)
    .append("svg")
    .attr("height", height)
    .attr("width", width)
    .append("g");
    //.attr("transform", "translate(0,0)")

  // <defs>
  //   <pattern id="jon-snow" height="100%" width="100%" patternContentUnits="objectBoundingBox">
  //     <image height="1" width="1" preserveAspectRatio="none" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="snow.jpg"></image>
  //   </pattern>
  // </defs>

  var defs = svg.append("defs");

  // defs.append("pattern")
  //   .attr("id", "jon-snow")
  //   .attr("height", "100%")
  //   .attr("width", "100%")
  //   .attr("patternContentUnits", "objectBoundingBox")
  //   .append("image")
  //   .attr("height", 1)
  //   .attr("width", 1)
  //   .attr("preserveAspectRatio", "none")
  //   .attr("xmlns:xlink", "http://www.w3.org/1999/xlink")
  //   .attr("xlink:href", "snow.jpg");
  var field1=[];
  var temp =0;
  d3.csv("UserData_PostsData2.csv",function(csv){
            //executed after successful loading of data
            csv.map(function(d){
            	if(+d.posts>0){
                temp = +d.posts;
                if(+d.posts == 27){console.log("USER NUMBER-"+d.userId);}
					      field1[temp-1] = field1[temp-1] ? field1[temp-1]+1 : 1;
				      }
            })
            for(var i=0;i<field1.length;i++){
              field1[i] = (field1[i] === undefined) ? -1 : field1[i];
            }
            field1[0]=field1[0]/2;
        console.log(field1);
        $('.dynamicsparkline').sparkline(field1, {
          type: 'bar',
          barWidth: '5px',
          tooltipFormat: '',
          height: '100px',
          barColor: 'black'
        } );

        d3.select('canvas')
        .style("width","400px")
        .style("height","100px")
        .style("vertical-align", "bottom");
        
  });


  
  
  
  var radiusScale = d3.scaleSqrt().domain([1, 300]).range([10, 80])
  
  var tooltip = d3.select("body")
  .append("div")
  .style("position", "absolute")
  .style("z-index", "10")
  .style("background","#fff")
  .style("visibility", "hidden")
  .text("a simple tooltip");

  var forceXDivide = d3.forceX(function(d){
    if(d.Total_Accepted_Answers>10){
      return 660
    }else if(d.Total_Accepted_Answers>5 && d.Total_Accepted_Answers<=10){
      return 400
    }else{
      return 130
    }
  }).strength(0.05);
  var forceXCombine = d3.forceX(width / 2).strength(0.05);
  var forceXValue = forceXCombine;
  

  // the simulation is a collection of forces
  // about where we want our circles to go
  // and how we want our circles to interact
  // STEP ONE: get them to the middle
  // STEP TWO: don't have them collide!!!
  var simulation = d3.forceSimulation()
    .force("x", forceXValue)
    .force("y", d3.forceY(height / 2).strength(0.05))
    .force("collide", d3.forceCollide(function(d) {
      return radiusScale(d.score/10);
    }))
  

  d3.queue()
    .defer(d3.csv, "UserData_PostsData2.csv")
    .await(ready)

  function updateText(div, user){
      document.getElementById(div).style.display='block';
      document.getElementById(div).style.whiteSpace ='pre';
      document.getElementById(div).innerHTML = user.userId;
  }
  function ready (error, datapoints) {
    datapoints2 = datapoints;
    datapoints = datapoints2.filter(function(d){ return (d.posts==postValueInit);})
   //  forceXCombine = d3.forceX(width / 2).strength(0.05);
   //  forceXDivide = d3.forceX(function(d){
	  //   if(d.Total_Accepted_Answers>25){
	  //     return 660
	  //   }else if(d.Total_Accepted_Answers>5 && d.Total_Accepted_Answers<=25){
	  //     return 400
	  //   }else{
	  //     return 130
	  //   }
	  // }).strength(0.05);
    
    defs.selectAll(".artist-pattern")
      .data(datapoints)
      .enter().append("pattern")
      .attr("class", "artist-pattern")
      .attr("id", function(d) {
        // jon-snow
        // Madonna
        // the-eagles
        return d.userId
      })
      .attr("height", "100%")
      .attr("width", "100%")
      .attr("patternContentUnits", "objectBoundingBox")
      .append("image")
      .attr("height", 1)
      .attr("width", 1)
      .attr("preserveAspectRatio", "none")
      .attr("xmlns:xlink", "http://www.w3.org/1999/xlink");

    var circles = svg.selectAll(".artist")
      .data(datapoints)
      .enter().append("circle")
      .attr("class", "artist")
      .attr("r", function(d) {
        return radiusScale(d.score/10);
      })
      .attr("stroke","black")
      .attr("stroke-width",1)
      .attr("fill", function(d) {
        if(d.Total_Accepted_Answers>5 & d.Total_Accepted_Answers<=10){
          return "LimeGreen"
        }else if(d.Total_Accepted_Answers>10){
          return "darkGreen"
        }else{
          return "PaleGreen"
        }
      })
      .on("mouseover", function(d){
        return tooltip
        .style("visibility", "visible")
        .style("outline-style","outset")
        .html('<table><tr><td>User Id: </td><td> '+d.userId+'</td></tr>'+'<tr><td>Score: </td><td>'+d.score+'</td></tr>'+'<tr><td>Posts: </td><td>'+d.posts+'</td></tr></table>');
      })
      .on("mousemove", function(d){
        return tooltip
        .style("top",(d3.event.pageY-10)+"px")
        .style("outline-style","outset")
        .style("left",(d3.event.pageX+10)+"px")
        .html('<table><tr><td>User Id: </td><td> '+d.userId+'</td></tr>'+'<tr><td>Score: </td><td>'+d.score+'</td></tr>'+'<tr><td>Posts: </td><td>'+d.posts+'</td></tr></table>');
      })
      .on("mouseout", function(){
      	return tooltip.style("visibility", "hidden");
      })
      .on('click', function(d) {
      	if(noOfCirclesSelected == 2){
      		noOfCirclesSelected = 0;
      		$('.artist').attr("stroke","black").attr("stroke-width",1);
      	}
      	noOfCirclesSelected+=1;
      	$(this).attr("stroke","black").attr("stroke-width",3);
        if(document.getElementById("user1Text").style.display=='none'){
          document.getElementById("userColumn").style.display='block';
          document.getElementById("userColumn").innerHTML  = "USER ID: ";
          updateText("user1Text",d);
        }else if(document.getElementById("user2Text").style.display=='none'){
          //document.getElementById("user2Text").style.display='block';
          //document.getElementById("user2Text").innerHTML  = "data-"+d.score+"-"+d.userId+"-"+d.posts;
          updateText("user2Text",d);
          //ENABLE COMPARE BUTTON & VISUALIZATION TO COMPARE HEAD ON
        }else if(document.getElementById("user1Text").style.display=='block' && firstNotFilled){
          //document.getElementById("user1Text").innerHTML  = "data-"+d.score+"-"+d.userId+"-"+d.posts;
          firstNotFilled = false;
          updateText("user1Text",d);
        }else if(document.getElementById("user2Text").style.display=='block'){
          //document.getElementById("user2Text").innerHTML  = "data-"+d.score+"-"+d.userId+"-"+d.posts;
          firstNotFilled = true;
          updateText("user2Text",d);
        }
        console.log("data-"+d.score+"-"+d.userId+"-"+d.posts);
      })

    

    simulation.nodes(datapoints)
      .on('tick', ticked)

    function ticked() {
      circles
        .attr("cx", function(d) {
          return d.x
        })
        .attr("cy", function(d) {
          return d.y
        })
    }

  }
  	
  // d3.select("#combine").on('click', function() {
        
  //       simulation
  //       .force("x", forceXValue)
  //       .alphaTarget(0.5)
  //       .restart();

  //       console.log("Clicked combine");
  //   });
  //   d3.select("#divide").on('click', function() {
        
  //       simulation
  //       .force("x", forceXValue)
  //       .alphaTarget(0.5)
  //       .restart();
  //       console.log("Clicked divide");
  //   });
  function update(datapoints) {
    defs.selectAll(".artist-pattern").remove();

    defs.selectAll(".artist-pattern")
      .data(datapoints)
      .enter().append("pattern")
      .attr("class", "artist-pattern")
      .attr("id", function(d) {
        // jon-snow
        // Madonna
        // the-eagles
        return d.userId
      })
      .attr("height", "100%")
      .attr("width", "100%")
      .attr("patternContentUnits", "objectBoundingBox")
      .append("image")
      .attr("height", 1)
      .attr("width", 1)
      .attr("preserveAspectRatio", "none")
      .attr("xmlns:xlink", "http://www.w3.org/1999/xlink");

      svg.selectAll(".artist").remove();
      var circles = svg.selectAll(".artist")
      .data(datapoints)
      .enter().append("circle")
      .attr("class", "artist")
      .attr("r", function(d) {
        return radiusScale(d.score/10);
      })
      .attr("stroke","black")
      .attr("stroke-width",1)
      .attr("fill", function(d) {
        if(d.Total_Accepted_Answers>5 & d.Total_Accepted_Answers<=10){
          return "LimeGreen"
        }else if(d.Total_Accepted_Answers>10){
          return "darkGreen"
        }else{
          return "PaleGreen"
        }
      })
      .style("hover","s")
      .on("mouseover", function(d){
        return tooltip
        .style("visibility", "visible")
        .style("outline-style","outset")
        .html('<table><tr><td>User Id: </td><td> '+d.userId+'</td></tr>'+'<tr><td>Score: </td><td>'+d.score+'</td></tr>'+'<tr><td>Posts: </td><td>'+d.posts+'</td></tr></table>');
      })
      .on("mousemove", function(d){
        return tooltip
        .style("top",(d3.event.pageY-10)+"px")
        .style("outline-style","outset")
        .style("left",(d3.event.pageX+10)+"px")
        .html('<table><tr><td>User Id: </td><td> '+d.userId+'</td></tr>'+'<tr><td>Score: </td><td>'+d.score+'</td></tr>'+'<tr><td>Posts: </td><td>'+d.posts+'</td></tr></table>');
      })
      .on("mouseout", function(){
      	return tooltip.style("visibility", "hidden");
      })
      .on('click', function(d) {
      	if(noOfCirclesSelected == 2){
      		noOfCirclesSelected = 0;
      		$('.artist').attr("stroke","black").attr("stroke-width",1);
      	}
      	noOfCirclesSelected+=1;
      	$(this).attr("stroke","black").attr("stroke-width",3);
        if(document.getElementById("user1Text").style.display=='none'){
          document.getElementById("userColumn").style.display='block';
          document.getElementById("userColumn").innerHTML  = "USER ID: ";
          updateText("user1Text",d);
        }else if(document.getElementById("user2Text").style.display=='none'){
          //document.getElementById("user2Text").style.display='block';
          //document.getElementById("user2Text").innerHTML  = "data-"+d.score+"-"+d.userId+"-"+d.posts;
          updateText("user2Text",d);
          //ENABLE COMPARE BUTTON & VISUALIZATION TO COMPARE HEAD ON
        }else if(document.getElementById("user1Text").style.display=='block' && firstNotFilled){
          //document.getElementById("user1Text").innerHTML  = "data-"+d.score+"-"+d.userId+"-"+d.posts;
          firstNotFilled = false;
          updateText("user1Text",d);
        }else if(document.getElementById("user2Text").style.display=='block'){
          //document.getElementById("user2Text").innerHTML  = "data-"+d.score+"-"+d.userId+"-"+d.posts;
          firstNotFilled = true;
          updateText("user2Text",d);
        }
        console.log("data-"+d.score+"-"+d.userId+"-"+d.posts);
      })

      //forceXCombine = d3.forceX(width / 2).strength(0.09);
      
      forceXDivide = d3.forceX(function(d){
	    if(d.Total_Accepted_Answers>10){
	      return 660
	    }else if(d.Total_Accepted_Answers>5 && d.Total_Accepted_Answers<=10){
	      return 400
	    }else{
	      return 130
	    }
	  }).strength(0.09);
    // d3.select("#combine").on('click', function() {
    //     forceXValue = forceXCombine;
    //     simulation
    //     .force("x", forceXValue)
    //     .alphaTarget(0.5)
    //     .restart();

    //     console.log("Clicked combine");
    // });
    // d3.select("#divide").on('click', function() {
    // 	forceXValue = forceXDivide;
    //     simulation
    //     .force("x", forceXValue)
    //     .alphaTarget(0.5)
    //     .restart();
    //     console.log("Clicked divide");
    // });
    simulation
    .alphaTarget(0.5)
    .restart()
    .force("x", forceXCombine)
    .force("y", d3.forceY(height / 2).strength(0.05))
    .force("collide", d3.forceCollide(function(d) {
      return radiusScale(d.score/10);
    }));

    simulation.nodes(datapoints)
      .on('tick', tickedNew)

    function tickedNew() {
      circles
        .attr("cx", function(d) {
          return d.x
        })
        .attr("cy", function(d) {
          return d.y
        })
    }
  }
   
d3.select("#cbDivide").on("change",function() {
    if(this.checked) {
        forceXValue = forceXDivide;
    }else{
    	forceXValue = forceXCombine;
    }
    simulation
    .force("x", forceXValue)
    .alphaTarget(0.7)
    .restart();
    console.log("Clicked cb");
});  
   
   //function will be implicitly called when slider changes
  //d3.select("#post_slider").on("input change", function () {
  //var myHeader=document.getElementById("myHeader");
    //myHeader.innerText = "Display for the year "+year;
  
function updateSlider(postValue){
  post = parseInt(postValue);  
  // console.log("yes");
   //var value2= document.getElementById("slider_value");
  //value2.innerText="  Users who have posts from "+(post-5)+" to "+post;
    datapoints = datapoints2.filter(function(d){ return (d.posts==post);})
    document.getElementById("cbDivide").checked = false;
  //ready(error,datapoints);    
    update(datapoints);
    // console.log(datapoints);
	
   
}
