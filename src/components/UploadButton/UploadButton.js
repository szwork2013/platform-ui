import React from 'react';
import PropTypes from 'prop-types';
import {Button, message, Upload} from 'antd';
import service from 'service';

const UploadButton = (props) => {
  const {name = "file", icon, style, title = "导入", showUploadList = false, onSuccess, onError, ...otherProps} = props;
  const uploadProps = {
    name: name,
    headers: {
      xpnToken: service.userInfo.token.value,
    },
    showUploadList,
    onChange(info) {
      if (info.file.status !== 'uploading') {
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} 导入成功!`, 2);
        if (onSuccess && onSuccess instanceof Function) {
          onSuccess(info);
        }
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 导入失败!.`, 2);
        if (onError && onError instanceof Function) {
          onError(info);
        }
      }
    },
  };

  return <Upload {...{...uploadProps, ...otherProps}} style={style}><Button type="primary" icon={icon}>{title}</Button></Upload>
}

UploadButton.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
  style: PropTypes.object,
  name: PropTypes.string,
  accept: PropTypes.string,
  action: PropTypes.string.isRequired,
  showUploadList: PropTypes.bool,
  onSuccess: PropTypes.func,//上传成功 回调
  onError: PropTypes.func,//上传失败 回调
}

export default UploadButton;
