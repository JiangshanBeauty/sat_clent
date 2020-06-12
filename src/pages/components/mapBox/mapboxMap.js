import MapboxGl from 'mapbox-gl'
let hostUrl = "http://10.16.28.2:5000"

export default class mapboxMap {

    createMap(container) {
        this.map = new MapboxGl.Map({
            container: container,
            style: {
                version: 8,
                sources: {
                    'raster-tiles': {
                        type: 'raster',
                        tiles: [
                            'http://www.google.cn/maps/vt?lyrs=s@781&gl=cn&x={x}&y={y}&z={z}'
                        ],
                        tileSize: 256,
                        minzoom: 0,
                        maxzoom: 22
                    },
                    'vector-landsat8Vector': {
                        type: 'vector',
                        tiles: [
                            // 'http://localhost:5000/tile/landsat8Vector?x={x}&y={y}&z={z}&tname=2_2'
                            `${hostUrl}/tile/landsat8Vector?x={x}&y={y}&z={z}&tname=2_2`
                        ]
                    },
                    'raster-landsat8': {
                        type: 'raster',
                        tiles: [
                            // 'http://localhost:5000/tile/s3tile?x={x}&y={y}&z={z}&tname=2_2'
                            `${hostUrl}/tile/s3tile?x={x}&y={y}&z={z}&tname=2_2`
                        ],
                        tileSize: 256,
                        minzoom: 7,
                        maxzoom: 18
                    }
                },
                layers: [{
                    id: 'raster-tiles',
                    type: 'raster',
                    source: 'raster-tiles',
                    minzoom: 0,
                    maxzoom: 22
                }, {
                    id: 'raster-landsat8',
                    type: 'raster',
                    source: 'raster-landsat8',
                    minzoom: 7,
                    maxzoom: 18
                }]
            },
            center: [119.2645, 31.2103],
            zoom: 3
        });
    }
    mapHover() {
        let map = this.map
        map.on('load', function () {
            map.addLayer({
                'id': 'vector-landsat8Vector-hover',
                'type': 'fill',
                'source': 'vector-landsat8Vector',
                'source-layer': 'contour',
                'layout': {},
                'paint': {
                    'fill-outline-color': 'red',
                    'fill-color': '#627BC1',
                    'fill-opacity': [
                        'case',
                        ['boolean', ['feature-state', 'hover'], false],
                        0.0,
                        0.0
                    ]
                }
            });

            map.addLayer({
                'id': 'vector-landsat8Vector',
                'type': 'line',
                'source': 'vector-landsat8Vector',
                'source-layer': 'contour',
                'layout': {},
                'paint': {
                    'line-opacity': 0.4,
                    'line-width': [
                        'case',
                        ['boolean', ['feature-state', 'hover'], false],
                        2,
                        1
                    ],
                    'line-color': [
                        'case',
                        ['boolean', ['feature-state', 'hover'], false],
                        'red',
                        '#99CCCC'
                    ]
                }
            });
            var hoveredStateId = null;
            map.on('mousemove', 'vector-landsat8Vector-hover', function (e) {
                if (e.features.length > 0) {
                    if (hoveredStateId) {
                        map.setFeatureState(
                            { source: 'vector-landsat8Vector', 'sourceLayer': 'contour', id: hoveredStateId },
                            { hover: false }
                        );
                    }
                    hoveredStateId = e.features[0].id;
                    map.setFeatureState(
                        { source: 'vector-landsat8Vector', 'sourceLayer': 'contour', id: hoveredStateId },
                        { hover: true }
                    );
                }

            });

            map.on('mouseleave', 'vector-landsat8Vector-hover', function () {
                if (hoveredStateId) {
                    map.setFeatureState(
                        { source: 'vector-landsat8Vector', 'sourceLayer': 'contour', id: hoveredStateId },
                        { hover: false }
                    );
                }
                hoveredStateId = null;
            });


        })
    }
}