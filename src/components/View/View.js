import React from 'react';

import {message} from 'antd';

import ActionBar from './ActionBar'
import List from './List'
import PaginationBar from './PaginationBar';

//导入styled组件
import {
  StyledViewDiv,
  theme,
} from './styled';

//列表框架
class View extends React.Component {
  constructor(props) {
    super(props);
    //设置标记：未发送请求数据的请求
    this.initQuery = false;
  }

  componentDidMount() {
    //解构参数
    const {
      notQueryData = false,
      modelName,
      match,
      where = '',
      sort = '',
      searchParam = '',
      uid,
      form, //指定视图使用的表单
      onInitQuery, //初始化时发送的请求
      dispatch,
    } = this.props;

    //获取路由注入的queryType
    let queryType = undefined;
    if (match && match.params) {
      queryType = match.params.queryType
    }

    //发消息请求数据
    !notQueryData && dispatch({
      type: modelName+'/query',
      payload: {
        queryType,
        where,
        sort,
        searchParam,
        initQuery: true,
        dataKey:uid,
        form, //指定视图使用的表单
      }
    });

    if (onInitQuery) {
      onInitQuery({searchParam});
    }

    //设置已发送初始的数据请求
    this.initQuery = true;
  }

  render() {
    const props = this.props;

    //解构参数
    const {
      editMode, //编辑模式
      batchSaveHref, //可编辑时批量保存链接
      list, //列表参数
      actionBar, //操作条参数
      modelName, //模型名称
      tabs, //tab数组
      dispatch,
      loading,
      appTheme, //应用皮肤定义
      heightOffset, //高度调整量
      onSearch, //检索事件处理
      preventDefaultOnSearch, //阻止缺省的OnSearch事件处理
      uid, //多个视图使用一个模型
      form, //指定视图使用的表单
    } = props;

    //获取视图对应的数据
    let model = this.getViewModel(props, modelName, uid);
    if (!model) return null;

    if (!this.initQuery||!loading&&!model.list) return null;

    //获取翻页器参数
    theme.hasPaginationBar = props.paginationBar == false ? false : true;
    const paginationBar = props.paginationBar || {};

    //设置是否有操作条
    theme.hasActionBar = actionBar ? true : false;

    //操作条参数
    const actionBarProps = {
      editMode,
      batchSaveHref, //郑波2018-1-24：支持批量保存
      actionBar,
      fulltextFields: this.getFullTextFields(list.columns),
      modelName,
      model,
      dispatch,
      appTheme,
      onSearch,
      preventDefaultOnSearch,
      uid,
      form, //郑波2018-1-25：指定视图使用的表单
    }

    //列表参数
    const listProps = {
      treedata: model.searchParam && model.searchParam.treedata,
      editMode,
      list,
      model,
      modelName,
      tabs,
      dispatch,
      loading,
      appTheme,
      heightOffset,
      uid,
      form, //郑波2018-1-25：指定视图使用的表单
    }

    //翻页器参数
    const paginationBarProps = {
      paginationBar,
      model,
      modelName,
      dispatch,
      appTheme,
      uid,
    }

    return (
      <StyledViewDiv key={modelName+'View'+uid}>
        {/*操作条div*/}
        {
          props.actionBar!=false &&
          <ActionBar key={modelName+'ViewActionBar'+uid} {...actionBarProps}/>
        }

        {/*列表div*/}
        <List key={modelName+'ViewList'+uid} {...listProps}/>

        {/*翻页器*/}
        {
          props.paginationBar!=false &&
          <PaginationBar key={modelName+'PaginationBar'+uid} {...paginationBarProps} />
        }
      </StyledViewDiv>
    )
  }

  //获取视图对应的模型
  getViewModel = (props, modelName, uid) => {
    let model = props[modelName];
    if (!model) {
      message.info('从属性中无法获得名称为"'+modelName+'"的模型数据！');
      return null;
    }

    let dataKey = uid||'default';
    let viewData = model.viewData.find((r) => r.dataKey==dataKey);
    if (!viewData) return null;

    return viewData;
  }

  //获取纳入全文检索的字段名
  getFullTextFields = (columns) => {
    let fields = [];
    if (!columns) return fields; //郑波2018-1-23增加
    for (let col of columns) {
      if (col.fulltext != false) {
        let key = col.fulltext!=true&&col.fulltext?col.fulltext:col.key;
        fields.push({key: key, title: col.title});
      }
    }

    return fields;
  }
}

import PropTypes from 'prop-types';
View.propTypes = {
	appTheme: PropTypes.string,
  actionBar: PropTypes.object,
  list: PropTypes.object,
  form: PropTypes.object,
  editMode: PropTypes.string,
  uid: PropTypes.string,
  heightOffset: PropTypes.number,
  batchSaveHref: PropTypes.string,
  modelName: PropTypes.string.isRequired,
  notQueryData: PropTypes.bool,
  onSearch:  PropTypes.func,
  preventDefaultOnSearch: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object,
}

//连接模型(model)和组件，使模型变化时，组件属性也跟着变化，从而重新加载组件
import { connect } from 'dva';
export default connect(({webapp:{theme}}) =>
  ({appTheme:theme})
)(View);