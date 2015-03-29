﻿function addTomatoChart(data) {
    gridster.add_widget.apply(gridster, ['<li id="wykres">Wykres danych<br /><svg id="kolka"></svg><footer>|||</footer></li>', 2, 1, 1, 1]).after(function () {

        var display = d3.select("#display");

        d3.json(data, function(e, i) {
            data.forEach(function(d) {
                d.Date = new Date(parseInt(String(d.Date).substr(6)));
            });

            console.log(data);

            var display = d3.select("#display");

            //table
            var tdiv = display.append("svg").classed("table", true);
            var table = d3.chart.table();
            table.data(data);
            table(tdiv);

            var svg = d3.select("svg");
            //scatter plot
            var sgroup = svg.append("g")
                .attr("transform", "translate(50, 0)");
            var scatter = d3.chart.scatter();
            scatter.data(data);
            scatter(sgroup);

            ////histogram
            //var hgroup = svg.append("g")
            //    .attr("transform", "translate(450, 0)");
            //var histogram = d3.chart.histogram();
            //histogram.data(data);
            //histogram(hgroup);

            //brush
            var bgroup = svg.append("g")
                .attr("transform", "translate(100, 430)");
            var brush = d3.chart.brush();
            brush
                .data(data)
                .width(800);
            brush(bgroup);

            brush.on("filter", function(filtered) {
                console.log("filtered", filtered);

                scatter.data(filtered);
                scatter.update();
                table.data(filtered);
                table.update();
                //histogram.data(filtered);
                //histogram.update();

            });

            table.on("hover", function(hovered) {
                scatter.highlight(hovered);
                brush.highlight(hovered);
            });
            scatter.on("hover", function(hovered) {
                table.highlight(hovered);
                brush.highlight(hovered);
            });
            //histogram.on("hover", function(hovered) {
            //    table.highlight(hovered);
            //    scatter.highlight(hovered);
            //    brush.highlight(hovered);
            //});

        });
    });
}