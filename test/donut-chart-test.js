var tape = require('tape-catch'),
    jsdom = require('jsdom'),
    d3_donut_chart = require('../');
d3 = require('d3');

tape('d3_svg creates an svg element', function(test) {
    var document = jsdom.jsdom();
    global.document = document;
    var dim = {
        width: 800,
        height: 400

    }
    var chartColors = ["#007e43", "#00d84f", "#b7ff2f", "#fdfe1a", "#e0aa00", "#c68100"];

    var data = [
        {
            "betrange" : "$10-25",
            "tables": 34
        },
        {
            "betrange" : "$20-45",
            "tables": 56
        },
        {
            "betrange" : "$50-90",
            "tables": 54
        },
        {
            "betrange" : "90-120",
            "tables": 24
        },
        {
            "betrange" : "140-200",
            "tables": 24
        },
        {
            "betrange" : "$400-above",
            "tables": 46
        }];

    var chart = d3_donut_chart.donutChart()
        .targetEl(d3.selectAll('#donut-chart-container'))
        .width(dim.width)
        .height(dim.height)
        .colorScale(chartColors)
        .data(data);

    var div = chart.call();

    test.ok(div, 'svg element exists');
    delete global.document;
    test.end();
});
