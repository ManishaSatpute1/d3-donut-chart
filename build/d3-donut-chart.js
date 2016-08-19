(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.d3 = global.d3 || {})));
}(this, function (exports) { 'use strict';

  function constructor() {

    var dim = {
      width: 200,
      height: 200,
      margin : 20
    }

    var colorScale = null,
        data = [],
        targetEl = null,
        donutWidth = 10;

    //create a svg and render the donut chart
    function D3DonutChart() {
        var radius = Math.min(dim.width, dim.height) / 3,
            count = 0;

        var svg = targetEl
            .append('svg')
            .attr('width', dim.width)
            .attr('height',dim.height)

        var arc = d3.arc()
            .innerRadius(radius - donutWidth)
            .outerRadius(radius);

        var pie = d3.pie()
            .value(function(d) { return d.employees; })
            .padAngle(0.01)
            .sort(null);

        var  group =  svg.append("g")
            .attr('class','group')
            .attr("transform", "translate(" + dim.width/2 + "," + dim.height/2 + ")")
            .selectAll(".arc")
            .data(pie(data))
            .enter().append("g")
            .attr("class", "arc")
            .attr('id', function(){
                return "arc-" + (count++);
            });

        svg.select('.group')
            .append('text')
            .attr("transform", "translate(0,10)")
            .classed('total-text',true)
            .attr("text-anchor", "middle")
            .text(function(d){
              return d3.sum(data,function(d){ return d.employees; })
            });

        group.append("path")
              .attr("d", arc)
              .style("fill", function(d) {
                return colorScale(d.data.department);
              });

        return svg;
    }

    // Creates and renders legends for donut chart
    D3DonutChart.renderLegends = function(targetEl,data,enumColumnNames) {
      var columnKeys = [];
          columnKeys.push(""); //empty table header for circles
          columnKeys =  columnKeys.concat(d3.keys(data[0]));

      var table = targetEl.append("table")
          .classed('legends',true),
          thead = table.append("thead"),
          tbody = table.append("tbody");


      // append the header row
      thead.append("tr")
          .selectAll("th")
          .data(columnKeys)
          .enter()
          .append("th")
          .text(function(column) { return enumColumnNames[column]; });

      // create a row for each object in the data
      var rows = tbody.selectAll("tr")
          .data(data)
          .enter()
          .append("tr");

      // create a cell in each row for each column
      rows.selectAll("td")
          .data(function(row) {
            return columnKeys.map(function(column) {
              return {column: column, value: row[column]};
            });
          })
          .enter()
          .append("td")
          .html(function(d) {  return d.value; });

      var legendCount = 0;
      //create a circle to represent donut arc
      rows.each(function(d,i) {
        d3.select(this).select('td')
            .classed('sl-circle-cell', true)
            .append(function (d) {
                return createCircle(d,this);
            });
      });

      // function to create and render a circle
      function createCircle(circleData,target){
        var w = d3.select(target)._groups[0][0].clientWidth,
            h = d3.select(target)._groups[0][0].clientHeight ,
            radius = Math.min(w, h) / 4,
            margin = 7;

        var div = document.createElement("div"),

        svg = d3.select(div).attr('width',w)
            .attr('height',h)
            .append("svg")
            .attr("width" ,w)
            .attr("height" ,h - margin);

        svg.append("g")
                .append("circle")
                .classed('legend-circle',true)
                .datum(circleData)
                .attr("cx" ,10)
                .attr("cy" ,10)
                .attr("r" ,radius)
                .style("fill", function(d) {
                  return colorScale(d.department);
                })
                .attr("legend-id", function(d) {
                  return legendCount++;
                })
                .on('click',function(){
                    var arc = d3.select("#arc-" + d3.select(this).attr("legend-id"));
                    arc.style("opacity", 0.2);
                    setTimeout(function() {
                        arc.style("opacity", 1);
                    }, 1000);
                });

        return div;
      };
    }

    // get/set targetEl for chart
    D3DonutChart.targetEl = function(val){
        if (!arguments.length) {
            return targetEl;
        }
        targetEl = val;
        return D3DonutChart;
    };

    //get/set color scale for chart colors
    //   val = array of colors to represent your chart
    D3DonutChart.colorScale = function(val){
        if (!arguments.length) {
            return colorScale;
        }
        colorScale = d3.scaleOrdinal(val);
        return D3DonutChart;
    };

    // set data for rendering chart
    D3DonutChart.data = function(val){
        if (!arguments.length) {
            return data;
        }
        data = val;
        return D3DonutChart;
    };

    //get/set height for svg
    D3DonutChart.height = function(val){
        if (!arguments.length) {
            return dim.height;
        }
        dim.height = val;
        return D3DonutChart;
    };

    //get/set width for svg
    D3DonutChart.width = function(val){
        if (!arguments.length) {
            return dim.width;
        }
        dim.width = val;
        return D3DonutChart;
    };

    return D3DonutChart;
  }

  exports.donutChart = constructor;

  Object.defineProperty(exports, '__esModule', { value: true });

}));