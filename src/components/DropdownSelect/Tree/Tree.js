import { TreeSelect } from 'antd'
import service from 'service';

const Tree = ( props ) => {
  //解构参数
  const {
    modelName, //选项数据来源模型
    model, //dropdownSelect模型
    uid, //组件的唯一id
    initialValue, //初始值
    multiple, //是否允许多选
    placeholder, //描述信息
    treeDefaultExpandAll, //缺省展开所有节点
    disabled,
    onChange, //组件值变化事件处理
    onSelect, //节点选中事件处理
    onLoadData, //加载子节点事件处理函数
    controlProps = {}, //传递给Select的属性
  } = props;

  //构造构件属性
  const componentProps = {
    multiple,
    value: initialValue,
    placeholder,
    disabled,
    onChange,
    onSelect,
    loadData: (node) => onLoadData(node),
    treeDefaultExpandAll: treeDefaultExpandAll == undefined ? true : treeDefaultExpandAll,
    treeNodeFilterProp: 'title',
    allowClear: true,
    showSearch: true,
    dropdownStyle: { maxHeight: 300 },
    ...controlProps,
  }

  //情形1：选项数据来自于参数定义，而不是指定模型
  if (!modelName) {
    return <TreeSelect {...componentProps} />
  }

  //情形2：选项数据来自于模型
  //获取数据
  let data = model.data.find(r=>r.key==uid);

  if(!data || !data.tree) {
    data = {tree:[]};
    componentProps.value = undefined;
  }

  //显示UI
  return(
    <TreeSelect {...componentProps} >
      {renderTreeNodes(data.tree)}
    </TreeSelect>
  );

  //构造所有树节点
  function renderTreeNodes(tree) {
    const selectable = props.onlyLeafSelectable ? false : true;
    return tree.map((node) => {
      return (
        node.children && node.children.length > 0 ?
          <TreeSelect.TreeNode {...node} selectable={selectable} dataRef={node}>
            {renderTreeNodes(node.children)}
          </TreeSelect.TreeNode>
        :
          <TreeSelect.TreeNode {...node} dataRef={node} />
      );
    });
  }
}

import PropTypes from 'prop-types';
Tree.propTypes = {
  model: PropTypes.object.isRequired,
  uid: PropTypes.string.isRequired,
  initialValue:  PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
  ]),
  multiple: PropTypes.bool,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
}

import {connect} from 'dva'
export default connect(({dropdownSelect}) =>
  ({model:dropdownSelect})
)(Tree)
