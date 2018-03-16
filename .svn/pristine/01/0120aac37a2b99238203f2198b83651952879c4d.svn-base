//本地会话服务
export default {
  //保存数据到本地
  setItem : (itemName, itemValue, persistence) => {
    saveItemToLocal(itemName, itemValue, persistence);
  },

  //从本地读取数据
  getItem : (itemName, persistence) => {
    return getItemFromLocal(itemName, persistence);
  },

  //读取cookie数据
  getCookie : (cookieName) => {
    return getCookie(cookieName);
  }
}

// 设置cookie，expires为有效天数，当传入 0 时为浏览器缺省的时间限制
const setCookie = (cookieName, cookieValue, expires) => {
  if (cookieName == '')
    return;
  let expiringDate = '';
  if (expires != 0) {
    let exp = new Date();
    let theTime = exp.getTime() + (expires * 24 * 60 * 60 * 1000);
    exp.setTime(theTime);
    expiringDate = '; expires=' + exp.toGMTString();
  }
  document.cookie = cookieName + '=' + cookieValue + expiringDate
    + '; path=/';
}

// 根据 cookie 名取值
const getCookie = (cookieName) => {
  if (document.cookie != '') {
    let thisCookie = document.cookie.split('; ');
    for (let i = 0; i < thisCookie.length; i++)
      if (cookieName == thisCookie[i].split('=')[0])
        return thisCookie[i].split('=')[1];
  }
  return null;
}

// 方法：保存项目到本地
const saveItemToLocal = (itemName, itemValue, persistence=false) => {
  try {
    let storage = window.sessionStorage;
    if (persistence) storage = window.localStorage;

    storage.setItem(itemName, itemValue);
  } catch (e) {}
}

// 方法：从本地读取项目
const getItemFromLocal = (itemName, persistence=false) => {
  try {
    let storage = window.sessionStorage;
    if (persistence) storage = window.localStorage;

    return storage.getItem(itemName);
  } catch (e) {}

  return null;
}