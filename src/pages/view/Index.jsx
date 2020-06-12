
import React from 'react'
import { connect } from 'dva';

import styles from '../../assets/styles.less'
import MapboxView from '../components/mapBox/Mapbox'

class IndexView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    componentDidMount() {

    }
    
    componentWillUnmount() {

    }

    render() {
        return (
            <div className={styles.view_index}>
                <div className={styles.view_left}>
                    左边
                </div>
                <div className={styles.view_right}>
                    右边
                </div>
                <div className={styles.view_footer}>
                    下边
                </div>
                <div className={styles.view_con}>
                    <MapboxView/>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({

    })
)(IndexView);
