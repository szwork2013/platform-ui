import React from 'react';
import { DatePicker, Input } from 'antd';

import {
  View,
  DropdownSelect,
  ExportButton
} from 'components';

import service from 'service';
import wfservice from 'wfservice';
import { config } from 'utils';
const { api } = config; //取得RESTful api配置信息

import MaterialSelect from '../MaterialSelect'

import modelDefinition from './model';
import materialService from '../../server';

//取得模型名称
const modelName = modelDefinition.namespace;

//权限定义表单
class PlanItems extends React.Component {

  componentDidMount() {

  }

  render() {
    const { record, planType, canEdit, mode, isEngineerSpec, plan_item } = this.props;
    let uid = service.getRecordId(record) + '' + planType + record.type;
    //采购物资发放uid加上物资发放信息
    if (planType == 4) {
      uid = uid + 'wzff';
    }
    //工程物资规格分组，uid加上规格分组信息
    if (isEngineerSpec) {
      uid = uid + 'ggfz';
    }

    //定义操作条属性
    let buttons = [];
    //公司属性不定义新增
    if (canEdit && mode != 'new') {
      if (planType == 1 || planType == 2) {
        buttons.push({ title: '新增', OnClick: () => this.newItem() });
      }
      //采购计划时，劳保用品可以直接采购
      if (planType == 3) {
        if (record.type == 'LABOUR_SUPPLIES' || record.type == 6) {
          //劳保用品没有需求计划的时候可以新增
          let plans = service.getRecordLinkAttr(record, 'demandPlans') || [];
          if (!plans || plans.length == 0) {
            buttons.push({ title: '新增', OnClick: () => this.newItem() });
          }
        }
      }
    }
    const actionBarProps = {
      searchBar: false,
      newRow: false,
      new: false, //显示新增按钮
      delete: planType < 3 && canEdit ? true : false, //显示删除按钮只有公司计划和单位计划
      saveTable: planType != 0 && canEdit ? true : false,
      beforeSaveType:planType==2?'beforeSaveTable':false,//当类型为部门计划时要验证预算。
      reloadTable: planType != 0 && canEdit ? true : false,
      buttons,
    }
    if (mode != 'new') {

      //工程物资发放
      if (planType == 4 && (record.type == 'IT_CONSUMABLE' || record.type == 0)) {
        let exportUrl1 = this.constructExcelExportUrl(uid, ' and o.material.name not like \'%硒鼓%\'');
        let exportUrl2 = this.constructExcelExportUrl(uid, ' and o.material.name like \'%硒鼓%\'');
        let viewData = plan_item.viewData.find((r) => r.dataKey == uid);
        let dataList = [];
        if (viewData)
          dataList = viewData.list;
        let supplierList = this.getSupplierList(dataList);
        actionBarProps.export = <div style={{ display: 'inline' }}>
          <a href={exportUrl1} style={{ marginLeft: 8 }} target='_blank'>导出(除硒鼓)excel</a>
          <a href={exportUrl2} style={{ marginLeft: 8 }} target='_blank'>导出(硒鼓)excel</a>
          {supplierList.map((item) => {
            let exportUrl = this.constructExcelExportUrl(uid, ' and o.material.supplier.name=\'' + item.name + '\'');
            return <a href={exportUrl} style={{ marginLeft: 8 }} target='_blank'>导出({item.shortName})excel</a>
          })}
        </div>;
      } else {
        let exportUrl = this.constructExcelExportUrl(uid, '');
        actionBarProps.export = <a href={exportUrl} style={{ marginLeft: 8 }} target='_blank'>导出excel</a>
      }
    }

    //定义搜索条件
    const searchParam = {
      filter: { //过滤规则
        clazz: 'PlanItem', //模型对应的后台实体类
        where: this.constructWhere(), //条件
      },
      size: 100, //指定每页记录数
      sort: 'o.id,asc', //缺省排序规则
    };

    //定义列表属性
    const listProps = {
      scrollx: 1600,
      columns: this.constructColumns(),
      rowSelection: canEdit && { type: 'checkbox' }, //选择功能配置
      footer: this.constructFooter,
      defaultExpandAllRows:true,
    };

    //公司计划和单位计划有分组信息
    this.setGroupInfo(listProps);

    //显示UI
    return (
      <View key={'plantItem' + 'ViewLayout' + uid} {...this.props}
        //editMode={canEdit && planType != 0 ? 'row' : false} //编辑模式：单行编辑
        editMode={'row'} //编辑模式：单行编辑
        searchParam={searchParam}
        //heightOffset={-60}
        modelName={modelName} //模型名称
        actionBar={actionBarProps} //操作条定义
        list={listProps} //列表定义
        uid={uid}
        paginationBar={false}
      />
    )
  }

  //获取数据中的供应商
  getSupplierList = (list) => {
    let returnList = [];
    if (!list) return returnList;
    list.map((item) => {
      let oldItem = returnList.find(r => r.name == item.materialSupplier.name);
      if (!oldItem) {
        returnList.push({ name: item.materialSupplier.name, shortName: item.materialSupplier.name.substring(0, 8) })
      }
    })
    return returnList;
  }

