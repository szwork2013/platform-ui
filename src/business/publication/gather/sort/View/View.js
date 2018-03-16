import React from 'react';

import {View,DropdownSelect} from 'components';


import modelDefinition from '../../../draft/model';

//取得模型名称
const modelName = modelDefinition.namespace;


class ViewComponent extends React.Component {

    componentDidMount() {
    }

    render() {
        //定义操作条属性
        const actionBarProps = {
            new: false, //显示新增按钮
            delete: false, //显示删除按钮
            newRow: false,
          searchBar:false,
          reloadTable:false,
        }
        let searchParam = { //搜索条件
            filter: { //过滤规则
                clazz: 'Draft', //模型对应的后台实体类
                where: 'o.submitDate!=null and o.status=1', //条件
            },
            size: 100, //指定每页记录数
            sort: 'o.sortNo,asc' //缺省排序规则
        }

        //定义列表属性
        const listProps = {
            columns: [ // 和antd table组件的列定义相同
                {title: '投稿日期', width: 120, dataIndex: 'createdTime', key: 'createdTime',link: 'open',},
                {title: '投稿部门', width: 140, dataIndex: 'orgName', key: 'orgName', fulltext: false},
                {title: '标题', width: 390, dataIndex: 'subject', key: 'subject'},
                {title: '备注', width: 120, dataIndex: 'remark', key: 'remark'},
            ],
           dragAble:true,
        };

        //翻页器属性
        const paginationBarProps = false;

        return (
            <View key={modelName + 'ViewLayout'} {...this.props}
                  editMode={true}
                  modelName={modelName} //模型名称
                  searchParam={searchParam}
                  actionBar={actionBarProps} //操作条定义
                  list={listProps} //列表定义
                  paginationBar={paginationBarProps}
            />
        )
    }
}

//连接模型(model)和组件，使模型变化时，组件属性也跟着变化，从而重新加载组件
import { connect } from 'dva';
export default connect(({draft, loading}) =>
    ({draft, loading: loading.models[modelName]})
)(ViewComponent);
