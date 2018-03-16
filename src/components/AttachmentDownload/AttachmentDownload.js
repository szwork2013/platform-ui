import React from 'react';
import PropTypes from 'prop-types';
import {Icon} from 'antd';
import config from 'config';
import service from 'service';

const {api} = config; //取得RESTful api配置信息
let {rootPath} = api;

const AttachmentDownload = (props) => {
  const {id, fileName, category='',icon = "download", style, title = "下载", ...otherProps} = props;
  const entityLink = '/template_excel/' + id;
  const href = `${rootPath}/attachments/file?xpnToken=${service.userInfo.token.value}&entityLink=${entityLink}&category=${category}&filename=${encodeURIComponent(fileName)}`;
  return <a className='poplink' style={style} href={href} target='_blank' {...otherProps}><Icon type={icon}/>{title}</a>
}

AttachmentDownload.propTypes = {
  id: PropTypes.number.isRequired,
  fileName: PropTypes.string.isRequired,
  category: PropTypes.string,
  style: PropTypes.object,
  title: PropTypes.string,
  icon: PropTypes.string,
}

export default AttachmentDownload;