  constructExcelExportUrl = (dataKey, extraWhere) => {
    const { plan_item, isEngineerSpec, record, type, planType } = this.props;
    let viewData = plan_item.viewData.find((r) => r.dataKey == dataKey);
    if (!viewData) return;
    const searchParam = {
      filter: { //过滤规则
        clazz: 'PlanItem', //模型对应的后台实体类
        where: this.constructWhere() + extraWhere, //条件
      },
      jpql: viewData.listJpql,
      linkAttrs: [],
      projection: 'listExport',
      size: 100, //指定每页记录数
      sort: 'o.id,asc', //缺省排序规则
    };
    //2 构造请求页的连接和参数
    let param = service.constructQueryPageParam({
      namespace: modelName,
      params: searchParam,
      where: searchParam.filter.where,
    });
    //3 构造完整的url
    let { url, requestParam } = param;
    const { rootPath } = api; //RESTful请求的根路径
    url += '?jpql=' + requestParam.jpql + '&clazz=' + requestParam.clazz
      + '&projection=' + searchParam.projection + '&size=' + searchParam.size
      + '&sort=o.id,asc';

    url = service.appendTokenInfoToUrl(url);
    let dataSource = encodeURIComponent(url);

    let templateNo = 'GSXQJH';
    //工程物资的情况
    if (type == 'ENGINEERING_MATERIALS' || type == 4) {
      templateNo = 'GSXQJHGCWZ';
      if(isEngineerSpec){
        templateNo = 'BMXQJHGCWZ';
      }
    }

    //部门计划或者单位计划
    if (planType == 1 || planType == 2) {
      //无使用人
      templateNo = 'BMDWXQJHWSYR';
      //IT耗材
      if (type == 'IT_CONSUMABLE' || type == 0) {
        //有使用人
        templateNo = 'BMDWXQJH';
      }
      //IT办公设备
      if (type == 'OFFICE_EQUIPMENT' || type == 1) {
        //有使用人
        templateNo = 'BMDWXQJH';
      }
      //非安装设备
      if (type == 'NON_INSTALLATION_EQUIPMENT' || type == 2) {
        if (planType == 2) {
          //有使用人
          templateNo = 'BMDWXQJH';
        }
      }
      //工程物资的情况
      if (type == 'ENGINEERING_MATERIALS' || type == 4) {
        templateNo = 'BMXQJHGCWZ';
      }
    }


    //采购
    if (planType == 3) {
      templateNo = 'CGJH';
      //工程物资的情况
      if (type == 'ENGINEERING_MATERIALS' || type == 4) {
        templateNo = 'CGJHGCWZ';
      }
    }

    //物资发放
    if (planType == 4) {
      templateNo = 'WZFF';
    }

    url = rootPath.replace('api', '') + 'template_excel/service/catalog?datasource='
      + dataSource + '&templateNo=' + templateNo + '&userId=' + service.userInfo.user.id + '&returnFile=true'
    return url;
  }

  constructColumns = () => {
    const { planType, canEdit, record, type } = this.props;

    //采购计划物资发放
    if (planType == 4) {
      let columns = [ // 和antd table组件的列定义相同
        { title: '名称', width: 150, dataIndex: 'materialData.name', key: 'materialData.name' },
        { title: '规格', width: 250, dataIndex: 'materialData.specification', key: 'materialData.specification' },
        { title: '单位', width: 80, dataIndex: 'materialData.measurementUnit', key: 'materialData.measurementUnit' },
        {
          title: '实际单价(元)', width: 145, dataIndex: 'purchasePrice', key: 'purchasePrice',
          textRender: (value, record) => !record._isGroup &&record.materialData&& Number(value/ (1 + record.materialData.taxRate)).toFixed(2)
        },
        { title: '需求数量', width: 100, dataIndex: 'demandQuantity', key: 'demandQuantity' },
        {
          title: '总价(除税)(元)', width: 145, dataIndex: 'demandTotal', key: 'demandTotal',
          textRender: (value, record) => {
            if (record._isGroup) return '';
            let totalAmount=0;
            if(record.materialData)
              totalAmount = record.materialData.priceWithTax * record.demandQuantity/ (1 + record.materialData.taxRate);
            return totalAmount.toFixed(2);
          }
        },
        { title: '备注', width: 145, dataIndex: 'remarkx', key: 'remark' },
      ];
      return columns;
    }
    //工程物资的情况
    if (type == 'ENGINEERING_MATERIALS' || type == 4) {
      return this.constructColumnsForEngineer();
    }
    //IT办公设备需求计划
    if (type == 'OFFICE_EQUIPMENT' || type == 1) {
      return this.constructColumnsForOfficeEquipment();
    }
    //办公用品需求计划和劳保用品
    if (type == 'OFFICE_SUPPLIES' || type == 5 || type == 'LABOUR_SUPPLIES' || type == 6) {
      return this.constructColumnsForOfficeSupplies();
    }
    //非安装设备和生产设备
    if (type == 'NON_INSTALLATION_EQUIPMENT' || type == 2 || type == 'PRODUCTION_EQUIPMENT' || type == 3) {
      return this.constructColumnsForUninstalled();
    }

    const user = service.userInfo.user;
    //定义选人下拉框的查询参数
    const selectProps = {
      type: 'list',
      labelKey: 'name',
      modelName: 'users',
      searchParam: {
        filter: { //过滤规则
          clazz: 'SysUser', //模型对应的后台实体类
          where: 'o.org.id=' + user.org.id, //条件
        },
        size: 100, //指定每页记录数
        sort: 'o.id,asc', //缺省排序规则
      },
      onSelect: (value, option, record) => {
        record.userName = option.props.dataRef.name;
      }
    };

    //定义列表属性
    let columns = [ // 和antd table组件的列定义相同
      { title: '名称', width: 150, dataIndex: 'materialData.name', key: 'materialData.name' },
      { title: '规格型号', dataIndex: 'materialData.specification', key: 'materialData.specification' },
      {
        title: '数量', width: 65, dataIndex: 'demandQuantity', key: 'demandQuantity',
        editor: canEdit && <Input placeholder='请填写数字值' />
      },
      { title: '单位', width: 65, dataIndex: 'materialData.measurementUnit', key: 'materialData.measurementUnit' },
      {
        title: '单价（元）', width: 125, dataIndex: 'materialData.priceWithTax', key: 'materialData.priceWithTax',
        textRender: (value, record) => !record._isGroup && record.materialData&&Number(value/ (1 + record.materialData.taxRate)).toFixed(2)
      },
      {
        title: '总价(元)', width: 125, dataIndex: 'demandTotal', key: 'demandTotal',
        textRender: (value, record) => {
          if (record._isGroup) return '';
          let totalAmount=0;
          if(record.materialData)
            totalAmount = record.materialData.priceWithTax * record.demandQuantity/ (1 + record.materialData.taxRate);
          return totalAmount.toFixed(2);
        }
      },
      {
        title: '使用人', width: 125, dataIndex: 'user', key: 'user', type: 'select',
        textRender: (value, record) => {
          if (record.userId && !record.user) {
            let href = service.constructRecordUrl({ modelName: 'users', id: record.userId });
            record.user = href ? href : '';
          }
          return record.userName || '***';
        },
        editor: canEdit && <DropdownSelect {...selectProps} />
      },
      {
        title: '备注', width: 145, dataIndex: 'remarkx', key: 'remark',
        editor: canEdit && <Input />
      },
    ];
    //采购计划
    if (planType == 3) {
      columns = [ // 和antd table组件的列定义相同
        { title: '物资名称', width: 150, dataIndex: 'materialData.name', key: 'materialData.name' },
        { title: '规格型号', width: 250, dataIndex: 'materialData.specification', key: 'materialData.specification' },
        { title: '单位', width: 80, dataIndex: 'materialData.measurementUnit', key: 'materialData.measurementUnit' },
        {
          title: '单价(含税)(元)', width: 135, dataIndex: 'materialData.priceWithTax',
          key: 'materialData.priceWithTax', textRender: (value, record) => !record._isGroup && Number(value).toFixed(2)
        },
        { title: '需求数量', width: 90, dataIndex: 'demandQuantity', key: 'demandQuantity' },
        { title: '物资编码', width: 100, dataIndex: 'materialData.code', key: 'materialData.code' },
        {
          title: '采购单价', width: 90, dataIndex: 'purchasePrice', key: 'purchasePrice',
          editor: canEdit && <Input />, textRender: (value, record) => !record._isGroup && Number(value).toFixed(2)
        },
        { title: '采购数量', width: 90, dataIndex: 'purchaseQuantity', key: 'purchaseQuantity', editor: canEdit && <Input /> },
        {
          title: '需求总价(含税)(元)', width: 145, dataIndex: 'demandTotal', key: 'demandTotal',
          textRender: (value, record) => {
            if (record._isGroup) return '';
            let totalAmount=0;
            if(record.materialData)
              totalAmount = record.materialData.priceWithTax * record.demandQuantity;
            return totalAmount.toFixed(2);
          }
        },
        {
          title: '采购总价(元)', width: 145, dataIndex: 'purchaseAmount', key: 'purchaseAmount',
          textRender: (value, record) => {
            if (record._isGroup) return '';
            let totalAmount = record.purchasePrice * record.purchaseQuantity;
            return totalAmount.toFixed(2);
          }
        },
      ];
    }

    return columns;
  }

