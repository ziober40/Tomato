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



var addBarChart = function(data) {

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
    
    //}).on('click', function (d, i) {
    //    d3.select(this)
    //        .style('background-color', '#42efef')
    //        .style('padding-left', '10px')
    //        .text(i);
    //});
});
}