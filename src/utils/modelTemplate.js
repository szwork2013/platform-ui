import service from 'service';
import wfservice from './workflowService';

import { message } from 'antd';

//模型模板
const model = {
  namespace: 'xxx', //模型名称
  state: {
    changedViewDataKey: 'default', //数据改变的视图的关键字
    viewData:[{ //视图数据
      dataKey: 'default', //数据关键字
      clazz: '', //缺省实体类
      linkAttrs: [], //关联属性定义
      listProjection: '', //列表缺省投影
      listJpql:'', //视图缺省的查询jpql，不带where
      recordProjection: '', //记录的投影
      recordOpenJpql: '', //记录打开jpql，不带where
      list: [], //列表数据
      selectedRowKeys: [], //选中的行key数组
      selectedRows: [], //选中的行数组 2017-12-04 zyk 视图选中行
      searchParam: {}, //搜索条件
      page: {
        size: 10, //每页记录数
        totalElements: 0, //记录总数
        totalPages: 0, //总页数
        number: 0 //当前页码
      }, //分页信息
    }],
  }, // end of state

  subscriptions: {
  }, // end of subscriptions

  effects: {
    //视图消息：查询分页数据
    *query ({type, payload}, { call, put,select }) {
      const namespace = service.getNamespace(type);
      const state = yield select(state=>state[namespace]);

      //解构参数
      let { form, initQuery, queryType, where, sort, searchParam, dataKey, ...rest } = payload;

      //郑波2018-1-16增加：支持多个视图使用一个模型
      let viewData = service.getViewData(state, dataKey);
      //---END---

      //获取当前的查询参数
      const clazz = viewData.clazz;
      const savedSearchParam = viewData.searchParam;
      const savedWhere = !initQuery&&viewData.savedWhere;
      const savedSort = !initQuery&&viewData.savedSort;

      where = (where == undefined ? savedWhere : where);
      sort = (sort == undefined ? savedSort : sort);

      //根据queryType获得查询参数
      let queryParam = {};
      if (queryType) {
        const queryTypes = viewData.queryTypes;
        if (queryTypes) {
          queryParam = queryTypes[queryType];
        }
      }

      //构造新的查询参数
      let newSearchParam = {...savedSearchParam, ...queryParam, ...searchParam};
      if (newSearchParam.filter) {
        newSearchParam.filter.clazz = newSearchParam.filter.clazz || clazz;
      }

      //郑波2017-11-01增加：自动配置搜索参数
      newSearchParam = service.autoConfigSearchParam({searchParam:newSearchParam, state:viewData});
      //---END---

      //郑波2017-11-14增加： 查询前清空模型的数据
      yield put({
        type: 'save',
        payload: {
          dataKey,
          list: null,
        }
      })
      //---END---

      //调用服务查询数据：郑波2017-11-18修改，使用dataSource
      let data = yield call(service.queryPage, viewData.dataSource,
        {...newSearchParam, ...rest}, where, sort);
      if (data == null) return;

      //查询成功，保存数据到模型
      let saveData = service.parseRestResult(data);
      let savePayload = {
          dataKey,
          ...viewData,//sgf 2018-1-22 add 处理新加入一个key记录是复用原来的属性。
          ...saveData,
          searchParam: newSearchParam,
          savedWhere: where, //保存指定的与过滤条件
          savedSort: sort, //保存指定的排序规则
          //如果不特别指定，则清空选中的记录
          selectedRowKeys: payload && payload.selectedRowKeys || [],
          selectedRows: payload && payload.selectedRows || [] //2017-12-04 zyk 视图选中行
      }
      //郑波2018-1-25： 支持视图指定表单
      if (form) savePayload.form = form;
      //---END---

      yield put({
        type: 'save',
        payload: savePayload
      })
    },

    //视图消息：删除数据库中单条记录
    *delete ({ type, payload }, { call, put, select }) {
      const namespace = service.getNamespace(type);
      const state = yield select(state=> state[namespace]);

      const {dataKey} = payload;
      let viewData = service.getViewData(state, dataKey);

      const page = viewData.page.number;
      const data = yield call(service.deleteRecord, payload.record);
      if (data != null) {
        message.success("删除成功！", 3);
        //更新模型并重新请求数据
        yield put({ type: 'save', payload:{ dataKey, selectedRowKeys: [] } });
        const { queryType } = payload;
        yield put({ type: 'query', payload:{ dataKey, page: page, queryType: queryType} });
      }
    },

    //视图消息：批量删除数据库的记录
    *bulkdelete ({ type, payload }, { call, put, select }) {
      const namespace = service.getNamespace(type);
      const state = yield select(state=> state[namespace]);

      const {dataKey} = payload;
      let viewData = service.getViewData(state, dataKey);

      const page = viewData.page.number;
      let selectedRowKeys = viewData.selectedRowKeys;

      //调用服务删除选中的记录
      let count = 0;
      for(let key of selectedRowKeys) {
        const result = yield call(service.deleteRecord, key);
        if (result==null) return;
        count++;
      }
      message.success("成功删除"+count+"条记录！", 3);

      //更新模型并重新请求数据
      yield put({ type: 'save', payload:{ dataKey, selectedRowKeys: [] } });

      const { queryType } = payload;
      yield put({ type: 'query', payload:{ dataKey, page: page, queryType: queryType} });
    },

    //视图消息：新增记录
    *new ({ type, payload }, { call, put, select }) {
      const namespace = service.getNamespace(type);
      const state = yield select(state=> state[namespace]);

      const { queryType, processNo,parentInstanceId,
        parentInstanceEntityLink, defaultValues, dataKey } = payload;
      let viewData = service.getViewData(state, dataKey);

      const form = viewData.form;
      const modelTitle = viewData.modelTitle;
      const titleRender = viewData.titleRender;

      //构造tab请求参数
      let model = payload && payload.model || {record: {}, state:{mode:'new', origin:{}}};
      model.queryType = queryType;
      wfservice.setProcessNo(model.record, processNo);

      //sgf add 2018-1-24 将父流程实例id和父流程表单连接设置到记录里面
      wfservice.setParentInstanceId(model.record, parentInstanceId);
      wfservice.setParentInstanceEntityLink(model.record, parentInstanceEntityLink);
      //end

      //郑波2017-11-3增加：支持缺省值
      if (defaultValues) {
        Object.assign(model.record, defaultValues);
        if (model.state && model.state.origin) {
          Object.assign(model.state.origin, defaultValues);
        }
      }
      //---END---

      const param = {
        title: getRecordTabTitle(titleRender, modelTitle, model.record),
        key: namespace,
        modelName:namespace,//sgf 2018-01-26加入模型名称
        component: form,
        model: model,
      };

      //调用接口创建新tab
      yield put ({
        type:'apptabs/newTab',
        payload: param,
      });
    },

    //视图消息：打开记录
    *open ({ type, payload }, { call, put, select }) {
      const namespace = service.getNamespace(type);
      const modelState = yield select(state=> state[namespace]);

      let { record, state, queryType, dataKey } = payload;
      const model = service.getViewData(modelState, dataKey);

      const { form, modelTitle, clazz, recordProjection, titleRender } = model;

      let href = service.parseRecordUrl(record);

      if (!record._key) { //非新记录：从服务器请求记录的数据
        const recordOpenJpql = service.constructRecordOpenUrl(model);
        record = yield call(service.queryRecord, href, {clazz, projection:recordProjection, jpql:recordOpenJpql});
        if (record == null) return;

        //从连接里面拿出待办id（如果从待办或者已办打开的情况）
        let todoId=wfservice.getTodoIdFromHref(href);

        //郑波2017-11-15增加：解决从待办事项中打开，href不一致的问题
        href = service.parseRecordUrl(record);
        //---END---

        //如果需要工作流，则请求待办列表
        if (wfservice.getInstanceId(record)) {
          const todoList = yield call(wfservice.requestSelfTodoList,
            namespace, record,todoId);
          wfservice.setTodoListAndInstanceId(record, todoList);
        }

        record = service.processLinkAttrsOfRecord(record);
        if (state) state.origin = record;
      }
      else { //新记录，重新构造state
        state = { mode: 'new', origin: record };
      }

      //构造tabs请求参数
      const param = {
        title: getRecordTabTitle(titleRender, modelTitle, record),
        key: href,
        modelName:namespace,//sgf 2018-01-26加入模型名称
        component: form,
        model: {
          record: Object.assign({}, record),
          state: state,
          queryType: queryType, //记录打开视图的查询类型
        },
      };

      //调用接口创建新tab
      yield put ({
        type:'apptabs/newTab',
        payload: param,
      });
    },

    //可编辑视图消息：更新表格单元
    *updateCell ({ type, payload }, { call, put, select }) {
      const namespace = service.getNamespace(type);
      const state = yield select(state=> state[namespace]);
      const { record, key, value, dataKey } = payload;
      const viewData = service.getViewData(state, dataKey);

      //在模型中查找指定的表格单元字段所在的记录
      const list = viewData.list;
      const index = list.findIndex(r => service.parseRecordUrl(r)==service.parseRecordUrl(record));
      if (index>=0) {
        list[index][key] = value; //设置新的值到模型中
        list[index]['_changed'] = true; //设置被修改的标志
        yield put({ //保存变化到模型中
          type: 'save',
          payload: {
            dataKey,
            list: list,
          }
        })
      }
    },

    //可编辑视图消息：设置表格单元是否可编辑
    *setCellEditable ({ type, payload }, { call, put }) {
      const namespace = service.getNamespace(type);
      const { record, value, editMode, dataKey } = payload;
      if(record._canEdit!=undefined&&record._canEdit==false)     return;         //2018-01-24 zyk 若行有可编辑属性,则根据可编辑属性设置是否可编辑
      //更新编辑模式
      yield put({
        type:'save',
        payload: {
          dataKey,
          viewEditState: computeViewEditState(editMode, value, record)
        }
      });
    },

    //可编辑视图消息：新增一行
    *newRow ({ type, payload }, { call, put, select }) {
      const namespace = service.getNamespace(type);
      const state = yield select(state=> state[namespace]);

      const { record, editMode, dataKey } = payload;
      const viewData = service.getViewData(state, dataKey);

      const list = viewData.list;

      //构造空记录加入list形成新的list
      let newList = [];
      const newRecord = payload.record ||
        { _isNew: true, _key: new Date().getTime()+'' };
      newList.push(newRecord);
      newList = newList.concat(list);

      //保存新list和新的编辑状态到模型中
      yield put({
        type: 'save',
        payload: {
          dataKey,
          list: newList,
          viewEditState: computeViewEditState(editMode, true, newRecord)
        }
      })
    },

    //可编辑视图消息：删除行
    *deleteRow({ type, payload }, { call, put, select }) {
      const namespace = service.getNamespace(type);
      const state = yield select(state=> state[namespace]);

      const { record, editMode, dataKey } = payload;
      const viewData = service.getViewData(state, dataKey);

      //查找删除的行对应的记录
      const list = viewData.list;
      let viewEditState = viewData.viewEditState;

      const index = list.findIndex(r => service.parseRecordUrl(r)==service.parseRecordUrl(record));
      if (index < 0) return;

      //查找被删除的记录的列表
      let deletedList = viewData.deletedList;
      deletedList = deletedList || [];

      const deletedRecord = list[index];
      if (service.parseRecordUrl(deletedRecord)==viewEditState) {
        viewEditState = 'deleted'; //正在编辑的行被删除了
      }

      if (!deletedRecord._key) { //有对应数据库记录的加入删除列表
        deletedList.push(service.parseRecordUrl(deletedRecord));
      }

      //从模型中删除指定的行
      list.splice(index, 1);

      //更新模型
      yield put({
        type: 'save',
        payload: {
          dataKey,
          list: list,
          deletedList: deletedList,
          viewEditState: viewEditState || computeViewEditState(editMode, true),
        }
      })
    },

    //可编辑视图消息：保存表格
    *saveTable({ type, payload }, { call, put, select }) {
      const namespace = service.getNamespace(type);
      const state = yield select(state=> state[namespace]);

      const {dataKey, batchSaveHref} = payload;
      const viewData = service.getViewData(state, dataKey);
      const list = viewData.list;

      //郑波2018-1-24增加：获取需要保存的数据
      let batchSaveData = getBatchSaveData(viewData, payload);

      //情形1： 批量保存
      //郑波2018-1-24增加：支持批量保存
      debugger;
      if (batchSaveHref) {
        let saveResult = yield call(service.batchSaveRecord, batchSaveHref, batchSaveData);
        if (saveResult==null) return;

        //设置编辑模式
        yield put({
          type: 'save', payload: { dataKey, list,
            viewEditState: computeViewEditState(payload.editMode, false) }
        })

        //刷新表格数据
        let page = viewData.page.number;
        let { queryType } = payload;
        yield put({ type: 'query', payload:{ dataKey, page, queryType} });
      }
      //---END---

      //情形2：每条记录单独处理
      //郑波2018-1-24修改：使用统一函数获取要删除、插入和更新的记录
      const deletedList = batchSaveData.deleted;

      let result;

      //删除记录
      let deleted = 0;
      if (deletedList && deletedList.length>0) {
        for (let key of deletedList) {
          result = yield call(service.deleteRecord, key);
          if (result==null) return;
          deleted++;
        }
      }
      if (deleted > 0) {
        message.success(deleted+'条记录被删除！');
        //清空删除记录列表
        yield put({
          type: 'save', payload: { dataKey, deletedList: [] }
        })
      }

      let hasError = false;

      //插入记录
      let inserted = 0;
      for (let record of batchSaveData.inserted) {
        result = yield call(service.createRecord, namespace, record);
        if (result!=null) {
          record._key = undefined;
          inserted++;
          list[record._index] = result;
        }
        else
          hasError = true;
      }
      if (inserted > 0)
        message.success('插入'+inserted+'条记录！');

      //更新记录
      let updated = 0;
      for (let record of batchSaveData.updated) {
        let href = service.parseRecordUrl(record);
        result = yield call(service.updateRecord, href, record);
        if (result!=null) {
          updated++;
          list[record._index]._changed = undefined;
        }
        else
          hasError = true;
      }

      if (updated>0)
        message.success(updated+'条记录被更新！');
      //---END---

      //设置编辑模式
      const setViewEditState = hasError ? true : false;
      yield put({
        type: 'save', payload: { dataKey, list:list,
          viewEditState: computeViewEditState(payload.editMode, setViewEditState) }
      })

      //刷新表格数据
      if (hasError) return; //发生错误，不刷新列表

      const page = viewData.page.number;
      const { queryType } = payload;
      yield put({ type: 'query', payload:{ dataKey, page: page, queryType: queryType} });
    },

    //可编辑视图消息：废弃修改
    *reloadTable ({ type, payload }, { call, put, select }) {
      const namespace = service.getNamespace(type);
      const state = yield select(state=> state[namespace]);

      const {dataKey} = payload;
      const viewData = service.getViewData(state, dataKey);

      const page = viewData.page.number;

      //更新模型并重新请求数据
      yield put({ type: 'save', payload:{ dataKey, list: [], deletedList:[],
        viewEditState: computeViewEditState(payload.editMode, false) } });

      const { queryType } = payload;
      yield put({ type: 'query', payload:{ dataKey, page: page, queryType: queryType} });
    },

    //表单消息：新建记录后保存
    *create ({ type, payload }, { call, put, select }) {
      const namespace = service.getNamespace(type);
      const state = yield select(state=> state[namespace]);

      let { href, record, thenClose, queryType, dataKey } = payload
      const viewData = service.getViewData(state, dataKey);

      //调用服务创建数据库记录
      let returnRecord = yield call(service.createRecord, namespace, record);
      if (returnRecord == null)
        return;

      //如果指定了流程编号，则创建流程实例
      const processNo = wfservice.getProcessNo(record);
      if (processNo) {
        const todo = yield call(wfservice.startProcess,
          {refVarName:namespace,
            processNo,
            record:returnRecord,
            parentInstanceId:wfservice.getParentInstanceId(record),
            parentInstanceEntityLink:wfservice.getParentInstanceEntityLink(record),
          });
        if(!todo){
          message.success("流程创建失败！请联系管理员或者重新创建记录！", 3);
          return;
        }
        wfservice.setTodoListAndInstanceId(returnRecord, todo);

        //调用服务更新记录：为了保存instanceId
        let resultUpdateRecord=yield call(service.updateRecord, service.parseRecordUrl(returnRecord), returnRecord);
        if (resultUpdateRecord == null){
          message.success("流程关联失败！请联系管理员或者重新创建记录！", 3);
          return;
        }
      }

      yield put({ type: 'query', payload: {dataKey, queryType: queryType} });
      message.success("保存成功！", 3);

      if (thenClose) { //保存后直接关闭
        yield put({
          type: 'apptabs/closeTab',
          payload: { key: href }
        });
        return;
      }

      //调用接口更新tab
      const newRecord = service.processLinkAttrsOfRecord(returnRecord);
      const form = viewData.form;
      const titleRender = viewData.titleRender;
      const modelTitle = viewData.modelTitle;

      const param = {
        title: getRecordTabTitle(titleRender, modelTitle, newRecord ),
        key: service.parseRecordUrl(newRecord),
        modelName:namespace,//sgf 2018-01-26加入模型名称
        component: form,
        model: {record: newRecord,
          state:{
            mode:'edit', origin: Object.assign({}, newRecord)
          }
        }
      };

      yield put ({
        type:'apptabs/replaceTab',
        payload: {
          oldKey: href,
          newTab: param
        },
      });
    },

    //表单消息：保存记录
    *update ({ type, payload }, { call, put }) {
      const namespace = service.getNamespace(type);
      let { record, href, oldRecord, thenClose, thenReload, queryType, dataKey } = payload;

      let returnRecord = yield call(service.updateRecord, href, record);
      if (returnRecord == null)
        return;

      //如果需要工作流，则请求待办列表
      if (wfservice.getInstanceId(returnRecord)) {
        const todoList = yield call(wfservice.requestSelfTodoList,
          namespace, returnRecord);
        wfservice.setTodoListAndInstanceId(returnRecord, todoList);
      }

      message.success("保存成功！", 3);
      yield put({ type: 'query', payload: {dataKey, queryType: queryType} });

      if (thenClose) { //保存后直接关闭
        yield put({
          type: 'apptabs/closeTab',
          payload: { key: href }
        });
        return;
      }

      //处理关联字段并且合并老字段
      returnRecord = service.processLinkAttrsOfRecord(returnRecord);
      record = {...oldRecord, ...returnRecord};

      if (thenReload) { //保存后重新打开
        yield put({
          type: 'apptabs/closeTab',
          payload: { key: href }
        });
        yield put({
          type: namespace+'/open',
          payload: { record, state: thenReload}
        });
      }

      //调用接口更新tab的model
      yield put ({
        type:'apptabs/updateTab',
        payload: {
          key: href,
          model: {record, state: {
            origin: Object.assign(record)
          }}
        },
      });
    },

    //流程消息：执行流程操作
    *executeProcessAction ({ type, payload }, { call, put }) {

      let { queryType, href, record, dataKey } = payload;

      //处理记录中的时间格式
      service.formatRecordDate(record);

      //先保存记录。
      let returnRecord = yield call(service.updateRecord, href, record);
      if (returnRecord == null)
        return;

      //执行消息 2018-03-07 史国凤 add
      yield put ({
        type:'sendCommonMessage',
        payload,
      });

      const result = yield call(wfservice.executeAction, payload);
      if (result == null)
        return;
      message.success("操作成功！", 3);

      //刷新视图
      yield put({ type: 'query', payload: {dataKey, queryType: queryType} });

      yield put ({
        type:'refreshTodo',
        payload,
      });
    },

    //流程消息：执行操作的消息。
    *sendCommonMessage ({ type, payload }, { call, put }) {

      let { record, href, todoId, action } = payload;

      if(action.message){
        let actionMessage = eval('(' + action.message + ')');
        if(!actionMessage)
          return;
        if(!actionMessage.type)
          return;

        let messagePayload={};
        if(actionMessage.payload)
          messagePayload=actionMessage.payload;

        yield put({
          type: actionMessage.type,
          payload: {
            ...messagePayload,
            href:href,
            todoId:todoId,
            action,
            record:record,
            thenClose:action.thenClose,
          }
        })
      }
    },

    //流程消息：完成待办
    *completeTodo ({ type, payload }, { call, put }) {

      //执行消息 2018-03-07 史国凤 add
      yield put ({
        type:'sendCommonMessage',
        payload,
      });

      //完成待办
      let resultTodo =yield call(wfservice.completeTodo,payload);
      if(!resultTodo)
        return;

      message.success("操作成功！", 3);

      yield put ({
        type:'refreshTodo',
        payload,
      });

    },

    //流程消息：完成待办
    *tackBack ({ type, payload }, { call, put }) {
      //完成待办
      let resultTodo =yield call(wfservice.tackBack,payload);
      if(!resultTodo)
        return;

      message.success("操作成功！", 3);

      yield put ({
        type:'refreshTodo',
        payload,
      });

    },

    //流程消息：刷新待办待办
    *refreshTodo ({ type, payload }, { call, put }) {
      const namespace = service.getNamespace(type);
      //解构消息
      let { record,thenClose,href } = payload;

      //重新请求并更新待办列表
      if (wfservice.getInstanceId(record)) {
        const todoList = yield call(wfservice.requestSelfTodoList,
          namespace, record);
        wfservice.setTodoListAndInstanceId(record, todoList);
        let todoId=wfservice.getTodoId(record);
        if(!todoId||todoId==='')
          thenClose=true;
      }

      //刷新待办
      yield put({ type: 'todo_link/query', payload: {queryType: undefined} });
      //刷新已办
      yield put({ type: 'done_link/query', payload: {queryType: undefined} });

      if (thenClose) { //保存后直接关闭
        yield put({
          type: 'apptabs/closeTab',
          payload: { key: href }
        });
        return;
      }

      //调用接口更新tab的model
      yield put ({
        type:'apptabs/updateTab',
        payload: {
          key: href,
          model: {record, state: {
            origin: Object.assign(record)
          }}
        },
      });
    },

    //表单消息：设置编码
    *setNo ({payload}, { call, put,select }) {
      //解构消息
      let { record,href,noKey } = payload;
      //设置编码
      let result =yield call(service.updateRecord,service.parseRecordUrl(record)+'/no',{});
      record[noKey]=result;

      //调用接口更新tab的model
      yield put ({
        type:'apptabs/updateTab',
        payload: {
          key: href,
          model: {record, state: {
            origin: Object.assign(record)
          }}
        },
      });
    },

    //表单消息：设置状态
    *setState ({payload}, { call, put,select }) {
      //解构消息
      let { record } = payload;
      yield call(service.updateRecord,service.parseRecordUrl(record)+'/state?state='+payload.state,{});
    },

    //表单消息：设置状态
    *setStateAndNo ({type,payload}, { call, put,select }) {
      //解构消息
      let { record,href,noKey } = payload;
      //设置状态
      yield call(service.updateRecord,service.parseRecordUrl(record)+'/state?state='+payload.state,{});

      //设置编码
      let result =yield call(service.updateRecord,service.parseRecordUrl(record)+'/no',{});
      record[noKey]=result;

      //调用接口更新tab的model
      yield put ({
        type:'apptabs/updateTab',
        payload: {
          key: href,
          model: {record, state: {
            origin: Object.assign(record)
          }}
        },
      });
    },

    //表单消息：公共服务消息
    *commonServiceCall ({type,payload}, { call, put,select }) {
      //解构消息
      let { record,href,serverName,param,method} = payload;
      let callParam = {
        method: 'get',
        data: param
      }
      if(method){
        callParam.method=method;
      }
      let result =yield call(service.httprequest,service.parseRecordUrl(record)+'/'+serverName,callParam);
    },

    //视图消息：拖动排序 2018-03-06 sgf add
    *resetSort ({type, payload}, { call, put,select }) {
      const namespace = service.getNamespace(type);
      const state = yield select(state=>state[namespace]);

      //解构参数
      let { dragParam:{dragIndex, hoverIndex}, dataKey } = payload;
      let viewData = service.getViewData(state, dataKey);
      let list=viewData.list;
      //如果没有排序号，就设置一下排序号。
      list.map((item,index)=>{
       if(item.sortNo!=index){
         item.sortNo=index;
         item._changed=true;
       }
      });

      let newList=[];
      list.map((item,index)=>{
        //下标小于拖动的下标。也小于被覆盖的下标。就不做任何改变。
        if(index<dragIndex&&index<hoverIndex){
          newList.push(item);
        }
        //当拖动下标小于被覆盖下标，就是往下拖动
        if(dragIndex<hoverIndex){
          //大于拖动下标，小于等于被覆盖下标，序号减1
          if(index>dragIndex&&index<=hoverIndex){
            item.sortNo=index-1;
            item._changed=true;
            newList.push(item);
            //等于被覆盖下标的同时，将拖动的项插入到覆盖项后面
            if(index==hoverIndex){
              let dragItem=list[dragIndex];
              dragItem.sortNo=index;
              dragItem._changed=true;
              newList.push(dragItem);
            }
          }

        }
        //当拖动下标大于被覆盖下标，就是往上拖动
        if(dragIndex>hoverIndex){
          //大于等于被覆盖下标，小于拖动下标，序号减1
          if(index>=hoverIndex&&index<dragIndex){
            //等于被覆盖下标的同时，将拖动的项插入到覆盖项前面
            if(index==hoverIndex){
              let dragItem=list[dragIndex];
              dragItem.sortNo=index;
              dragItem._changed=true;
              newList.push(dragItem);
            }
            item.sortNo=index+1;
            item._changed=true;
            newList.push(item);
          }
        }
        //下标大于拖动的下标。也大于被覆盖的下标。也不做任何改变。
        if(index>dragIndex&&index>hoverIndex){
          newList.push(item);
        }
      });

      let savePayload = {
        dataKey,
        list:newList,
        viewEditState:true,
      }
      yield put({
        type: 'save',
        payload: savePayload
      })
    },

  }, // end of effects

  reducers: {
    save (state, action) {
      //郑波2018-1-16增加：支持多个视图使用一个模型
      //return { ...state, ...action.payload }
      return saveViewData(state, action.payload);
      //---END---
    }
  }, // end if reducers

  //创建模型
  createModel: (namespace, param) => {
    let newmodel = {};

    //1 设置state参数
    if (!param.state) param.state = {};
    if (!param.state.page) param.state.page = {};
    if (!param.state.searchParam) param.state.searchParam = {};

    param.state.modelTitle = namespace.title;
    //郑波2017-11-18增加：模型可以指定数据源
    param.state.dataSource = namespace.dataSource||namespace.name;
    //---END---
    param.state.clazz = namespace.clazz;
    param.state.list = [];
    param.state.listProjection = namespace.listProjection||'list';
    param.state.listJpql = namespace.listJpql||service.constructJpql(namespace);
    param.state.recordOpenJpql = namespace.recordOpenJpql;
    param.state.recordProjection = namespace.recordProjection;
    param.state.selectedRowKeys = [];
    param.state.searchParam = param.searchParam || param.state.searchParam;

    const Form = param.form;
    if (Form && !param.state.form) {
      param.state.form = <Form modelName={namespace.name} />
    }

    param.state.page.size = 10; //每页记录数
    param.state.page.totalElements = 0; //记录总数
    param.state.page.totalPages = 0; //总页数
    param.state.page.number = 0; //当前页码

    newmodel.namespace = namespace.name;
    newmodel.state = param.state;

    //2 设置消息处理参数
    newmodel.effects = Object.assign({}, model.effects, param.effects);
    newmodel.reducers = Object.assign({}, model.reducers, param.reducers);
    newmodel.subscriptions = Object.assign({}, model.subscriptions, param.subscriptions);

    //3 设置其它自定义参数
    const { searchParam, form,
      effects, reducers, subscriptions, ...rest} = param;

    Object.assign(newmodel.state, {...rest});
    //郑波2018-1-16增加：支持多个视图使用一个模型
    newmodel.state = {
      viewData:[{
        ...(newmodel.state)
      }]
    };
    //---END---
    return newmodel;
  },
}

