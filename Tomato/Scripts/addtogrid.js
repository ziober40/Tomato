var addToGrid = function (data) {
    $.each(data, function (i, widget) {
        var colNumber = 4;
        var col = i % colNumber + 1;
        var row = Math.ceil((i + 1) / colNumber);
        var id = widget.Id;

        setTimeout(function () {
            var htmlString = '';
            if (widget.ImagePreview != '') {
                htmlString = '<li style="overflow:hidden;height:450;width:400px" id="' + id + '"><div class="postimage" ><a href="' + widget.Image + '" target="_blank"><img src="' + widget.ImagePreview + '" /></a></div><br /><a href="' + widget.Url + '"><div class="posttext" style="height:180px;">' + widget.Body + '<br /><a href="' + widget.Url + '">post</a><br /><a href="' + widget.Image + '">obrazek</a>' + widget.Body.length + '</div></div> <footer>|||</footer></li>';
            } else {
                htmlString = '<li style="overflow:hidden;height:450;width:400px" id="' + id + '"><a href="' + widget.Url + '"><div class="posttext" >' + widget.Body + '<br /><a href="' + widget.Url + '">post</a><br />' + widget.Body.length + '</div></div><footer>|||</footer></li>';
            }
            $(".postimage").unbind('mouseenter').unbind('mouseleave');
            $(".postimage").hover(
                function () {
                    $(this).filter(':not(:animated)').animate({
                        height: '440px'
                    }, 'fast');
                },
                function () {
                    $(this).animate({
                        height: '225px'
                    }, 'fast');
                });
            gridster.add_widget.apply(gridster, [htmlString, 1, 1, col, row]);
        }, 500 * i);

    });
};

function addCircleChart(data) {
    gridster.add_widget.apply(gridster, ['<li id="wykres">Wykres danych<br /><svg id="kolka"></svg><footer>|||</footer></li>', 2, 1, 1, 1]).after(function () {
        var svg = d3.select("#kolka");
        var g = svg.append("g");
        var circle = g.selectAll("circle").data(data);

        circle.enter().append("circle");

        var maxScore = d3.max(data, function (d) {
            return d.VotesCount;
        });

        var maxR = d3.max(data, function (d) {
            return d.CommentsCount;
        });

        var xScale = d3.scale.ordinal()
            .domain(d3.range(data.length))
            .rangeBands([10, 800], 0.5);

        var yScale = d3.scale.linear()
            .domain([0, maxScore])
            .range([0, 410]);

        var rScale = d3.scale.linear()
            .domain([0, maxR])
            .range([5, 20]);

            circle.attr({
                cx: function(d,i) { return xScale(i); },
                cy: function(d) { return yScale(1000 - d.VotesCount); },
                r: function(d) { return rScale(d.CommentsCount); },
                fill: '#25B0B0'
            });

        //    svg.append('circle')
        //.attr({
        //    cx: 100,
        //    cy: 100,
        //    r: 40,
        //    fill: '#25B0B0'
        //});

        //bars.attr({
        //    x: function (d, i) { return xScale(i); },
        //    y: function (d, i) { return yScale(1100 - d.VotesCount); },
        //    width: 25,
        //    height: function (d, i) { return yScale(d.VotesCount); }
        //})
        //.on('mouseover', function (e) {
        //    console.log(e);
        //});
    });
};

function addBarChart(data) {
    gridster.add_widget.apply(gridster, ['<li id="wykres">takie tam<br /><svg id="wykresSlupkowy"></svg><footer>|||</footer></li>', 2, 1, 1, 1]).after(function() {
        var svg = d3.select("#wykresSlupkowy");
        var g = svg.append("g");
        var bars = g.selectAll("rect").data(data);

        bars.enter().append("rect");

        var maxScore = d3.max(data, function (d) {
            return d.VotesCount;
        });
        var xScale = d3.scale.ordinal()
            .domain(d3.range(data.length))
            .rangeBands([0, 800], 0.5);
        var yScale = d3.scale.linear()
            .domain([0, maxScore])
            .range([0, 410]);

        bars.attr({
            x: function(d, i) { return xScale(i); },
            y: function (d, i) { return yScale(1100 - d.VotesCount); },
            width: 25,
            height: function(d, i) { return yScale(d.VotesCount); }
        })
        .on('mouseover', function(e) {
            console.log(e);
        });
    });
};

function addBarChartfromDivs(data) {
    gridster.add_widget.apply(gridster, ['<li id="wykres">takie tam<br /><div id="bars" width=500px height=500px></div><footer>|||</footer></li>', 2, 1, 1, 1]).after(function() {
        var divs = d3.select('#bars')
            .selectAll('div.item')
            .data(data);

        var maxScore = d3.max(data, function(d) {
            return d.VotesCount;
        });

        var yScale = d3.scale.linear()
            .domain([0, maxScore])
            .range([0,400]);


        divs.enter()
            .append('div').classed('item', true);

        divs.style({
            width: '10px',
            height: function(d) { return yScale(d.VotesCount) + 'px'; },
            margin: '5px',
            float: 'left',
            'background-color': '#25B0B0'
        });

    // on click functionality might be usefull in future
    //}).on('click', function (d, i) {
    //    d3.select(this)
    //        .style('background-color', '#42efef')
    //        .style('padding-left', '10px')
    //        .text(i);
    //});
});
}