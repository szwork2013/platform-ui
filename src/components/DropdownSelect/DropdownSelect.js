import React from 'react';
import List from './List';
import Tree from './Tree';
import service from 'service';
import PropTypes from 'prop-types';
import {connect} from 'dva';

class DropdownSelect extends React.Component {
  componentDidMount() {
    if (this.props.notQueryData) return;
    queryData(this.props);
  }

  render() {
    //解构参数
    const {
      type, //下拉选择类型：List || Tree
      value,
      ...rest
    } = this.props;

    let initialValue = this.props.initialValue||value;
    //郑波2017-11-3增加：避免缺省值是数字时不正常
    if (initialValue &&
      !(initialValue instanceof Array ||
        initialValue instanceof Object))
      initialValue += '';
    //---END---

    //构造属性
    const componentProps = {
      uid: computeUid(this.props),
      initialValue,
      ...rest
    }

    //显示UI
    return (
      type.toLowerCase() === 'tree' ?
      <Tree onLoadData={this.onLoadData} {...componentProps} />
      :
      <List {...componentProps} />
    );
  }

  //需要加载数据
  onLoadData = (treeNode) => {
    const record = treeNode.props;
    return new Promise((resolve) => {
      if (record.children) { //已经加载了子节点
        resolve();
        return;
      }

      //请求子节点数据
      const nodeKey = service.parseRecordUrl(record);
      const uid = computeUid(this.props);
      const childrenLink = record.childrenLink;
      const { labelKey, modelName, searchParam, parentKey } = this.props;
      const payload = {
        uid, //组件的唯一id
        nodeKey, //当前节点的key
        childrenLink, //子节点的链接
        node: record.dataRef,
        labelKey, //标题字段
        modelName, //模型名称
        searchParam, //搜索参数
        parentKey, //父亲节点字段
      };

      this.props.dispatch({
        type: 'dropdownSelect/children',
        payload: payload,
      });
      resolve();
    });
  }
}

//计算组件的uid
function computeUid(props) {
  const {controlId, modelName, type} = props;
  return 'uid-'+modelName+'-'+type+'-'+controlId;
}

//请求选项数据
function queryData({controlId, dispatch, modelName, searchParam, type, labelKey}) {
  //向下拉选择model发送消息请求数据
  if(!modelName) return;

  dispatch({
    type: 'dropdownSelect/query',
    payload: {
      type,
      labelKey,
      uid: computeUid({controlId, modelName, type}),
      modelName,
      searchParam,
    }
  });
}

//添加一条选项数据
function add({controlId, dispatch, modelName, type, labelKey, item}) {
  //向下拉选择model发送消息请求数据
  if(!modelName) return;

  dispatch({
    type: 'dropdownSelect/add',
    payload: {
      type,
      labelKey,
      uid: computeUid({controlId, modelName, type}),
      item
    }
  });
}

DropdownSelect.queryData = queryData;
DropdownSelect.add = add;

DropdownSelect.propTypes = {
  type: PropTypes.string.isRequired,
  parentKey: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  modelName: PropTypes.string,
  searchParam: PropTypes.object,
}

export default connect()(DropdownSelect);
