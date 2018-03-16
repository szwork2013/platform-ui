import React from 'react';
import EmbeddedTree from './EmbeddedTree';
import service from 'service';
import PropTypes from 'prop-types';
import {connect} from 'dva'

class Tree extends React.Component {
  componentDidMount() {
    //解构参数
    const {
      labelKey,
      modelName,
      searchParam,
      dispatch,
    } = this.props;

    //向model发送消息请求数据
    dispatch({
      type: 'tree/query',
      payload: {
        labelKey,
        uid: service.computeComponentUid(modelName, searchParam),
        modelName,
        searchParam,
      }
    });
  }

  render() {
    //解构参数
    const {
      modelName, //数据源的模型名称
      searchParam, //查询参数
      expandAllDescendants,
      ...rest
    } = this.props;

    //构造属性
    const uid = service.computeComponentUid(modelName, searchParam);
    const componentProps = {
      uid: uid,
      expandAllDescendants,
      ...rest
    }

    //显示UI
    return (
      <EmbeddedTree onLoadData={this.onLoadData}
        onExpand={this.handleOnExpend}
        {...componentProps}
      />
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
      const uid = service.computeComponentUid(this.props.modelName, this.props.searchParam);
      const childrenLink = record.childrenLink;
      const { labelKey, modelName, searchParam, parentKey, expandAllDescendants } = this.props;

      const payload = {
          uid, //组件的唯一id
          nodeKey, //当前节点的key
          childrenLink, //子节点的链接
          node: record.dataRef,
          labelKey, //标题字段
          modelName, //模型名称
          searchParam, //搜索参数
          parentKey, //父亲节点字段
          expandAllDescendants, //点击展开所有后代节点
      };

      this.props.dispatch({
        type: 'tree/children',
        payload: payload,
      });
      resolve();
    });
  }

  //处理展开折叠事件
  handleOnExpend = (expandedKeys, {expanded, node}) => {
    if (this.props.onExpand)
      this.props.onExpand(expandedKeys, {expanded, node});

    //非一次展开所有后代，则不处理
    if (!this.props.expandAllDescendants) return true;

    //解构参数
    const {
      modelName, //数据源的模型名称
      searchParam, //查询参数
      dispatch,
    } = this.props;

    //获得组件id
    const uid = service.computeComponentUid(modelName, searchParam);

    let record = node.props.dataRef;
    if (expanded && record.children) { //展开已存在儿子节点
      //向model发送消息展开节点
      dispatch({
        type: 'tree/onExpand',
        payload: {
          uid,
          expandedKeys,
          expanded,
          record,
          node,
        }
      });
    }

    if (!expanded) { //关闭打开的节点
      //向model发送消息关闭节点
      dispatch({
        type: 'tree/onExpand',
        payload: {
          uid,
          expandedKeys,
          expanded,
          record,
          node,
        }
      });
    }

    return true;
  }
}

Tree.propTypes = {
  labelKey: PropTypes.string,
  modelName: PropTypes.string.isRequired,
  searchParam: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
}

export default connect()(Tree);
