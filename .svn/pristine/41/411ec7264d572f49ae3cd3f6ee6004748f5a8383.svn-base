import React from 'react'
import PropTypes from 'prop-types'
import { Col, Icon, Modal,Button } from 'antd'
import SelectedPanel from '../SelectedPanel'
import SelectionPanel from '../SelectionPanel'
import {StyledRow,StyledA} from './styled'

const ExportButton= (props) => {
  const {
    dispatch,
    model,
  } = props
  let modalVisible=model.modalVisible;
  let selectedList=model.selectedList;
  let url=model.url;

  let footerProps={};
  footerProps.footer= <div>{renderCancelButton()}{renderOkButton()}</div>;

  const modalProps = {
    ...footerProps,
    title: <div><Icon type="setting"/>选择导出的扩展列</div>,
    visible: modalVisible,
    maskClosable: false,
    width: '600px',
    wrapClassName: 'vertical-center-modal',
  }


  return (
    <Modal {...modalProps}>
      <StyledRow>
        <Col span={12}>
          <SelectionPanel closeAble={false}/>
        </Col>
        <Col span={12}>
          <SelectedPanel closeAble={true}/>
        </Col>
      </StyledRow>
    </Modal>
  )

  function renderOkButton() {
    let extractColumnKeys='';
    selectedList.forEach((item)=>{
      if(extractColumnKeys=='')
        extractColumnKeys=item.key;
      else extractColumnKeys=extractColumnKeys+';'+item.key;
    })

    url=url+'&extractColumnKeys='+encodeURIComponent(extractColumnKeys);
    //url=url+'&extractColumnKeys=123';
    return (<StyledA href={url} target='_blank'><Button type="primary" onClick={()=>{
      dispatch({
        type: 'exportDialog/hide',
        payload: {
          selectionList: [],
        },
      })}}>确定</Button></StyledA>)
  }

  function renderCancelButton() {
    return (<Button type="primary" onClick={()=>{
      dispatch({
        type: 'exportDialog/hide',
        payload: {
          selectedList: [],
          selectionList: [],
        },
      })}}>取消</Button>)
  }
}

ExportButton.propTypes = {
  callBack: PropTypes.func,
}

import {connect} from 'dva'
export default connect(({exportDialog}) =>
  ({model: exportDialog}))(ExportButton);
