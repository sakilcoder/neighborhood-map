var map = L.map('map', {
    // minZoom: 6,
    // maxZoom: 9,
    zoomSnap: 0.01,
    zoomControl: false
}).setView([0, 0], 13);
map.scrollWheelZoom.disable();

var bmBounds = [[3.2452977280000002, 5.2123172609999999], [-2.5854558270000001, -0.6581012840000000]];

map.fitBounds(bmBounds);
var imageOverlay = L.imageOverlay('assets/images/bm.png', bmBounds);

imageOverlay.addTo(map);


let setStyle = function () {
    return {
        fillOpacity: 0,
        opacity: 0,
    }
}

var geojsonLayer = L.geoJSON(bm, {
    style: setStyle,
}).addTo(map);

var highlightStyle = {
    weight: 2,
    color: 'red',
    fillOpacity: 0.5
};

function highlightFeature(e) {
    var layer = e.target;
    layer.setStyle(highlightStyle);
}

function resetHighlight(e) {
    var layer = e.target;
    layer.setStyle({
        weight: 0,
        fillOpacity: 0
    });
}

function openURL(e) {
    var layer = e.target;
    var url = layer.feature.properties.url;
    window.open(url, '_blank');
}

geojsonLayer.eachLayer(function (layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight
    });

    layer.on('click', openURL);

});