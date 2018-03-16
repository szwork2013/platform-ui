export default {
  namespace:"commentButton",
  state: {
    modalVisible: false,
    modalType:'create',
    addAllowed:false,//控制是否显示添加按钮
    comment: null,//当前填写的评论
    action:{},
    commentActionId:'',//当发送没有意见 然后弹出意见框时的 意见操作id
    users:[],//当发送没有意见 然后弹出意见框时的 选中的人员。
    extraData:{}
  },
  reducers: {
    refresh(state,{payload}) {
      return {...state, ...payload}
    },
    show(state) {
      return {...state, modalVisible: true}
    },
    hide(state) {
      return {...state, modalVisible: false}
    },
    clean(state) {
      return {comment: null,addAllowed:false}
    },
  },
}

