import React from 'react';
import Upload from './Upload'
import FileList from './FileList'
import service from 'service';

class Attachment extends React.Component {
  componentDidMount() {
    //解构参数
    const {
      link,
      itemKey,
      dispatch,
      setFieldsValue,
    } = this.props;

    //没有link就是新增的情况，不发消息。
    if(!link)
      return;

    //发消息请求数据
    dispatch({
      type: 'attachments/query',
      payload: {
        uid: service.computeComponentUid(itemKey, this.getSearchParam(link,itemKey)),
        searchParam: this.getSearchParam(link,itemKey),
        setFieldsValue,
      }
    });
  }

  render() {
    //解构参数
    const {
      itemKey,
      link,
      ...rest
    } = this.props;

    //构造属性
    const props = {
      itemKey,
      link,
      searchParam: this.getSearchParam(link,itemKey),
      uid: service.computeComponentUid(itemKey, this.getSearchParam(link,itemKey)),
      ...rest
    }

    //构造属性
    const listProps = {
      searchParam: this.getSearchParam(link,itemKey),
      uid: service.computeComponentUid(itemKey, this.getSearchParam(link,itemKey)),
      ...rest
    }

    //显示UI
    return (
      <div>
        <FileList uid={props.uid} {...listProps}/>
        <Upload {...props} />
      </div>
    );
  }

  getSearchParam=(link,itemKey)=>{
    //没有link就是新增的情况，不发消息。
    if(!link)
     return undefined;

    let where='(entityLink=\''+service.parseEntityLink(link,true)+'\')';
    if(itemKey)//有itemkey 就加上itemkey的条件。
      where='(entityLink=\''+service.parseEntityLink(link,true)+'\' and category=\''+itemKey+'\')';

    const jpql = 'select o from Attachment o where '+where;
    return {
      filter: { //过滤规则
        clazz: 'Attachment',
        jpql: jpql,
      },
      size:1000,
    };
  }
}

import PropTypes from 'prop-types';
Attachment.propTypes = {
  onChange: PropTypes.func,
  setFieldsValue: PropTypes.func,
  itemKey: PropTypes.string,
  link: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
}

import {connect} from 'dva'
export default connect()(Attachment);
