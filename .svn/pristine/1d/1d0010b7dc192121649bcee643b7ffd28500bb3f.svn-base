import {Icon, Popconfirm} from 'antd'
import {config} from 'utils';
import {StyledRightTd, StyledSpan, StyledTable, StyledTd} from './styled'
import service from 'service';
import PropTypes from 'prop-types';
import {connect} from 'dva'

const { api } = config; //取得RESTful api配置信息
const { rootPath } = api; //RESTful请求的根路径

const Component = ( props ) => {
  //解构参数
  const {
    model,
    uid,
    dispatch,
    searchParam,
    disabled,
    showDetail=true,
    setFieldsValue,
  } = props;

  const data = model.data.find(
    r => r.key == uid
  );

  if(!data||!data.list)
    return null;

  //显示UI
  return (
    <StyledTable>
      <tbody>
        {data.list.map((item,index)=>renderRow(item,index))}
      </tbody>
    </StyledTable>
  );

  function renderRow(item,index) {
    let href=rootPath+'/attachments/file?xpnToken='+service.userInfo.token.value+'&entityLink='+
      item.entityLink+'&category='+item.category
       +'&filename='+encodeURIComponent(item.filename);
    let create=service.getRecordLinkAttr(item,'createdBy');
    return (
      <tr key={index}>
        <td>
          <a href={href} target='_blank'>{item.filename}</a>
        </td>
        <StyledTd>
          <a className='poplink' href={href+'&forceDownload=true'} target='_blank'>
            <Icon type='download'/>下载
          </a>
        </StyledTd>
        {!disabled&&<StyledTd >
          <Popconfirm title="确定要删除文件吗?" onConfirm={()=>remove(item)} okText="确定" cancelText="取消">
            <a className='poplink'><Icon type='close-circle-o'/>删除</a>
          </Popconfirm>
        </StyledTd>
        }
        {showDetail &&
        <StyledRightTd>
          <StyledSpan>{create && create.name}</StyledSpan>
          {item.createdTime}
        </StyledRightTd>
        }
      </tr>
    )
  }

  function remove(record) {
    //发消息新增附件
    dispatch({
      type: 'attachments/delete',
      payload: {
        record:record,
        uid,
        searchParam,
        setFieldsValue
      }
    });
  }
}

Component.propTypes = {
  uid: PropTypes.string.isRequired,
  searchParam:PropTypes.object,
  disabled:PropTypes.bool,
  setFieldsValue:PropTypes.func,
}

export default  connect(({attachments}) =>
  ({model: attachments})
)(Component);