//获取打开记录tab的标题
function getRecordTabTitle(titleRender, modelTitle, record) {
  if (titleRender) {
    return titleRender(record);
  }

  if (!record || record._key) {
    return '新'+modelTitle;
  }

  return modelTitle+'：'+record.name || record.title || record.subject;
}

//计算视图编辑状态
function computeViewEditState(editMode, setValue, record) {
  let viewEditState = setValue;
  //如果不是表格编辑模式，设置为当前文档的href，否则设置true/false
  if (editMode!='table') {
    viewEditState = setValue ? (record && service.parseRecordUrl(record) || true) : undefined;
  }
  return viewEditState;
}

//郑波2018-1-16增加：支持多个视图使用一个模型
//保存视图数据
function saveViewData(state, payload) {
  if (!payload) return state;

  let changedViewDataKey = payload.dataKey || 'default';
  let viewData = state.viewData||[];
  let index = viewData.findIndex((r) => r.dataKey == changedViewDataKey);

  //2018-1-22 sgf add 在没有找到的情况下新增进去一条
  if (index < 0 && payload.dataKey) {
    viewData.push({ ...viewData[0], ...payload, dataKey: changedViewDataKey});
  }
  //---END---
  else {
    if (index<0) index = 0;
    viewData[index] = {...(viewData[index]), ...payload, dataKey: changedViewDataKey};
  };

  return {
    changedViewDataKey,
    viewData
  }
}
//---END---

//郑波2018-1-24增加：支持批量保存
//获取批量保存的数据
function getBatchSaveData(viewData, payload) {
  let list = viewData.list;
  let deletedList = viewData.deletedList;

  let result = {deleted:[], inserted:[], updated:[]};

  //删除记录
  if (deletedList && deletedList.length>0) {
    result.deleted = deletedList;
  }

  //插入和更新记录
  debugger
  if (list && list.length>0) {
    let index = 0;
    for (let record of list) {
      if (record._key&&!record.id) { //插入数据库记录
        //郑波2017-11-3增加：支持设定缺省值
        if (payload.defaultValues) {
          Object.assign(record, payload.defaultValues)
        }
        //---END---
        record._index = index;
        result.inserted.push(record);
      }
      else if (record._changed) { //更新数据库记录
        record._index = index;
        result.updated.push(record);
      }

      index++;
    }
  }

  return result;
}

//---END---

export default model;
