import React from 'react';

import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';

import option from './option';

import service from 'service';

class StatInfo extends React.Component {
  componentDidMount(props) {
    if (this.div) {
      this.chart = echarts.init(this.div);
      this.initChart = true;
    }
  }

  componentDidUpdate() {
    let formStatInfo = this.props.formStatInfo;
    if (this.chart && formStatInfo && this.initChart) {
      this.chart.setOption(this.constructData());
      this.initChart = false;
    }
  }

  render() {
    return (
      <div style={{width: '420px', height: '400px'}}
        ref={(div) => this.div = div}>
      </div>
    )
  }

  //构造图表选项数据
  constructData() {
    const {record, formStatInfo} = this.props;
    //1 构造使用权限名称
    let usePermission = '公司统筹';
    if (record.usePermission==1) { //部门自行管理，构造部门名称
      if (record.createdByFullName) {
        usePermission = record.createdByFullName.split('/')[1];
      }
      else {
        usePermission = service.userInfo.user.org.orgName;
      }
    }
    //option.xAxis[0].data[2] = usePermission;

    //2 获取项目或者场站名称
    let fundSource = service.getRecordLinkAttr(record, 'fundSource')||record._fundSource;
    if (fundSource) {
      option.xAxis[0].data[1] = fundSource.name;
    }

    //3 设置数据
    for( let s of option.series) {
      s.data[0] = formStatInfo.compAllInfo[s.key];
      s.data[1] = formStatInfo.projectInfo[s.key];
      //s.data[2] = formStatInfo.deptOrCompInfo[s.key];
    }

    return option;
  }
}

//连接模型(model)和组件，使模型变化时，组件属性也跟着变化，从而重新加载组件
import { connect } from 'dva';
export default connect(({
  expenditure_datacenter:{formStatInfo}
}) =>
  ({formStatInfo})
)(StatInfo);
