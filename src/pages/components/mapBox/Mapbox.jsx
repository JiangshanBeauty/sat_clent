import React from 'react'
import { connect } from 'dva';

import mapboxMap from './mapboxMap'
// import search from '../service/search'

class MapboxView extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    createMap() {
        let mbmap = new mapboxMap()
        mbmap.createMap("mapbox_div")

        mbmap.mapHover()

        mbmap.map.on('click', 'vector-landsat8Vector-hover', (e) => {
            if (e.features.length > 0) {
                let feature = e.features[0]
                let path = feature.properties.path
                let row = feature.properties.row
                let hoveredStateId = e.features[0].id;
                // search.search(path, row).then(data => {
                //     console.log(data, "abcd")
                //     this.props.dispatch({ type: "landsatData/setSelectPRGridId", selectPRGridId: hoveredStateId })
                //     this.props.dispatch({ type: "landsatData/setSelectPRGridItems", selectPRGridItems: data })
                // })
                console.log(path, row)
            }
        });
    }
    initMap = element => {
        if (element) {
            setTimeout(() => {
                this.createMap()
            }, 10);
        }
    }

    render() {
        return (<div id="mapbox_div" style={{ height: "100%" }} ref={this.initMap} />)
    }
}

export default connect(
    state => ({
        landsatData: state.landsatData
    })
)(MapboxView)