  //工程物资列构造
  constructColumnsForEngineer = () => {
    const { planType, canEdit, isEngineerSpec } = this.props;
    //定义列表属性
    let columns = [ // 和antd table组件的列定义相同
      { title: '类型名称', width: 150, dataIndex: 'materialData.name', key: 'materialData.name' },
      { title: '规格型号', width: 250, dataIndex: 'materialData.specification', key: 'materialData.specification' },
      {
        title: '数量(m)', width: 90, dataIndex: 'demandQuantity', key: 'demandQuantity',
        editor: canEdit && <Input placeholder='请填写数字值' />
      },
      {
        title: '单重(t/m)', width: 110, dataIndex: 'materialData.convertRule', key: 'materialData.convertRule'
      },
      {
        title: '总重(t)', width: 100, dataIndex: 'weight', key: 'weight',
        textRender: (value, record) => {
          if (record._isGroup) return '';
          let totalAmount = record.materialData.convertRule * record.demandQuantity;
          return totalAmount.toFixed(5);
        }
      },
      {
        title: '单价(除税)(元/t)', width: 125, dataIndex: 'materialData.priceWithTax', key: 'materialData.priceWithTax',
        textRender: (value, record) => !record._isGroup && record.materialData&&Number(value/ (1 + record.materialData.taxRate)).toFixed(2),
      },

      {
        title: '总价(除税)(元)', width: 125, dataIndex: 'demandTotal', key: 'demandTotal',
        textRender: (value, record) => {
          if (record._isGroup) return '';
          let totalAmount=0;
          if(record.materialData)
            totalAmount = record.materialData.priceWithTax * record.materialData.convertRule * record.demandQuantity/ (1 + record.materialData.taxRate);
          return totalAmount.toFixed(2);
        }
      },
      {
        title: '交货日期', width: 100, dataIndex: 'deliveryDate', key: 'deliveryDate',
        type: 'date', textRender: (value) => value && value.substring(0, 10),
        editor: canEdit && <DatePicker />
      },
      {
        title: '交货地点', width: 100, dataIndex: 'deliveryPoint', key: 'deliveryPoint',
        editor: canEdit && <Input />
      },
      {
        title: '备注',width: 250,dataIndex: 'remarkx', key: 'remark',
        editor: canEdit && <Input />
      },
    ];

    //采购计划
    if (planType == 3) {
      columns = [ // 和antd table组件的列定义相同
        { title: '物资名称', width: 160, dataIndex: 'materialData.name', key: 'materialData.name' },
        { title: '规格型号', width: 160, dataIndex: 'materialData.specification', key: 'materialData.specification' },
        { title: '供应商', width: 160, dataIndex: 'materialSupplier.name', key: 'materialSupplier.name' },
        {
          title: '总重(t)', width: 90, dataIndex: 'weight', key: 'weight',
          textRender: (value, record) => {
            if (record._isGroup) return '';
            let totalAmount = record.materialData.convertRule * record.demandQuantity;
            return totalAmount.toFixed(5);
          }
        },
        {
          title: '单价(含税)(元/t)', width: 135, dataIndex: 'materialData.priceWithTax',
          key: 'materialData.priceWithTax', textRender: (value, record) => !record._isGroup && Number(value).toFixed(2)
        },
        { title: '数量(m)', width: 90, dataIndex: 'demandQuantity', key: 'demandQuantity' },
        {
          title: '采购总重(t)', width: 90, dataIndex: 'purchaseWeight', key: 'purchaseWeight',
          textRender: (value, record) => {
            if (record._isGroup) return '';
            let totalAmount = record.materialData.convertRule * record.purchaseQuantity;
            return totalAmount.toFixed(5);
          }
        },
        {
          title: '采购单价', width: 90, dataIndex: 'purchasePrice', key: 'purchasePrice',
          editor: canEdit && <Input />, textRender: (value, record) => !record._isGroup && Number(value).toFixed(2)
        },
        { title: '采购数量', width: 90, dataIndex: 'purchaseQuantity', key: 'purchaseQuantity', editor: canEdit && <Input /> },
        {
          title: '需求总价(含税)(元)', width: 145, dataIndex: 'demandTotal', key: 'demandTotal',
          textRender: (value, record) => {
            if (record._isGroup) return '';
            let totalAmount=0;
            if(record.materialData)
              totalAmount = record.materialData.priceWithTax * record.demandQuantity* record.materialData.convertRule;
            return totalAmount.toFixed(2);
          }
        },
        {
          title: '采购总价(元)', width: 145, dataIndex: 'purchaseAmount', key: 'purchaseAmount',
          textRender: (value, record) => {
            if (record._isGroup) return '';
            let totalAmount=0;
            if(record.materialData)
             totalAmount = record.purchasePrice * record.purchaseQuantity * record.materialData.convertRule;
            return totalAmount.toFixed(2);
          }
        },
        {
          title: '备注',width: 250, dataIndex: 'remarkx', key: 'remark',
          editor: canEdit && <Input />
        },
      ];
    }
    return columns;
  }

