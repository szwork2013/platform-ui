const APIV1 = '/api/v1';
const API = window.XPN_UI_API || 'http://localhost:8080/api';
//const API = 'http://10.0.0.36:8080/api';
const serverPath = API.substring(0, API.length - 4);
export default {
  name: 'XPN UI',
  prefix: 'xpnUI',
  footerText: '华能新能源股份有限公司云南分公司　版权所有',
  logo: '/logo.png',
  iconFontCSS: '/iconfont.css',
  iconFontJS: '/iconfont.js',
  CORS: [],
  openPages: ['/login'],
  apiPrefix: '/api',
  adminPermissionName: 'sys.admin', //系统管理授权名称
  APIV1,
  API,
  serverPath,
  api: {
    rootPath: `${API}`,
    login: `${API}/login`,
    logout: `${API}/logout`,
  }
}
