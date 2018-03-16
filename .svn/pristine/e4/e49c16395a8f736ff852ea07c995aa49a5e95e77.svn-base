import {routerRedux} from 'dva/router';

import {message} from 'antd';

import service from 'service';

//初始的用户信息
const initUserInfo = {
  user: { //用户信息
    id: '', //用户id
    userName: '', //用户名
    userCode: '', //用户编码
    name: '匿名用户', //姓名
    mobile:'', //手机号
    orgFullName: '', //所属机构全名 xxx科/xxx部门/xxx单位
    org: {}, //所属机构，格式：{id, orgName, parentId, parentOrg, ...}
    roleList: [], //角色列表：['角色1','角色2']
    selfLink: '', //用户的链接
  },
  token: { //认证Token
    name: '',
    value: '',
  },
  permissions: [], //授权
  siderCollapsed : false, //Sider是否被折叠
  theme: {}, //皮肤
}

//模型：webapp
const model =  {
  namespace: 'webapp',
  state: {
    ...initUserInfo
  },
  reducers: {
    // 处理保存消息
    save(state, action) {
      service.userInfo = {...state, ...action.payload}; //更新service的用户信息
      return {...state, ...action.payload}
    },

    // 处理更新Sider状态消息
    updateSiderState(state, action) {
      return {...state, ...action.payload};
    },
  }, // end of reducers

  effects: {
    // 处理登录消息
    *login({payload}, {call, put, select}) {
      //1 调用服务进行登录
      const data = yield call(service.login, payload);
      if (!data) return; //出错了

      //保存登录信息
      data.loginInfo = {...payload};

      yield put({ //调用reducers的save保存用户信息到模型
        type: 'save',
        payload: data,
      });
      service.saveUserInfoToLocal(data); //保存用户信息到本地

      //2 登录成功后重定向路径
      const toPath = service.getRedirectToPathAfterAuthc();
      yield put(routerRedux.push({
        pathname: toPath
      }));
    },

    // 处理注销消息
    *logout({payload}, {call, put}) {
      //1 调用服务进行注销
      yield call(service.logout);
      service.userInfo = null;

      //2 从本地存储移除用户信息
      service.removeUserInfoFromLocal();

      //4 注销
      let win;
      if (payload && payload.thenClose) { //注销后关闭窗口
        try {
          window.opener=null;
          win = window.open('','_self');
          win && win.close();
        }
        catch(e) {
        }

        message.error('十分抱歉，无法自动关闭当前窗口，请手动关闭!');
      }

      //注销后重定向路径
      location.href = '/'; //郑波2017-12-15修改：回到登录界面，避免缓存问题
      /*
      service.curPath = '/login';
      yield put(routerRedux.push({
        pathname: '/login'
      }));
      */
    },

    // 更新皮肤消息
    *updateTheme({payload}, {call, put, select}) {
      const theme = yield select(state=> state.webapp.theme);
      yield put({
        type: 'save',
        payload: {
          theme: Object.assign({}, theme, payload)
        }
      });
    },

    //请求兼职用户列表
    *queryOtherUsers ({payload}, {call, put, select}) {
      //取当前用户信息
      let userId = payload.userId || service.userInfo.user.id;
      let userName = payload.userName || service.userInfo.user.userName;
      let userCode = payload.userCode || service.userInfo.user.userCode;

      //构造查询参数
      let searchParam = {
        filter: {
          where: "not o.id="+userId+" and o.userCode='"+userCode+"'"
        },
        linkAttrs:[],
      }
 
      //查询兼职用户列表
      yield put({
        type: 'users/query',
        payload: {
          searchParam,
          dataKey: 'otherUsers', //郑波2017-12-13增加：解决打开用户后，我的功能菜单混乱的问题
        }
      });
    },

    //切换用户处理
    *switchUser ({payload}, {call, put, select}) {
      //1 取要切换到的用户名
      const {userName, userId} = payload;

      //2 取用户的登录信息
      let loginInfo = yield select(state=> state.webapp.loginInfo);
      if (!loginInfo) {
        message.error('切换用户失败：无法获取登录信息！');
        return;
      }

      loginInfo.username = userName;
    
      //3 重新登录
      yield put({
        type: 'login',
        payload: loginInfo
      });

      //4 请求兼职用户列表
      yield put({
        type: 'queryOtherUsers',
        payload: {userName, userId},
      });

    },

    // 处理事件订阅
    *subscribe ({payload}, {call, put, select}) {
      //暂时未实现
    },
  }, // end of effects

  subscriptions: {
    setup({dispatch, history}) {
      service.dispatch = dispatch; //把dispath传递给service，以便service能发送消息
      return history.listen(({ pathname }) => {
        pathChangeListener(pathname, dispatch);//监听路径变化消息
      });
    }
  }
};

//监听器：路径变化
const pathChangeListener = (pathname, dispatch) => {
  if (pathname == undefined) return;

  if (pathname != '/login') {
    service.curPath = pathname; //记录当前路径
  }

  if (service.isAuthc()) return; //用户已登录，直接返回

  //用户未登录或者已丢失认证状态：从本地存储中读取用户信息保存到模型中
  const userInfo = service.readUserInfoFromLocal();
  if (userInfo == null) return;
  dispatch({
    type: 'save',
    payload: userInfo
  });
}

export default model;
