import React from 'react';
import service from 'service';
import config from 'config';
import {ModuleLayout, Tree, View,} from 'components';
import {connect} from 'dva';




//选项设置表单
const ViewComponent = ( props ) => {
  //解构参数
  let {

  } = props;
    let xpnToken = service.userInfo.token.value;
    const rootUrl = config.API.replace('api', '');
    return (
        <div style={{height:'100%'}}>
            <iframe src={ rootUrl + 'pdfjs-1.9.426-dist/web/viewer.html?file=' + encodeURIComponent('/华能辅助办公系统操作手册.pdf')}
                style={{
                width: '100%',
                height: '100%',
                border: 0,
                margin: 0,
                padding: 0
                }}
            />
        </div>
    )
 
}

export default ViewComponent;