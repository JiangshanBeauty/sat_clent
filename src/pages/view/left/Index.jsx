
import React from 'react'
import { connect } from 'dva';

class LeftView extends React.Component {
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
            <div>LeftView</div>
        )
    }
}

export default connect(
    state => ({

    })
)(LeftView);