  //办公设备列构造
  constructColumnsForOfficeEquipment = () => {
    const { planType, canEdit, isEngineerSpec } = this.props;
    const user = service.userInfo.user;
    //定义选人下拉框的查询参数
    const selectProps = {
      type: 'list',
      labelKey: 'name',
      modelName: 'users',
      searchParam: {
        filter: { //过滤规则
          clazz: 'SysUser', //模型对应的后台实体类
          where: 'o.org.id=' + user.org.id, //条件
        },
        size: 100, //指定每页记录数
        sort: 'o.id,asc', //缺省排序规则
      },
      onSelect: (value, option, record) => {
        record.userName = option.props.dataRef.name;
      }
    };
    //定义列表属性
    let columns = [ // 和antd table组件的列定义相同
      { title: '类型名称', width: 295, dataIndex: 'materialData.name', key: 'materialData.name' },
      { title: '规格型号', width: 295, dataIndex: 'materialData.specification', key: 'materialData.specification' },
      {
        title: '数量', width: 175, dataIndex: 'demandQuantity', key: 'demandQuantity',
        editor: canEdit && <Input placeholder='请填写数字值' />
      },
      {
        title: '单价（元）', width: 175, dataIndex: 'materialData.priceWithTax', key: 'materialData.priceWithTax',
        textRender: (value, record) => !record._isGroup && record.materialData&&Number(value/ (1 + record.materialData.taxRate)).toFixed(2)
      },
      {
        title: '总价(元)', width: 125, dataIndex: 'demandTotal', key: 'demandTotal',
        textRender: (value, record) => {
          if (record._isGroup) return '';
          let totalAmount=0;
          if(record.materialData)
            totalAmount = record.materialData.priceWithTax * record.demandQuantity/ (1 + record.materialData.taxRate);
          return totalAmount.toFixed(2);
        }
      },
      {
        title: '使用人', width: 175, dataIndex: 'user', key: 'user', type: 'select',
        textRender: (value, record) => {
          if (record.userId && !record.user) {
            let href = service.constructRecordUrl({ modelName: 'users', id: record.userId });
            record.user = href ? href : '';
          }
          return record.userName || '***';
        },
        editor: canEdit && <DropdownSelect {...selectProps} />
      },
      {
        title: '备注', width: 175, dataIndex: 'remarkx', key: 'remark',
        editor: canEdit && <Input />
      },
    ];
    //部门计划
    if (planType == 2) {
      columns = [ // 和antd table组件的列定义相同
        { title: '名称', width: 150, dataIndex: 'materialData.name', key: 'materialData.name' },
        { title: '规格型号', dataIndex: 'materialData.specification', key: 'materialData.specification' },
        {
          title: '数量', width: 65, dataIndex: 'demandQuantity', key: 'demandQuantity',
          editor: canEdit && <Input placeholder='请填写数字值' />
        },
        { title: '单位', width: 65, dataIndex: 'materialData.measurementUnit', key: 'materialData.measurementUnit' },
        {
          title: '单价（元）', width: 125, dataIndex: 'materialData.priceWithTax', key: 'materialData.priceWithTax',
          textRender: (value, record) => !record._isGroup && record.materialData&&Number(value/ (1 + record.materialData.taxRate)).toFixed(2)
        },
        {
          title: '总价(元)', width: 125, dataIndex: 'demandTotal', key: 'demandTotal',
          textRender: (value, record) => {
            if (record._isGroup) return '';
            let totalAmount=0;
            if(record.materialData)
              totalAmount = record.materialData.priceWithTax * record.demandQuantity/ (1 + record.materialData.taxRate);
            return totalAmount.toFixed(2);
          }
        },
        {
          title: '使用人', width: 125, dataIndex: 'user', key: 'user', type: 'select',
          textRender: (value, record) => {
            if (record.userId && !record.user) {
              let href = service.constructRecordUrl({ modelName: 'users', id: record.userId });
              record.user = href ? href : '';
            }
            return record.userName || '***';
          },
          editor: canEdit && <DropdownSelect {...selectProps} />
        },
        {
          title: '备注', width: 145, dataIndex: 'remarkx', key: 'remark',
          editor: canEdit && <Input />
        },
      ];
    }
    //采购计划
    if (planType == 3) {
      columns = [ // 和antd table组件的列定义相同
        { title: '类型名称', width: 160, dataIndex: 'materialData.name', key: 'materialData.name' },
        { title: '规格型号', width: 160, dataIndex: 'materialData.specification', key: 'materialData.specification' },
        { title: '供应商', width: 160, dataIndex: 'materialSupplier.name', key: 'materialSupplier.name' },
        {
          title: '单价(含税)(元)', width: 135, dataIndex: 'materialData.priceWithTax',
          key: 'materialData.priceWithTax', textRender: (value, record) => !record._isGroup && Number(value).toFixed(2)
        },
        { title: '需求数量', width: 100, dataIndex: 'demandQuantity', key: 'demandQuantity' },
        {
          title: '采购单价', width: 100, dataIndex: 'purchasePrice', key: 'purchasePrice',
          editor: canEdit && <Input />, textRender: (value, record) => !record._isGroup && Number(value).toFixed(2)
        },
        { title: '采购数量', width: 100, dataIndex: 'purchaseQuantity', key: 'purchaseQuantity', editor: canEdit && <Input /> },
        {
          title: '总价(含税)(元)', width: 145, dataIndex: 'demandTotal', key: 'demandTotal',
          textRender: (value, record) => {
            if (record._isGroup) return '';
            let totalAmount=0;
            if(record.materialData)
              totalAmount = record.materialData.priceWithTax * record.demandQuantity;
            return totalAmount.toFixed(2);
          }
        },
        {
          title: '采购总价(元)', width: 145, dataIndex: 'purchaseAmount', key: 'purchaseAmount',
          textRender: (value, record) => {
            if (record._isGroup) return '';
            let totalAmount = record.purchasePrice * record.purchaseQuantity;
            return totalAmount.toFixed(2);
          }
        }
      ];
    }
    return columns;
  }

