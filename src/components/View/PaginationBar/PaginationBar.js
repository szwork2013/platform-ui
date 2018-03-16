import { Menu, Dropdown, Icon, Button, Modal, message } from 'antd';

import service from 'service';

//引入样式组件
import {
  StyledPaginationBarDiv,
  StyledPagination,
  StyledReloadButton,
  theme,
} from './styled';

//列表组件
const PaginationBar = (props) => {
  //解构参数
  const {
    modelName, //模型名称，Layout注入
    uid, //多个视图使用一个模型时使用
    paginationBar, //翻页器参数
    model,
    dispatch,
  } = props;

  //获取数据
  if (!model) return null;
  let page = model.page;

  if (!page) return null;

  //显示构件UI
  return (
    <StyledPaginationBarDiv key={modelName+'PaginationDiv'}>{/*列表div*/}
      {/*刷新按钮*/}
      {
        paginationBar.reloadButton != false &&
        <StyledReloadButton key={modelName+'ReloadButton'} icon='reload'
          onClick = {(page) => handlePageChange(page.number)}
        >刷新</StyledReloadButton>
      }

      {/*翻页器*/}
      {
        paginationBar.pagination != false &&
        <StyledPagination key={modelName+'Pagination'}
          onChange={ (page) => handlePageChange(page-1)}
          total={page.totalElements}
          pageSize={page.size}
          showTotal={(total)=>(`共 ${total} 条`)}
          showQuickJumper
          current={page.number+1}
          {...(paginationBar.controlProps)}
        />
      }
    </StyledPaginationBarDiv>
  );

  //处理当前页发生变化事件
  function handlePageChange(page) {
    dispatch({type:`${modelName}/query`,
      payload:{
        page: page,
        dataKey:uid,
      }
    })
  }
}

import PropTypes from 'prop-types';
PaginationBar.propTypes = {
  paginationBar: PropTypes.object.isRequired,
  modelName: PropTypes.string.isRequired,
  model: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default PaginationBar;