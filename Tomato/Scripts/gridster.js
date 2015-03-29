
gridster = jQuery(".gridster > ul").gridster({
    max_cols: 6,
    widget_margins: [10, 10],
    widget_base_dimensions: [400, 700],
    draggable: {
        handle: 'footer'
    },
    serialize_params: function($w, wgd) {
        return {
            id: $w.attr('id'),
            col: wgd.col,
            row: wgd.row,
            size_x: wgd.size_x,
            size_y: wgd.size_y
        };
    }
}).data('gridster');