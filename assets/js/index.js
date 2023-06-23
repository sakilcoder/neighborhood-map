var map = L.map('map', {
    zoomSnap: 0.1,
    zoomControl: false
}).setView([0, 0], 13);
map.scrollWheelZoom.disable();

let setStyle = function (feature) {
    return {
        fillColor: feature.properties.color,
        fillOpacity: 1,
        opacity: 0,
        weight: 0,
    }
}

// let onEachNeighbor = function(feature, layer){

// }

var geojsonLayer = L.geoJSON(bm, {
    style: setStyle,
    // onEachFeature: onEachNeighbor
}).addTo(map);

var highlightStyle = {
    weight: 2,
    fillColor: '#dadce1',
    fillOpacity: 0.8,
    opacity: 0.8,
    color: '#989a9d'
};

function highlightFeature(e) {
    var layer = e.target;
    layer.setStyle(highlightStyle);

    if(e.target.feature.properties.info=='South Lake Union'){
        const element = document.querySelector('.southlake');
        element.style.fontWeight = 'bold';
    }else if(e.target.feature.properties.info=='Belltown'){
        const element = document.querySelector('.Belltown');
        element.style.fontWeight = 'bold';
    }else if(e.target.feature.properties.info=='Pike Place Market'){
        const element = document.querySelector('.pikePlace');
        element.style.fontWeight = 'bold';
    }else if(e.target.feature.properties.info=='Downtown'){
        const element = document.querySelector('.Downtown');
        element.style.fontWeight = 'bold';
    }else if(e.target.feature.properties.info=='Financial District'){
        const element = document.querySelector('.Financial');
        element.style.fontWeight = 'bold';
    }else{
        const element = document.querySelector('.firstHill');
        element.style.fontWeight = 'bold';
    }

    var bounds = layer.getBounds();
    
    map.fitBounds(bounds, { animate: true });
    
}

function resetHighlight(e) {
    var layer = e.target;
    layer.setStyle({
        weight: 0,
        fillOpacity: 1,
        fillColor: e.target.feature.properties.color,
        opacity: 1,
    });

    if(e.target.feature.properties.info=='South Lake Union'){
        const element = document.querySelector('.southlake');
        element.style.fontWeight = 'normal';
    }else if(e.target.feature.properties.info=='Belltown'){
        const element = document.querySelector('.Belltown');
        element.style.fontWeight = 'normal';
    }else if(e.target.feature.properties.info=='Pike Place Market'){
        const element = document.querySelector('.pikePlace');
        element.style.fontWeight = 'normal';
    }else if(e.target.feature.properties.info=='Downtown'){
        const element = document.querySelector('.Downtown');
        element.style.fontWeight = 'normal';
    }else if(e.target.feature.properties.info=='Financial District'){
        const element = document.querySelector('.Financial');
        element.style.fontWeight = 'normal';
    }else{
        const element = document.querySelector('.firstHill');
        element.style.fontWeight = 'normal';
    }

    map.fitBounds(geojsonLayer.getBounds(), { animate: true });

}

function openURL(e) {
    var layer = e.target;
    var url = layer.feature.properties.url;
    window.open(url, '_blank');
}

geojsonLayer.eachLayer(function (layer) {

    if(layer.feature.properties.info=='South Lake Union'){
        layer.bindTooltip('<span class="southlake">' + layer.feature.properties.info + '</span>', {
            permanent: true,
            direction: "center",
            opacity: 1,
            className: 'label-tooltip',
            offset: [0, 30],
        });

        const element = document.querySelector('.southlake');
        element.style.color = layer.feature.properties.fcolor;

    }else if(layer.feature.properties.info=='Belltown'){
        layer.bindTooltip('<span class="Belltown">' + layer.feature.properties.info + '</span>', {
            permanent: true,
            direction: "center",
            opacity: 1,
            className: 'label-tooltip',
        });

        const element = document.querySelector('.Belltown');
        element.style.color = layer.feature.properties.fcolor;

    }else if(layer.feature.properties.info=='Pike Place Market'){
        layer.bindTooltip('<span class="pikePlace">' + layer.feature.properties.info + '</span>', {
            permanent: true,
            direction: "center",
            opacity: 1,
            className: 'label-tooltip',
            offset: [-70, 0]
        });

        const element = document.querySelector('.pikePlace');
        element.style.color = layer.feature.properties.fcolor;

    }else if(layer.feature.properties.info=='Downtown'){
        layer.bindTooltip('<span class="Downtown">' + layer.feature.properties.info + '</span>', {
            permanent: true,
            direction: "center",
            opacity: 1,
            className: 'label-tooltip',
            offset: [50, 0]
        });

        const element = document.querySelector('.Downtown');
        element.style.color = layer.feature.properties.fcolor;

    }else if(layer.feature.properties.info=='Financial District'){
        layer.bindTooltip('<span class="Financial">' + layer.feature.properties.info + '</span>', {
            permanent: true,
            direction: "center",
            opacity: 1,
            className: 'label-tooltip',
            offset: [-50, 30]
        });

        const element = document.querySelector('.Financial');
        element.style.color = layer.feature.properties.fcolor;

    }else{
        layer.bindTooltip('<span class="firstHill">' + layer.feature.properties.info + '</span>', {
            permanent: true,
            direction: "center",
            opacity: 1,
            className: 'label-tooltip',
        });

        const element = document.querySelector('.firstHill');
        element.style.color = layer.feature.properties.fcolor;
    }

    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight
    });

    layer.on('click', openURL);

});

map.fitBounds(geojsonLayer.getBounds());