
import React, { Component } from 'react'
import { connect } from 'dva';
// import router from 'umi/router';

// import '../assets/common.less';

import zhCN from 'antd/lib/locale-provider/zh_CN';
import { ConfigProvider } from 'antd';



class BasicLayout extends Component {
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
      <React.Fragment>
        <ConfigProvider locale={zhCN} >
          {this.props.children}
        </ConfigProvider>
      </React.Fragment>
    )
  }
}

export default connect(state => ({

}))(BasicLayout);