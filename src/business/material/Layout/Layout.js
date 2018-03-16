import React from 'react';
import { connect } from 'dva';
import { ModuleLayout } from 'components';

const menuItems = [
  {
    path: 'consumable',
    icon: 'folder',
    title: 'IT耗材需求计划',
    //expanded: true,
    children: [
      {
        path: 'company',
        icon: 'calendar',
        title: '公司需求计划'
      },
      {
        path: 'alldepartment',
        icon: 'schedule',
        title: '所有部门需求计划'
      },
      {
        path: 'department',
        icon: 'schedule',
        title: '本部门需求计划'
      },
      {
        path: 'units',
        icon: 'schedule',
        title: '二级单位需求计划'
      },
      {
        path: 'materialsearch',
        icon: 'search',
        title: '耗材查询'
      },
      {
        path: 'materialsetting',
        icon: 'setting',
        title: '选项配置',
        expanded: true,
        children: [
          {
            path: 'materialcategory',
            icon: 'bulb',
            title: '耗材分类信息',
          },
          {
            path: 'materialcatalogue',
            icon: 'bulb',
            title: '耗材目录',
          },
          {
            path: 'materialimport',
            icon: 'export',
            title: '导入耗材目录',
          },
          {
            path: 'supplier',
            icon: 'smile-o',
            title: '供应商',
          }
        ]
      },
    ]
  },
  {
    path: 'officeequipment',
    icon: 'folder',
    title: 'IT办公设备需求计划',
    children: [
      {
        path: 'company',
        icon: 'calendar',
        title: '公司需求计划'
      },
      {
        path: 'alldepartment',
        icon: 'schedule',
        title: '所有部门需求计划'
      },
      {
        path: 'department',
        icon: 'schedule',
        title: '部门需求计划'
      },
      {
        path: 'materialmanagement',
        icon: 'setting',
        title: '配置管理',
        expanded: true,
        children: [
          {
            path: 'catalogue',
            icon: 'bulb',
            title: 'IT办公设备目录 ',
          }, {
            path: 'equipmentimport',
            icon: 'export',
            title: '导入IT设备目录  ',
          }
        ]
      },
    ]
  },
  {
    path: 'uninstallequipment',
    icon: 'folder',
    title: '非安设备需求计划',
    children: [
      {
        path: 'company',
        icon: 'calendar',
        title: '公司需求计划'
      },
      {
        path: 'alldepartment',
        icon: 'schedule',
        title: '所有部门需求计划'
      },
      {
        path: 'units',
        icon: 'schedule',
        title: '二级单位需求计划'
      },
      {
        path: 'department',
        icon: 'schedule',
        title: '部门需求计划'
      },
      {
        path: 'materialsetting',
        icon: 'setting',
        title: '选项配置',
        expanded: true,
        children: [
          {
            path: 'category',
            icon: 'bulb',
            title: '设备分类信息  ',
          }, {
            path: 'equipmentinformation',
            icon: 'bulb',
            title: '设备基本信息   ',
          }, {
            path: 'equipmentimport',
            icon: 'export',
            title: '导入非安设备信息    ',
          }
        ]
      },
    ]
  },
  {
    path: 'itproduceequipment',
    icon: 'folder',
    title: 'IT生产设备需求计划',
    children: [
      {
        path: 'units',
        icon: 'schedule',
        title: '二级单位需求计划'
      },
      {
        path: 'materialsetting',
        icon: 'setting',
        title: '选项配置',
        expanded: true,
        children: [
          {
            path: 'category',
            icon: 'bulb',
            title: '商品分类表   ',
          }, {
            path: 'equipmentinformation',
            icon: 'bulb',
            title: 'IT生产设备基本信息   ',
          }, {
            path: 'equipmentimport',
            icon: 'export',
            title: '导入IT生产设备信息     ',
          }
        ]
      },
    ]
  },
  {
    path: 'engineermaterial',
    icon: 'folder',
    title: '工程物资需求计划',
    children: [
      {
        path: 'company',
        icon: 'calendar',
        title: '公司需求计划'
      },
      {
        path: 'alldepartment',
        icon: 'schedule',
        title: '所有部门需求计划'
      },
      {
        path: 'department',
        icon: 'schedule',
        title: '部门需求计划'
      },
      {
        path: 'materialsetting',
        icon: 'setting',
        title: '选项配置',
        expanded: true,
        children: [
          {
            path: 'engineermaterialcategory',
            icon: 'bulb',
            title: '工程物资分类信息   ',
          }, {
            path: 'engineermaterialinformation',
            icon: 'bulb',
            title: '工程物资基本信息    ',
          }, {
            path: 'engineermaterialimport',
            icon: 'export',
            title: '导入工程物资信息     ',
          }
        ]
      },
    ]
  },
  {
    path: 'officesupplies',
    icon: 'folder',
    title: '办公用品需求计划',
    children: [
      {
        path: 'company',
        icon: 'calendar',
        title: '公司需求计划'
      },
      {
        path: 'alldepartment',
        icon: 'schedule',
        title: '所有部门需求计划'
      },
      {
        path: 'units',
        icon: 'schedule',
        title: '二级单位需求计划'
      },
      {
        path: 'department',
        icon: 'schedule',
        title: '部门需求计划'
      },
      {
        path: 'materialsetting',
        icon: 'setting',
        title: '选项配置',
        expanded: true,
        children: [
          {
            path: 'officesuppliescategory',
            icon: 'bulb',
            title: '用品分类信息',
          }, {
            path: 'officesuppliesCatalogue',
            icon: 'bulb',
            title: '办公用品目录',
          }, {
            path: 'officesuppliesimport',
            icon: 'export',
            title: '导入办公用品目录',
          }, {
            path: 'supplier',
            icon: 'smile-o',
            title: '供应商',
          }
        ]
      },
    ]
  },
  {
    path: 'other',
    icon: 'folder',
    title: '其他需求计划',
    children: [
      {
        path: 'laboursupplies',
        icon: 'folder',
        title: '劳保用品需求计划',
        children: [
          {
            path: 'company',
            icon: 'calendar',
            title: '公司需求计划'
          },
          {
            path: 'alldepartment',
            icon: 'schedule',
            title: '所有部门需求计划'
          },
          {
            path: 'units',
            icon: 'schedule',
            title: '二级单位需求计划'
          },
          {
            path: 'department',
            icon: 'schedule',
            title: '部门需求计划'
          },
          {
            path: 'materialsetting',
            icon: 'setting',
            title: '选项配置',
            expanded: true,
            children: [
              {
                path: 'laboursuppliescategory',
                icon: 'bulb',
                title: '劳保用品分类信息',
              }, {
                path: 'laboursuppliesCatalogue',
                icon: 'bulb',
                title: '劳保用品目录',
              }, {
                path: 'laboursuppliesimport',
                icon: 'export',
                title: '导入劳保用品目录',
              }, {
                path: 'supplier',
                icon: 'smile-o',
                title: '供应商',
              }
            ]
          },
        ]
      },
      {
        path: 'tyre',
        icon: 'folder',
        title: '轮胎需求计划',
        children: [
          {
            path: 'company',
            icon: 'calendar',
            title: '公司需求计划'
          },
          {
            path: 'alldepartment',
            icon: 'schedule',
            title: '所有部门需求计划'
          },
          {
            path: 'units',
            icon: 'schedule',
            title: '二级单位需求计划'
          },
          {
            path: 'department',
            icon: 'schedule',
            title: '部门需求计划'
          },
          {
            path: 'materialsetting',
            icon: 'setting',
            title: '选项配置',
            expanded: true,
            children: [
              {
                path: 'tyrecategory',
                icon: 'bulb',
                title: '轮胎分类信息',
              }, {
                path: 'tyreCatalogue',
                icon: 'bulb',
                title: '轮胎目录',
              }, {
                path: 'tyreimport',
                icon: 'export',
                title: '导入轮胎目录',
              }, {
                path: 'supplier',
                icon: 'smile-o',
                title: '供应商',
              }
            ]
          },
        ]
      },
      {
        path: 'soft',
        icon: 'folder',
        title: '软件需求计划',
        children: [
          {
            path: 'company',
            icon: 'calendar',
            title: '公司需求计划'
          },
          {
            path: 'alldepartment',
            icon: 'schedule',
            title: '所有部门需求计划'
          },
          {
            path: 'units',
            icon: 'schedule',
            title: '二级单位需求计划'
          },
          {
            path: 'department',
            icon: 'schedule',
            title: '部门需求计划'
          },
          {
            path: 'materialsetting',
            icon: 'setting',
            title: '选项配置',
            expanded: true,
            children: [
              {
                path: 'softcategory',
                icon: 'bulb',
                title: '软件分类信息',
              }, {
                path: 'softCatalogue',
                icon: 'bulb',
                title: '软件目录',
              }, {
                path: 'softimport',
                icon: 'export',
                title: '导入软件',
              }, {
                path: 'supplier',
                icon: 'smile-o',
                title: '供应商',
              }
            ]
          },
        ]
      },
      {
        path: 'laboratorysupplies',
        icon: 'folder',
        title: '实验室用品需求计划',
        children: [
          {
            path: 'company',
            icon: 'calendar',
            title: '公司需求计划'
          },
          {
            path: 'alldepartment',
            icon: 'schedule',
            title: '所有部门需求计划'
          },
          {
            path: 'units',
            icon: 'schedule',
            title: '二级单位需求计划'
          },
          {
            path: 'department',
            icon: 'schedule',
            title: '部门需求计划'
          },
          {
            path: 'materialsetting',
            icon: 'setting',
            title: '选项配置',
            expanded: true,
            children: [
              {
                path: 'laboratorysuppliescategory',
                icon: 'bulb',
                title: '实验室用品分类信息',
              }, {
                path: 'laboratorysuppliesCatalogue',
                icon: 'bulb',
                title: '实验室用品目录',
              }, {
                path: 'laboratorysuppliesimport',
                icon: 'export',
                title: '导入实验室用品',
              }, {
                path: 'supplier',
                icon: 'smile-o',
                title: '供应商',
              }
            ]
          },
        ]
      },
    ]
  },
  {
    path: 'purchase',
    icon: 'folder',
    title: '物资采购计划',
    children: [
      {
        path: 'itmaterial',
        icon: 'printer',
        title: 'IT耗材',
      },
      {
        path: 'unitsmaterial',
        icon: 'printer',
        title: '二级单位IT耗材',
      },
      {
        path: 'itofficeequipment',
        icon: 'desktop',
        title: 'IT办公设备',
      },
      {
        path: 'untilitofficeequipment',
        icon: 'edit',
        title: '二级单位IT生产设备',
      },
      {
        path: 'officesupplies',
        icon: 'edit',
        title: '办公用品',
      },
      {
        path: 'untilofficesupplies',
        icon: 'edit',
        title: '二级单位办公用品',
      },
      {
        path: 'laboursupplies',
        icon: 'edit',
        title: '劳保用品',
      },
      {
        path: 'untillaboursupplies',
        icon: 'edit',
        title: '二级单位劳保用品',
      },
      {
        path: 'engineermaterial',
        icon: 'folder',
        title: '工程物资',
        children: [
          {
            path: 'hasnotpurchase',
            icon: 'file-text',
            title: '未纳入采购的需求计划',
          },
          {
            path: 'haspurchase',
            icon: 'file-text',
            title: ' 已纳入采购的需求计划',
          },
          {
            path: 'engineermaterial',
            icon: 'file-text',
            title: '工程物资采购计划',
          }
        ]
      },
      {
        path: 'uninstallequipment',
        icon: 'check',
        title: '非安设备',
      },
      {
        path: 'unitsuninstallequipment',
        icon: 'check',
        title: '二级单位非安设备',
      },
      {
        path: 'tyre',
        icon: 'check',
        title: '轮胎',
      },
      {
        path: 'unitstyre',
        icon: 'check',
        title: '二级单位轮胎',
      },
      {
        path: 'soft',
        icon: 'check',
        title: '软件',
      },
      {
        path: 'unitssoft',
        icon: 'check',
        title: '二级单位软件',
      },
      {
        path: 'laboratorysupplies',
        icon: 'check',
        title: '实验室用品',
      },
      {
        path: 'unitslaboratorysupplies',
        icon: 'check',
        title: '二级单位实验室用品',
      },
      {
        path: 'materialsetting',
        icon: 'folder',
        title: '选项配置',
        children: [
          {
            path: 'supplier',
            icon: 'smile-o',
            title: '供应商 ',
          }
        ]
      },
    ]
  },
  {
    path: 'draw',
    icon: 'folder',
    title: '物资领用',
    children: [
      {
        path: 'laboursupplies',
        icon: 'folder',
        title: '劳保用品',
        children: [
          {
            path: 'all',
            icon: 'file-text',
            title: '所有部门',
          },
          {
            path: 'department',
            icon: 'file-text',
            title: '本部门',
          },
          {
          path:'inventory',
          icon: 'file-text',
          title: '库存',
          }
        ],
      }
    ]
  },
  {
    path: 'stopproductionmaterial',
    icon: 'file-text',
    title: '停产物资',
  },
  {
    path: 'statistic',
    icon: 'flag',
    title: '统计',
  },
  {
    path: 'statisticdraw',
    icon: 'flag',
    title: '物资领用统计',
  }
];

let siderProps={width:220}
const Layout = (props) => {
  return (
    <ModuleLayout trigger siderTitle='物资' siderIcon='book' menu={menuItems} {...props} siderProps={siderProps}/>
  )
}

export default Layout;
