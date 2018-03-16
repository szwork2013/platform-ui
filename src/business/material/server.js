//服务接口
const service = {
  //枚举转换
  convertTypeToString: (type) => {
    if (type == 'IT_CONSUMABLE'||type==0) return 'IT耗材';
    if (type == 'OFFICE_EQUIPMENT'||type==1) return 'IT办公设备';
    if (type == 'NON_INSTALLATION_EQUIPMENT'||type==2) return '非安装设备';
    if (type == 'PRODUCTION_EQUIPMENT'||type==3) return 'IT生产设备';
    if (type == 'ENGINEERING_MATERIALS'||type==4) return '工程物资';
    if (type == 'OFFICE_SUPPLIES'||type==5) return '办公用品';
    if (type == 'LABOUR_SUPPLIES'||type==6) return '劳保用品';
    if (type == 'TYRE'||type==7) return '轮胎';
    if (type == 'SOFT'||type==8) return '软件';
    if (type == 'LABORATORY_SUPPLIES'||type==9) return '实验室用品';
    return type;
  },

  //枚举转换
  convertTypeToInt: (type) => {
    if (type == 'IT_CONSUMABLE'||type==0) return 0;
    if (type == 'OFFICE_EQUIPMENT'||type==1) return 1;
    if (type == 'NON_INSTALLATION_EQUIPMENT'||type==2) return 2;
    if (type == 'PRODUCTION_EQUIPMENT'||type==3) return 3;
    if (type == 'ENGINEERING_MATERIALS'||type==4) return 4;
    if (type == 'OFFICE_SUPPLIES'||type==5) return 5;
    if (type == 'LABOUR_SUPPLIES'||type==6) return 6;
    if (type == 'TYRE'||type==7) return 7;
    if (type == 'SOFT'||type==8) return 8;
    if (type == 'LABORATORY_SUPPLIES'||type==9) return 9;
    return type;
  },

  //获取所有枚举类型
  getAllType: (type) => {
    let types = [
      { 'id': '0', 'name': 'IT耗材' },
      { 'id': '1', 'name': 'IT办公设备' },
      { 'id': '2', 'name': '非安装设备' },
      { 'id': '3', 'name': 'IT生产设备' },
      { 'id': '4', 'name': '工程物资' },
      { 'id': '5', 'name': '办公用品' },
      { 'id': '6', 'name': '劳保用品' },
      { 'id': '7', 'name': '轮胎' },
      { 'id': '8', 'name': '软件' },
      { 'id': '9', 'name': '实验室用品' },
    ];
    return types;
  },
}
export default service;