  //办公用品列构造
  constructColumnsForOfficeSupplies = () => {
    const { planType, canEdit, isEngineerSpec } = this.props;
    const user = service.userInfo.user;
    //定义列表属性
    let columns = [ // 和antd table组件的列定义相同
      { title: '类型名称', width: 330, dataIndex: 'materialData.name', key: 'materialData.name' },
      { title: '规格型号', width: 330, dataIndex: 'materialData.specification', key: 'materialData.specification' },
      {
        title: '需求数量', width: 200, dataIndex: 'demandQuantity', key: 'demandQuantity',
        editor: canEdit && <Input placeholder='请填写数字值' />
      },
      {
        title: '单价（元）', width: 200, dataIndex: 'materialData.priceWithTax', key: 'materialData.priceWithTax',
        textRender: (value, record) => !record._isGroup && record.materialData&&Number(value/ (1 + record.materialData.taxRate)).toFixed(2)
      },
      {
        title: '总价(元)', width: 145, dataIndex: 'demandTotal', key: 'demandTotal',
        textRender: (value, record) => {
          if (record._isGroup) return '';
          let totalAmount=0;
          if(record.materialData)
            totalAmount = record.materialData.priceWithTax * record.demandQuantity / (1 + record.materialData.taxRate);
          return totalAmount.toFixed(2);
        }
      },
      {
        title: '备注', width: 200, dataIndex: 'remarkx', key: 'remark',
        editor: canEdit && <Input />
      },
    ];
    //部门计划
    if (planType == 2) {
      columns = [ // 和antd table组件的列定义相同
        { title: '名称', width: 180, dataIndex: 'materialData.name', key: 'materialData.name' },
        { title: '规格型号', width: 615, dataIndex: 'materialData.specification', key: 'materialData.specification' },
        {
          title: '需求数量', width: 135, dataIndex: 'demandQuantity', key: 'demandQuantity',
          editor: canEdit && <Input placeholder='请填写数字值' />
        },
        { title: '单位', width: 70, dataIndex: 'materialData.measurementUnit', key: 'materialData.measurementUnit' },
        {
          title: '单价（元）', width: 135, dataIndex: 'materialData.priceWithTax', key: 'materialData.priceWithTax',
          textRender: (value, record) => !record._isGroup && record.materialData&&Number(value/ (1 + record.materialData.taxRate)).toFixed(2)
        },
        {
          title: '总价(元)', width: 145, dataIndex: 'demandTotal', key: 'demandTotal',
          textRender: (value, record) => {
            if (record._isGroup) return '';
            let totalAmount=0;
            if(record.materialData)
             totalAmount = record.materialData.priceWithTax * record.demandQuantity / (1 + record.materialData.taxRate);
            return totalAmount.toFixed(2);
          }
        },
        {
          title: '备注', width: 135, dataIndex: 'remarkx', key: 'remark',
          editor: canEdit && <Input />
        },
      ];
    }
    //采购计划
    if (planType == 3) {
      columns = [ // 和antd table组件的列定义相同
        { title: '类型名称', width: 140, dataIndex: 'materialData.name', key: 'materialData.name' },
        { title: '规格型号', width: 160, dataIndex: 'materialData.specification', key: 'materialData.specification' },
        { title: '供应商', width: 160, dataIndex: 'materialSupplier.name', key: 'materialSupplier.name' },
        { title: '单位', width: 65, dataIndex: 'materialData.measurementUnit', key: 'materialData.measurementUnit' },
        {
          title: '单价(含税)(元)', width: 135, dataIndex: 'materialData.priceWithTax',
          key: 'materialData.priceWithTax', textRender: (value, record) => !record._isGroup && Number(value).toFixed(2)
        },
        { title: '需求数量', width: 90, dataIndex: 'demandQuantity', key: 'demandQuantity' },
        { title: '物资编码', width: 90, dataIndex: 'code', key: 'code' },
        {
          title: '采购单价', width: 90, dataIndex: 'purchasePrice', key: 'purchasePrice',
          editor: canEdit && <Input />, textRender: (value, record) => !record._isGroup && Number(value).toFixed(2)
        },
        { title: '采购数量', width: 90, dataIndex: 'purchaseQuantity', key: 'purchaseQuantity', editor: canEdit && <Input /> },
        {
          title: '需求总价(含税)(元)', width: 145, dataIndex: 'demandTotal', key: 'demandTotal',
          textRender: (value, record) => {
            if (record._isGroup) return '';
            let totalAmount=0;
            if(record.materialData)
              totalAmount = record.materialData.priceWithTax * record.demandQuantity;
            return totalAmount.toFixed(2);
          }
        },
        {
          title: '采购总价(元)', width: 145, dataIndex: 'purchaseAmount', key: 'purchaseAmount',
          textRender: (value, record) => {
            if (record._isGroup) return '';
            let totalAmount = record.purchasePrice * record.purchaseQuantity;
            return totalAmount.toFixed(2);
          }
        }
      ];
    }
    return columns;
  }

