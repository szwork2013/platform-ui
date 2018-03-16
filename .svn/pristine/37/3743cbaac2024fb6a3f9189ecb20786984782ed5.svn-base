
import React from 'react';

import {Row, Col, Collapse, Tabs, Icon} from 'antd';
const Panel = Collapse.Panel;
const TabPane = Tabs.TabPane;

import StatInfo from './StatInfo';
import HistoryExecutions from './HistoryExecutions';
import RelatedInstitutions from './RelatedInstitutions';

import service from 'service';

import modelDefinition from './model';

class DataCenter extends React.Component {

  componentDidMount() {
    const {
      record,
      dispatch
    } = this.props;

    //取得模型名称
    const modelName = modelDefinition.namespace;

    //发送消息获取统计信息
    dispatch({
      type: modelName+'/statForForm',
      payload: {record}
    })

    //发送消息初始化历史数据
    record._historyExecutionsRange = 'company';
    dispatch({
      type: modelName+'/queryHistory',
      payload: {record}
    })
  }

  render() {
    const {
      record,
    } = this.props;

    let category = service.getRecordLinkAttr(record, 'category')||record._category;
    const header = <span style={{color:'#e5323e'}}>
      资金来源科目：{category&&category.fullName}
    </span>

    return (
      <Collapse defaultActiveKey={['1']}>
        <Panel key="1"
          header={header} 
        >
          <Row>
            <Col span={9}>
              <StatInfo record={record} />
            </Col>
            <Col span={15} style={{marginTop:-10}}>
              <Tabs tabPosition='top' style={{margin:0, padding:0}}>
                <TabPane tab={<span><Icon type="dot-chart"/>历史数据</span>} key="1">
                  <HistoryExecutions record={record}/>
                </TabPane>
                <TabPane tab={<span><Icon type="file-pdf"/>相关制度</span>} key="2">
                  <RelatedInstitutions record={record}/>
                </TabPane>
              </Tabs>
            </Col>
          </Row>
        </Panel>
      </Collapse>
    );
  }
}

import { connect } from 'dva';
export default connect()(DataCenter);