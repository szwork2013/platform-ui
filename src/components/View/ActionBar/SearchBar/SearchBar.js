import StyledSearch from './styled';

const SearchBar = ({
  actionBar, //操作条定义，Layout注入
  fulltextFields, //纳入检索的字段名
  searchPlaceholder, //检索的提示信息
  modelName, //模型名称，Layout注入
  onSearch, //检索事件处理
  uid, //多个视图使用一个模型时使用
  preventDefaultOnSearch, //阻止缺省的OnSearch事件处理
  dispatch,
}) => {
  if (!actionBar) return null;

  //如果配置了searchButton，按照searchButton构造
  if (actionBar.searchButton)
    return actionBar.searchButton;

  //构造默认的搜索条
  if (actionBar.search != false) {
    return(
      <StyledSearch onSearch={
          value => handleOnSearch('query', value)
        }
        onChange={(e)=>{
          if (e&&e.target&&e.target.value=='')
            handleOnSearch('query', '')
        }}
        placeholder={searchPlaceholder || '请输入过滤关键字'}
      />
    );
  }

  return null;

  //处理提交查询事件
  function handleOnSearch(msgType, value) {
    let where = constructFullTextSearchWhere(fulltextFields, value);
    const payload = {where, dataKey:uid};

    if (!preventDefaultOnSearch) {
      dispatch({
        type: modelName+'/'+msgType,
        payload: payload
      })
    }

    if (onSearch) {
      onSearch(payload);
    }
  }

  //构造全文检索条件
  function constructFullTextSearchWhere(fields, value, dto='o') {
    if (value=='') return '';
    const valArr = value.trim().split(' ');
    let where = '';
    let valueWhere;
    for (let val of valArr) {
      valueWhere = '';
      for (let field of fields) {
        let fieldWhere = dto+'.'+field.key+' like '+"'%"+val+"%'";
        valueWhere += valueWhere == '' ? fieldWhere : ' or '+fieldWhere;
      }
      valueWhere = '('+valueWhere+')';

      where += where == '' ? valueWhere : ' and '+valueWhere;
    }

    return '('+where+')';
  }
}

import PropTypes from 'prop-types';

SearchBar.propTypes = {
  actionBar: PropTypes.object.isRequired,
  fulltextFields: PropTypes.array.isRequired,
  searchPlaceholder: PropTypes.string,
  modelName: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default SearchBar;