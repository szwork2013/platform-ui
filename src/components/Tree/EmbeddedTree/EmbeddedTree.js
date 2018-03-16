import { Tree,Spin } from 'antd';
const { TreeNode } = Tree;

import { StyledTree } from '../styled';

class EmbeddedTree  extends React.Component {

  componentDidUpdate() {
    if (!this.toSelectFirstNode) return;

    //要去选中第一个节点
    const {
      uid, //组件的唯一id
      model,
      onSelect
    } = this.props;

    const data = model.data.find(r => r.key == uid);
    if (!data || !data.tree || data.tree.length==0)
      return;

    this.selectFirstNode(data, onSelect);
    this.toSelectFirstNode = false;
  }

  componentDidMount() {
    this.toSelectFirstNode = this.props.defaultSelectFirst;
  }

  render() {
    //解构参数
    const {
      uid, //组件的唯一id
      model, //tree模型
      parentKey = 'parent', //指向父亲的字段
      dynamicLoading = true, //是否动态加载数据
      defaultExpandAll,
      onLoadData, //加载子节点事件处理函数
      onSelect, //选择节点事件处理
      onExpand, //展开折叠事件处理
      expandAllDescendants, //点击展开所有的后代节点
      defaultSelectFirst,//是否默认选中第一个节点。
      controlProps = {}, //组件属性
      loading,
    } = this.props;

    //获取数据
    const data = model.data.find(r => r.key == uid);

    if (!data || !data.tree)
      return null;

    //定义组件的属性
    let firstNode = data.tree[0]||{};
    if (firstNode.children) {
      firstNode = firstNode.children[0];
    }

    const conmponentProps = {
      defaultExpandAll: dynamicLoading ? false : defaultExpandAll,
      loadData: onLoadData,
      onSelect: onSelect,
      onExpand: onExpand,
      defaultSelectedKeys: defaultSelectFirst ? [firstNode.key+'']:[],
      ...controlProps,
    }

    if (expandAllDescendants) {
      conmponentProps.defaultExpandedKeys = data.expandedKeys;
      conmponentProps.expandedKeys = data.expandedKeys;
    }
    
    return (
      <Spin spinning={loading}>
        <StyledTree {...conmponentProps}>
          {this.renderTreeNodes(data.tree)}
        </StyledTree>
      </Spin>
    );
  }

  //构造所有树节点
   renderTreeNodes=(tree)=> {
    const selectable = this.props.onlyLeafSelectable ? false : true;
    return tree.map((node) => {
      return (
        node.children && node.children.length > 0 ?
          <TreeNode {...node} dataRef={node} selectable={selectable} >
            {this.renderTreeNodes(node.children)}
          </TreeNode>
        :
          <TreeNode {...node} dataRef={node} />
      );
    });
  }

  //选中第一个节点
  selectFirstNode = (data, onSelect)=> {
    let node = data.tree[0];
    if (node.children) {
      node = node.children[0];
    }
    const e={selected:true, node:{props:{dataRef:node}}};
    onSelect && onSelect(node.key+'', e, true);
  }
}

import PropTypes from 'prop-types';
EmbeddedTree.propTypes = {
  uid: PropTypes.string.isRequired,
  lableKey: PropTypes.string,
  parentKey: PropTypes.string,
  onLoadData: PropTypes.func,
  onSelect: PropTypes.func,
  dynamicLoading:PropTypes.bool,
  defaultOnSelectFirst:PropTypes.bool,
  defaultSelectFirst: PropTypes.bool,
  controlProps: PropTypes.object,
}

import {connect} from 'dva'
export default connect(({tree, loading}) =>
  ({model: tree,loading:loading.models.tree})
)(EmbeddedTree)