  //非安装设备列构造
  constructColumnsForUninstalled = () => {
    const { planType, canEdit } = this.props;
    const user = service.userInfo.user;
    //定义选人下拉框的查询参数
    const selectProps = {
      type: 'list',
      labelKey: 'name',
      modelName: 'users',
      searchParam: {
        filter: { //过滤规则
          clazz: 'SysUser', //模型对应的后台实体类
          where: 'o.org.id=' + user.org.id, //条件
        },
        size: 100, //指定每页记录数
        sort: 'o.id,asc', //缺省排序规则
      },
      onSelect: (value, option, record) => {
        record.userName = option.props.dataRef.name;
      }
    };
    //定义列表属性
    let columns = [ // 和antd table组件的列定义相同
      { title: '名称', width: 160, dataIndex: 'materialData.name', key: 'materialData.name' },
      { title: '规格型号', width: 250, dataIndex: 'materialData.specification', key: 'materialData.specification' },
      {
        title: '需求数量', width: 125, dataIndex: 'demandQuantity', key: 'demandQuantity',
        editor: canEdit && <Input placeholder='请填写数字值' />
      },
      {
        title: '单价（元）', width: 125, dataIndex: 'materialData.priceWithTax', key: 'materialData.priceWithTax',
        textRender: (value, record) => !record._isGroup && record.materialData&&Number(value/ (1 + record.materialData.taxRate)).toFixed(2)
      },
      {
        title: '总价(元)', width: 125, dataIndex: 'demandTotal', key: 'demandTotal',
        textRender: (value, record) => {
          if (record._isGroup) return '';
          let totalAmount=0;
          if(record.materialData)
           totalAmount = record.materialData.priceWithTax * record.demandQuantity / (1 + record.materialData.taxRate);
          return totalAmount.toFixed(2);
        }
      },
      {
        title: '使用人', width: 135, dataIndex: 'user', key: 'user', type: 'select',
        textRender: (value, record) => {
          if (record.userId && !record.user) {
            let href = service.constructRecordUrl({ modelName: 'users', id: record.userId });
            record.user = href ? href : '';
          }
          return record.userName || '***';
        },
        editor: canEdit && <DropdownSelect {...selectProps} />
      },
      {
        title: '备注', width: 135, dataIndex: 'remarkx', key: 'remark',
        editor: canEdit && <Input />
      },
    ];

    //二级单位需求计划
    if (planType == 1) {
      columns = [ // 和antd table组件的列定义相同
        { title: '名称', width: 175, dataIndex: 'materialData.name', key: 'materialData.name' },
        { title: '规格型号', width: 608, dataIndex: 'materialData.specification', key: 'materialData.specification' },
        {
          title: '需求数量', width: 135, dataIndex: 'demandQuantity', key: 'demandQuantity',
          editor: canEdit && <Input placeholder='请填写数字值' />
        },
        { title: '单位', width: 70, dataIndex: 'materialData.measurementUnit', key: 'materialData.measurementUnit' },
        {
          title: '单价（元）', width: 135, dataIndex: 'materialData.priceWithTax', key: 'materialData.priceWithTax',
          textRender: (value, record) => !record._isGroup &&record.materialData&& Number(value/ (1 + record.materialData.taxRate)).toFixed(2)
        },
        {
          title: '总价(元)', width: 125, dataIndex: 'demandTotal', key: 'demandTotal',
          textRender: (value, record) => {
            if (record._isGroup) return '';
            let totalAmount=0;
            if(record.materialData)
              totalAmount = record.materialData.priceWithTax * record.demandQuantity/ (1 + record.materialData.taxRate);
            return totalAmount.toFixed(2);
          }
        },
        // {
        //   title: '使用人', width: 135, dataIndex: 'user', key: 'user', type: 'select',
        //   textRender: (value, record) => {
        //     if (record.userId && !record.user) {
        //       let href = service.constructRecordUrl({ modelName: 'users', id: record.userId });
        //       record.user = href ? href : '';
        //     }
        //     return record.userName || '***';
        //   },
        //   editor: canEdit && <DropdownSelect {...selectProps} />
        // },
        {
          title: '备注', width: 135, dataIndex: 'remarkx', key: 'remark',
          editor: canEdit && <Input />
        },
      ];
    }
    //部门计划
    if (planType == 2) {
      columns = [ // 和antd table组件的列定义相同
        { title: '名称', width: 180, dataIndex: 'materialData.name', key: 'materialData.name' },
        { title: '规格型号', width: 455, dataIndex: 'materialData.specification', key: 'materialData.specification' },
        {
          title: '需求数量', width: 80, dataIndex: 'demandQuantity', key: 'demandQuantity',
          editor: canEdit && <Input placeholder='请填写数字值' />
        },
        { title: '单位', width: 80, dataIndex: 'materialData.measurementUnit', key: 'materialData.measurementUnit' },
        {
          title: '单价（元）', width: 135, dataIndex: 'materialData.priceWithTax', key: 'materialData.priceWithTax',
          textRender: (value, record) => !record._isGroup &&record.materialData&& Number(value/ (1 + record.materialData.taxRate)).toFixed(2)
        },
        {
          title: '总价(元)', width: 125, dataIndex: 'demandTotal', key: 'demandTotal',
          textRender: (value, record) => {
            if (record._isGroup) return '';
            let totalAmount=0;
            if(record.materialData)
              totalAmount = record.materialData.priceWithTax * record.demandQuantity / (1 + record.materialData.taxRate);
            return totalAmount.toFixed(2);
          }
        },
        {
          title: '使用人', width: 135, dataIndex: 'user', key: 'user', type: 'select',
          textRender: (value, record) => {
            if (record.userId && !record.user) {
              let href = service.constructRecordUrl({ modelName: 'users', id: record.userId });
              record.user = href ? href : '';
            }
            return record.userName || '***';
          },
          editor: canEdit && <DropdownSelect {...selectProps} />
        },
        {
          title: '备注', width: 135, dataIndex: 'remarkx', key: 'remark',
          editor: canEdit && <Input />
        },
      ];
    }
    //采购计划
    if (planType == 3) {
      columns = [ // 和antd table组件的列定义相同
        { title: '物资名称', width: 160, dataIndex: 'materialData.name', key: 'materialData.name' },
        { title: '规格型号', width: 160, dataIndex: 'materialData.specification', key: 'materialData.specification' },
        { title: '供应商', width: 160, dataIndex: 'materialSupplier.name', key: 'materialSupplier.name' },
        {
          title: '单价(元)', width: 125, dataIndex: 'materialData.priceWithTax',
          key: 'materialData.priceWithTax', textRender: (value, record) => !record._isGroup && Number(value).toFixed(2)
        },
        { title: '需求数量', width: 105, dataIndex: 'demandQuantity', key: 'demandQuantity' },
        {
          title: '采购单价', width: 100, dataIndex: 'purchasePrice', key: 'purchasePrice',
          editor: canEdit && <Input />, textRender: (value, record) => !record._isGroup && Number(value).toFixed(2)
        },
        { title: '采购数量', width: 105, dataIndex: 'purchaseQuantity', key: 'purchaseQuantity', editor: canEdit && <Input /> },
        {
          title: '总价(元)', width: 145, dataIndex: 'demandTotal', key: 'demandTotal',
          textRender: (value, record) => {
            if (record._isGroup) return '';
            let totalAmount=0;
            if(record.materialData)
            totalAmount = record.materialData.priceWithTax * record.demandQuantity;
            return totalAmount.toFixed(2);
          }
        },
        {
          title: '采购总价(元)', width: 145, dataIndex: 'purchaseAmount', key: 'purchaseAmount',
          textRender: (value, record) => {
            if (record._isGroup) return '';
            let totalAmount = record.purchasePrice * record.purchaseQuantity;
            return totalAmount.toFixed(2);
          }
        }
      ];
    }
    return columns;
  }

