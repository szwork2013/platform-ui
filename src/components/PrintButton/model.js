import service from 'service';
import config from 'config';
import React from 'react';

const modelName = 'print';

const model =  {
  namespace: modelName,
  state: {
    data:[], //元素格式：{key, list:[], tree:[]}
  },
  reducers: {
    // 处理保存消息
    save(state, action) {
      return {...state, ...action.payload}
    },
  }, // end of reducers

  effects: {
    // 请求选项数据消息
    *openPdf({payload}, {call, put,select}) {

      let {templateNo,attachmentLink,fileName,record}=payload;
      //1 调用服务创建pdf文件
      const rootUrl = config.API.replace('api', '');
      let url=rootUrl+'template_excel/service/create_print_file?templateNo='+templateNo
        +'&attachmentLink='+attachmentLink +'&fileName='+fileName;
      let param = {
        method: 'post',
        data: record
      }
      const result =yield call(service.httprequest,url,param);
      if (!result) return; //出错了

      let xpnToken = service.userInfo.token.value;
      const printPageUrl = rootUrl + 'pdfjs-1.9.426-dist/web/viewer.html?file=' +
        encodeURIComponent(`/template_excel/service/mailmerge?xpnToken=${xpnToken}&templateNo=${templateNo}&attachmentLink=${attachmentLink}&fileName=${fileName}`)

       url=printPageUrl;
      let title='打印';
      let w=850;
      let h=750;

      let dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left;
      let dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top;

      let width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
      let height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

      let left = ((width / 2) - (w / 2)) + dualScreenLeft;
      let top = ((height / 2) - (h / 2)) + dualScreenTop;
      let newWindow = window.open(url, title, 'menubar=no,toolbar=no, status=no,scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

      // Puts focus on the newWindow
      if (window.focus) {
       // newWindow.focus();
      }
    },

  }, // end of effects

  subscriptions: {
  }
};

export default model;
