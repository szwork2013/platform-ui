import React from 'react';

import ActionButtons from './ActionButtons'
import SearchBar from './SearchBar'

//导入styled组件
import {
  StyledActionBarDiv,
} from './styled';

//列表框架
const Layout = (props) => {
	const {
		fulltextFields,
    actionBar,
	} = props;

  return (
    <StyledActionBarDiv {...props}>
      <ActionButtons {...props}/>
      {React.isValidElement(actionBar.customSearchBar)&&
       actionBar.customSearchBar
      }
      {
      	fulltextFields && fulltextFields.length > 0 && actionBar.searchBar!=false&&
      	<SearchBar {...props}/>
      }

    </StyledActionBarDiv>
  )
}

import PropTypes from 'prop-types';

SearchBar.propTypes = {
  fulltextFields: PropTypes.array,
}

export default Layout;