  constructWhere = () => {
    const { planType, record } = this.props;
    let recordId = service.getRecordId(record);
    //默认根据部门计划查询。planType==2
    let where = 'o.departmentPlan.id=' + recordId + ' and o.demandPlan=null';
    //公司计划或者单位计划
    if (planType < 2) {
      where = 'o.demandPlan.id=' + recordId;
    }
    //采购计划
    if (planType == 3) {
      where = 'o.purchasePlan.id=' + recordId;
    }
    //采购计划物资发放
    if (planType == 4) {
      where = '';
      let demandPlans = service.getRecordLinkAttr(record, 'demandPlans');
      if (demandPlans) {
        demandPlans.map((demandPlan) => {
          let id = demandPlan.id;
          if (where == '') {
            where = 'o.demandPlan.id=' + id;
          } else {
            where = where + ' or o.demandPlan.id=' + id;
          }
        });
      }
    }
    return where;
  }

  setGroupInfo = (listProps) => {
    const { planType, record, orgLevel, type, isEngineerSpec } = this.props;
    //公司计划分组情况
    if (planType < 1) {
      listProps.groupKey = 'orgId';
      listProps.groupRecordFunc = this.computeGroupRecord;
      listProps.defaultExpandAllRows = true;
      let afterReview = wfservice.authz(record, ['afterReview'])
      //审批后的分组情况
      if (afterReview) {
        listProps.groupKey = 'supplierId';
        //办公设备审批通过之后不分组。
        if (type == 'OFFICE_EQUIPMENT' || type == 1) {
          listProps.groupKey = undefined;
          listProps.groupRecordFunc = undefined;
        }

        //办公用品按部门分组。
        if (type == 'OFFICE_SUPPLIES' || type == 5) {
          listProps.groupKey = 'orgId';
          listProps.groupRecordFunc = this.computeGroupRecord;
        }
        //劳保用品部门分组。
        if (type == 'LABOUR_SUPPLIES' || type == 6) {
          listProps.groupKey = 'orgId';
          listProps.groupRecordFunc = this.computeGroupRecord;
        }
      }
      //工程物资的情况
      if (type == 'ENGINEERING_MATERIALS' || type == 4) {
        //工程物资规格分组
        if (isEngineerSpec) {
          listProps.groupKey = 'materialData.specification';
        }
      }
      //非安装设备不分组。
      if (type == 'NON_INSTALLATION_EQUIPMENT' || type == 2) {
        listProps.groupKey = 'orgId';
        listProps.groupRecordFunc = this.computeGroupRecord;
      }
    }
    //采购计划的分组情况
    if (planType == 3) {
      listProps.groupKey = 'supplierId';
      listProps.groupRecordFunc = this.computeGroupRecord;
      listProps.defaultExpandAllRows = true;
      //单位采购
      if (orgLevel == 1) {
        listProps.groupKey = '_undefined'
      }
      //工程物资采购的情况
      if (type == 'ENGINEERING_MATERIALS' || type == 4) {
        listProps.groupKey = undefined;
      }
      //办公设备不分组。
      if (type == 'OFFICE_EQUIPMENT' || type == 1) {
        listProps.groupKey = undefined;
        listProps.groupRecordFunc = undefined;
      }
      //非安装设备不分组。
      if (type == 'NON_INSTALLATION_EQUIPMENT' || type == 2) {
        listProps.groupKey = undefined;
        listProps.groupRecordFunc = undefined;
      }
      //办公用品不分组。
      if (type == 'OFFICE_SUPPLIES' || type == 5) {
        listProps.groupKey = undefined;
        listProps.groupRecordFunc = undefined;
      }
      //劳保用品不分组。
      if (type == 'LABOUR_SUPPLIES' || type == 6) {
        listProps.groupKey = undefined;
        listProps.groupRecordFunc = undefined;
      }
    }
    //采购计划物资发放的分组情况
    if (planType == 4) {
      listProps.groupKey = 'orgId';
      listProps.groupRecordFunc = this.computeGroupRecord;
      listProps.defaultExpandAllRows = true;
    }
  }

