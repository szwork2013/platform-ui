import React from 'react';
import {EditIcon, StyledCellDiv, StyledIcon, StyledText, StyledTextArea} from './styled'

const EditTableCell = (props) => {

  const {dispatch, isEdit, record, editValue, onChangeConfirm} = props;

  function onChange(e) {
    let value = e.target.value;
    dispatch({
      type: 'usefulExpression/refresh',
      payload: {
        editValue: value
      },
    })
  }

  function confirm(e) {
    e.preventDefault();
    e.stopPropagation();
    
    if (editValue !== record.content) {
      if (editValue.trim() !== '') {
        onChangeConfirm && onChangeConfirm(editValue);
      }
    }
    dispatch({
      type: 'usefulExpression/refresh',
      payload: {
        editRowKey: null
      },
    })
  }

  function cancel(e) {
    e.preventDefault();
    e.stopPropagation();

    dispatch({
      type: 'usefulExpression/refresh',
      payload: {
        editRowKey: null
      },
    })
  }

  function edit(e) {
    e.preventDefault();
    e.stopPropagation();

    dispatch({
      type: 'usefulExpression/refresh',
      payload: {
        editRowKey: record._links.self.href,
        editValue: record.content,
      },
    })
  }

  function elliptical(str, length) {
    if (str.length <= length) {
      return str;
    } else {
      return str.substr(0,length) + '...'
    }
  }

  return (
    isEdit ?
      <StyledCellDiv>
        <StyledTextArea
          autosize={true}
          value={editValue}
          onChange={(e) => onChange(e)}
          onPressEnter={() => confirm()}
        />
        <StyledIcon
          type="check"
          onClick={(e) => confirm(e)}
        />
        <StyledIcon
          type="close"
          onClick={(e) => cancel(e)}
        />
      </StyledCellDiv>
      :
      <StyledCellDiv>
        <StyledText title={record.content || ''}>
          {record.content ? record.content : ''}
        </StyledText>
        <EditIcon
          type="edit"
          onClick={(e) => edit(e)}
        />
      </StyledCellDiv>
  );
}

export default EditTableCell
