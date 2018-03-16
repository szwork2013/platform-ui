import React from 'react';
import { connect } from 'dva';
import { ModuleLayout } from 'components';

const menuItems = [
  {
    path: 'draft',
    icon: 'book',
    title: '投稿箱',
  },
  {
    path: 'publication',
    icon: 'search',
    title: '信息浏览',
  },
  {
    path: 'gather',
    icon: 'folder',
    title: '信息采集',
    children: [
      {
        path: 'pick',
        icon: 'check-circle-o',
        title: '挑选稿件'
      },
      {
        path: 'sort',
        icon: 'check-circle-o',
        title: '排序选中稿件'
      },
      {
        path: 'edit',
        icon: 'edit',
        title: '信息编辑'
      },
    ]
  },
  {
    path: 'grademanage',
    icon: 'folder',
    title: '评分管理',
    children: [
      {
        path: 'grade',
        icon: 'check-circle-o',
        title: '稿件打分'
      },
      {
        path: 'gradetarget',
        icon: 'book',
        title: '评分指标',
      },
      {
        path: 'gradebase',
        icon: 'unlock',
        title: '评分标准',
      },
    ]
  },
  {
    path: 'statistic',
    icon: 'flag',
    title: '评分统计',
  },
];

let siderProps={width:200}
const Layout = (props) => {
  return (
    <ModuleLayout trigger siderTitle='政务信息' siderIcon='book' menu={menuItems} {...props} siderProps={siderProps}/>
  )
}

export default Layout;