  //计算分组行的
  computeGroupRecord = (list, groupKey) => {
    const { planType } = this.props;
    if (!list || list.length == 0) return undefined;
    let newRecord = { _isGroup: true };
    let firstOne = list[0];
    newRecord._key = 'orgId' + firstOne.orgId;
    newRecord.materialData = {};
    //在名称上设置分组行的名称，在规格上设置合计信息
    newRecord.materialData.name = firstOne.org && firstOne.org.orgName;
    //已供应商分组的时候，这个值是供应商的名称。
    if (groupKey == 'supplierId') {
      newRecord._key = 'supplierId' + firstOne.supplierId;
      if (firstOne.materialSupplier)
        newRecord.materialData.name = firstOne.materialSupplier.name;
      else {
        newRecord.materialData.name = '暂无供应商名称';
      }
    }
    //规格分组
    if (groupKey == 'materialData.specification') {
      newRecord.materialData.name = firstOne.materialData && firstOne.materialData.name;
      newRecord._key = 'specification' + newRecord.materialData.name;
      newRecord.demandQuantity = 0;
      list.map((item) => {
        newRecord.demandQuantity = newRecord.demandQuantity + item.demandQuantity;
      });
      newRecord.materialData = firstOne.materialData;
    }


    let totalAmount = 0;
    list.map((item) => {
      if(item.materialData)
      totalAmount = totalAmount + (item.demandQuantity * item.materialData.priceWithTax / (1 + item.materialData.taxRate));
    });
    totalAmount = totalAmount.toFixed(2);
    if (groupKey != 'materialData.specification')
      newRecord.materialData.specification = '总金额(不含税):' + totalAmount + '元';

    //采购计划的情况
    if (planType == 3) {
      totalAmount = 0;
      list.map((item) => {
        totalAmount = totalAmount + (item.purchasePrice * item.purchaseQuantity);
      });
      totalAmount = totalAmount.toFixed(2);
      newRecord.materialData.specification = '总金额(含税):' + totalAmount + '元';
    }
    return newRecord;
  }

  //构造底部信息
  constructFooter = (list) => {
    if (!list) return '';
    const { planType, type, record} = this.props;
    let footer = '';
    let totalAmount = 0;
    let budgetAmount = '未下达';
    let usedAmount = record.usedAmount?record.usedAmount:0;
    let canUseBudget = 0;
    //有预算才去计算能用的预算
    if(record.hasBudget){
      budgetAmount=record.budgetAmount?record.budgetAmount:0;
      canUseBudget=budgetAmount-usedAmount;
      budgetAmount = budgetAmount.toFixed(2);
    }
    canUseBudget = canUseBudget.toFixed(2);
    usedAmount = usedAmount.toFixed(2);

    totalAmount = 0;
    list.map((item) => {
      if(item.materialData)
        totalAmount = totalAmount + (item.materialData.priceWithTax * item.demandQuantity / (1 + item.materialData.taxRate));
    });
    totalAmount = totalAmount.toFixed(2);
    footer = '合计金额:    |    本次合计：' + totalAmount + '元，  已使用：'+usedAmount+'元。';

    //部门计划
    if(planType==2){
      //办公用品、it耗材
      if (type == 'OFFICE_SUPPLIES' || type == 5 || type == 'IT_CONSUMABLE' || type == 0) {
        footer = '合计金额:      |    本次合计：' + totalAmount + '元；' + '      预算'
          + budgetAmount + '元；' + '     已使用' + usedAmount + '元；' + '     可用预算' + canUseBudget + '元。';
      }
    }

    //公司计划
    if (planType == 0) {
      footer = '本次合计：' + totalAmount + '元。';
      //工程物资
    }
    //采购计划
    if (planType == 3) {
      totalAmount = 0;
      list.map((item) => {
        totalAmount = totalAmount + (item.purchasePrice * item.purchaseQuantity);
      });
      totalAmount = totalAmount.toFixed(2);
      footer = '本次合计：' + totalAmount + '元。';
    }
    return footer;
  }

  //新增行
  newItem = () => {
    const { record, dispatch, year, type, planType } = this.props;

    let where = 'o.year=' + year + ' and o.type=' + materialService.convertTypeToInt(type) + ' and isStopProduction=0';
    let searchParam = { //搜索条件
      filter: {
        where,
      },
      linkAttrs: [],
      size: 30, //指定每页记录数
      sort: ['o.name,desc'] //缺省排序规则
    };

    let formProps = service.constructPropsOfForm('material', record);
    formProps.record = record;
    formProps.searchParam = searchParam;
    formProps.objPropName = '_planItems';

    let recordUrl = service.getHrefOfLinkAttr(record);
    let uid = service.getRecordId(record) + '' + planType + record.type;


    //默认部门计划。
    let foreignKey = 'departmentPlan';
    //公司计划或者单位计划
    if (planType < 2) {
      foreignKey = 'demandPlan';
    }
    //采购计划计划
    if (planType == 3) {
      foreignKey = 'purchasePlan';
    }

    //发送消息显示对话框
    dispatch({
      type: 'modaldialog/show',
      payload: {
        iconType: 'info-circle-o',
        title: '选择' + materialService.convertTypeToString(type),
        content: <MaterialSelect {...formProps} />,
        onOk: () => {
          dispatch({ type: 'modaldialog/save', payload: { visible: false } });
          dispatch({
            type: 'plan_item/addRows',
            payload: {
              rows: record[formProps.objPropName],
              dataKey: uid,
              planUrl: recordUrl,
              foreignKey,
            }
          });
        },
        style: "width:800px !important;",
      }
    });
  }

}
//连接模型(model)和组件，使模型变化时，组件属性也跟着变化，从而重新加载组件
import { connect } from 'dva';
export default connect(({ plan_item, loading }) =>
  ({ plan_item, loading: loading.models[modelName] })
)(PlanItems);
