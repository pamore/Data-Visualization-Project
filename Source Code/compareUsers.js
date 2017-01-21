function compareTwoUsers(){
      
     //console.log(document.getElementById("user1Text").innerHTML);
     var user1 = document.getElementById("user1Text").innerHTML;
     var user1Id = user1;
     console.log(user1Id);
     //console.log(document.getElementById("user2Text").innerHTML);
     var user2 = document.getElementById("user2Text").innerHTML
     var user2Id = user2;
     console.log(user2Id);
    if(user1Id && user2Id){
         d3.queue()
        .defer(d3.csv, "UserData.csv")
        .await(ready);
    }

    function ready (error, datapoints) {
        d3.select("#compareText")
        .attr("height", 1300)
        .attr("width", 500)
        .style("flex-grow",1);
        

        var width="550" ,height="550";
        d3.select("#svgUserData").selectAll("*").remove();
        

        // var svgData = d3.select("#svgUserData")
        // .attr("height", 500)
        // .attr("width", width);


        generateRectange(user1Id,user2Id);
        //generatePostsData(user1Id,user2Id);
        //compareTwoUsers_TextBubble(user1Id,user2Id);
        

        
        // generateCircle(4);
        ///////////////////////
    }
    function generateRectange(user1Id,user2Id){
       
    var svgContainer = d3.select("#svgUserData")
                        .attr("height", 400)
                        .attr("width", 600);
    var dataset1 = [];
    var dataset2 = [];

    var datasetPercent1 = [];
    var datasetPercent2 = [];
    var datasetPercent3 = ['Reputation','Score','Posts','Total Accepted Answers','UpVotes','DownVotes','Views'];
    var i = 0;
    
    d3.csv("UserData_PostsData2.csv", function(data) {

        for (var i = 0; i < data.length; i++){
            if (data[i].userId === user1Id) {
                dataset1.push(
                    // data[i].userId, 
                    data[i].Reputation, 
                    data[i].score,
                    data[i].posts, 
                    data[i].Total_Accepted_Answers, 
                    data[i].UpVotes, 
                    data[i].DownVotes, 
                    data[i].views
                    );
            }
            if(data[i].userId === user2Id) {
                dataset2.push(
                    // data[i].userId, 
                    data[i].Reputation, 
                    data[i].score,
                    data[i].posts, 
                    data[i].Total_Accepted_Answers, 
                    data[i].UpVotes, 
                    data[i].DownVotes, 
                    data[i].views
                    );
            }
        }
        //Set value
        for (i = 0; i < dataset1.length; i++) {

            if(dataset1[i]==0 && dataset2[i]==0){
                datasetPercent1.push(0);
                datasetPercent2.push(0);
            }
            else{
                datasetPercent1.push( (parseFloat(dataset1[i])*100)/(parseFloat(dataset1[i])+parseFloat(dataset2[i])) )
                datasetPercent2.push( (parseFloat(dataset2[i])*100)/(parseFloat(dataset1[i])+parseFloat(dataset2[i])) )
            }
        }
        console.log(datasetPercent1);
        console.log(datasetPercent2);
        var j = 0;

         
        var rects = svgContainer.selectAll(".rect")
         .data(datasetPercent2)
         .enter()
         .append("rect")
         .attr('class', 'rect')
         .attr("x", 100)
         .attr("y", function (d, j) {
            return (j+1)*35;
         })
         .attr("height", 30)
         .attr("width", function (d, j) {
            if(Math.round(datasetPercent2[j])==0){
                return 0;
            }else{
                return 400;
            }
         })
         .attr("fill", "SkyBlue");

         

         var rects1 = svgContainer.selectAll(".rect1")
         .data(datasetPercent1)
         .enter()
         .append("rect")
         .attr('class', 'rect1')
         .attr("x", 100)
         .attr("y", function (d, j) {
            return (j+1)*35;
         })
         .attr("height", 30)
         .attr("width", function (d, j) {
            return datasetPercent1[j]*4;
         })
         .attr("fill", "DarkBlue");

         
         svgContainer.selectAll(".text")
           .data(datasetPercent2)
           .enter()
           .append("text")
           .attr('class', 'text')
           .text(function(d,j) {
                return Math.round(dataset2[j]);
           })
           .attr("x", function(d, i) {
                return 490;  
           })
           .attr("y", function(d, j) {
                return ((j+1)*35) + 20;              
           })
           .style("text-anchor", "end")
           .attr("font-family", "sans-serif")
           .attr("font-size", "11px")
           .attr("fill", function (d, j) {
            if(Math.round(datasetPercent2[j])==0){
                return "SkyBlue";
            }else{
                return "white";
            }
         });



         svgContainer.selectAll(".text1")
           .data(datasetPercent1)
           .enter()
           .append("text")
           .attr('class', 'text1')
           .text(function(d,j) {
               return Math.round(dataset1[j]);
           })
           .attr("x", function(d, i) {
                return 110;  
           })
           .attr("y", function(d, j) {
                return ((j+1)*35) + 20;              
           })
           .style("text-anchor", "start")
           .attr("font-family", "sans-serif")
           .attr("font-size", "11px")
           .attr("fill", function (d, j) {
            if(Math.round(datasetPercent1[j])==0){
                return "DarkBlue";
            }else{
                return "white";
            }
         });


           //Labels for bars
           svgContainer.selectAll(".text2")
           .data(datasetPercent3)
           .enter()
           .append("text")
           .attr('class', 'text2')
           .text(function(d,j) {
                return datasetPercent3[j];
           })
           .attr("x", function(d, i) {
                return 300;  
           })
           .attr("y", function(d, j) {
                return ((j+1)*35) + 20;              
           })
           .style("text-shadow","-1px -1px 0 #000,1px -1px 0 #000,-1px 1px 0 #000,1px 1px 0 #000")
           .style("text-anchor", "middle")
           .attr("font-family", "sans-serif")
           .attr("font-size", "11px")
           .attr("fill", "white");

    });
    
    // compareTwoUsers_TextBubble(user1Id,user2Id);    
        generatePostsData(user1Id,user2Id);
    }

    function generatePostsData(user1Id,user2Id){
       
        var svgContainer = d3.select("#svgUserData");
        svgContainer
        .append('text')
        .text('POST CONTENT: ')
        .attr("x", 0)
        .attr("y", 310)
        .attr("font-family", "sans-serif");
        
        var post1 = 0;
        var postList1 = [];
        var post2 = 0;
        var postList2 = [];

        d3.csv("post.csv", function(data) {

            for (var i = 0; i < data.length; i++){
                if (data[i].OwnerUserId === user1Id) {
                    postList1.push(
                        data[i].Post_body
                    );
                    post1 +=1;

                }
                if(data[i].OwnerUserId === user2Id) {
                    postList2.push(
                        data[i].Post_body
                    );
                    post2 +=1;
                }
            }
        


        var tooltip = d3.select("body")
                        .append("div")
                        .style("position", "absolute")
                        .style("z-index", "10")
                        .style("background","#fff")
                        .style("visibility", "hidden")
                        .text("a simple tooltip");

        // for (var i = 0; i < post1; i++) {postList1.push(i); }
        // for (var i = 0; i < post2; i++) {postList2.push(i); }
        //console.log(postList1);
        var rects1 = svgContainer
         .selectAll(".rectPost1")
         .data(postList1)
         .enter()
         .append("rect")
         .attr('class', 'rectPost1')
         .attr("x", function(d, j) {
                return 100+((Math.floor(j%10))*20);              
           })
         .attr("y", function(d, j) {

                return 300+(20*(Math.floor(j/10)));              
           })
         .attr("height", 10)
         .attr("width", 10)
         .attr("fill", "DarkBlue")
         .on("mouseover", function(d,j){
            return tooltip
            .style("visibility", "visible")
            .style("outline-style","outset")
            .text(postList1[j]);
          })
          .on("mousemove", function(d,j){
            return tooltip
            .style("top",(d3.event.pageY-10)+"px")
            .style("outline-style","outset")
            .style("left",(d3.event.pageX+10)+"px")
            .text(postList1[j]);
          })
          .on("mouseout", function(){
            return tooltip.style("visibility", "hidden");
          });

         var rects1 = svgContainer
         .selectAll(".rectPost2")
         .data(postList2)
         .enter()
         .append("rect")
         .attr('class', 'rectPost2')
         .attr("x",function(d, j) {
                return 310+((Math.floor(j%10))*20);              
           })
         .attr("y",function(d, j) {
                return 300+(20*(Math.floor(j/10)));              
           })
         .attr("height", 10)
         .attr("width", 10)
         .attr("fill", "SkyBlue")
         .on("mouseover", function(d,j){
            return tooltip
            .style("visibility", "visible")
            .style("outline-style","outset")
            .text(postList2[j]);
          })
          .on("mousemove", function(d,j){
            return tooltip
            .style("top",(d3.event.pageY-10)+"px")
            .style("outline-style","outset")
            .style("left",(d3.event.pageX+10)+"px")
            .text(postList2[j]);
          })
          .on("mouseout", function(){
            return tooltip.style("visibility", "hidden");
          });

         compareTwoUsers_TextBubble(user1Id,user2Id);
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
}