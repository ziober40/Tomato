
function addCircleChart(data) {
    gridster.add_widget.apply(gridster, ['<li id="wykres">Wykres danych<br /><svg id="kolka"></svg><footer>|||</footer></li>', 2, 1, 1, 1]).after(function () {
        var cx = 50;
        var cy = 350;
        var svg = d3.select("#kolka");
        var g = svg.append("g");
        var circle = g.selectAll("circle").data(data);

        circle.enter().append("circle");

        var maxCreated = d3.max(data, function (d) { return new Date(parseInt(String(d.Date).substr(6))); });
        var minCreated = d3.min(data, function (d) { return new Date(parseInt(String(d.Date).substr(6))); });
        var createdScale = d3.time.scale()
            .domain([minCreated, maxCreated])
            .range([cx, 750]);
        var maxScore = d3.max(data, function (d) {
            return d.VotesCount;
        });
        var maxR = d3.max(data, function (d) {
            return d.CommentsCount;
        });

        var yScale = d3.scale.linear()
            .domain([maxScore, 0])
            .range([cx, cy]);

        var rScale = d3.scale.linear()
            .domain([0, maxR])
            .range([5, 20]);

        var xAxis = d3.svg.axis()
            .scale(createdScale)
            .ticks(7)
            .tickFormat(d3.time.format("%H:%M"));

        var yAxis = d3.svg.axis()
            .scale(yScale)
            .ticks(5)
            .orient("left");

        var xg = svg.append("g")
            .classed("axis", true)
            .attr("transform", "translate(" + [0, cy] + ")")
            .call(xAxis);

        var yg = svg.append("g")
            .classed("axis", true)
            .attr("transform", "translate(" + [cx, 0] + ")")
            .call(yAxis);

        circle.attr({
            cx: function (d) {
                return createdScale(new Date(parseInt(String(d.Date).substr(6))));
            },
            cy: function (d) { return yScale(d.VotesCount); },
            r: function (d) { return rScale(d.CommentsCount); },
            fill: '#25B0B0',
            title: "wykres"
        }).on('mouseover', function (e) {
            console.log(e.VotesCount);
        }).on('click', function (e) {
            window.open(e.Url);
        });
    });
};