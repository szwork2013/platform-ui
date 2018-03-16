import React from 'react'
import {Tree} from 'components';
import {connect} from 'dva';

const OrgTree = (props) => {
  const {dispatch,roleCondition, ouLevel, ouType} = props;
  const treeProps = {
    labelKey: 'orgName',//用户显示名称
    modelName: 'orgs',
    parentKey: 'parentOrg',
    searchParam: {
      search: 'sendeeselect',
      roleCondition,
      ouLevel,
      ouType,
    },
    isDynamicLoading: true,
    defaultSelectFirst: true,
    onSelect: (key) => {
      dispatch({type: 'sendeeSelect/queryUserList', payload: {orgId: key}});
    },
  }
  return (
    <Tree {...treeProps}/>
  );
}
export default connect(({sendeeSelect: {roleCondition, ouLevel, ouType}}) => ({
  roleCondition,
  ouLevel,
  ouType,
}))(OrgTree);
