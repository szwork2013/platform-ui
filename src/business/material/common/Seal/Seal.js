import React from 'react';
import {Col,Button} from 'antd';

import {config} from 'utils';
import service from 'service';

//权限定义表单
class Seal extends React.Component{

  componentDidMount() {

  }



  render(){
    //解构参数
    let {
      record, //FormContainer注入：模型
    } = this.props;

    let href=config.API+'/attachments/file?xpnToken='+service.userInfo.token.value+'&entityLink='+
      service.getHrefOfLinkAttr(record).replace(config.API,'')
      +'&category=seal&filename=seal.jpg'+'&timestamp='+new Date().getTime();
    return (
    <img style={{ width: 160,position: 'absolute',top:70,right:70}} src={href}/>
    );
  }
}
export default Seal;
