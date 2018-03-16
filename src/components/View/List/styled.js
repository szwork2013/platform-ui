import styled from 'styled-components';
import { Pagination, Table, Menu, Button, Dropdown } from 'antd';

import {
	View
} from 'components';

import PaginationBar from '../PaginationBar';

//皮肤定义
const theme = {
	contentHeight: 500,
	fontSize: 14,
	table : {
		height: () => {
			let height = theme.contentHeight;
			height -= View.theme.hasActionBar? View.ActionBar.theme.totalHeight() : 0;
			height -= View.theme.hasPaginationBar? PaginationBar.theme.totalHeight() : 0;

			return height-2;
		},
		header: {
			height: 20,
			padding: 6,
			totalHeight: () => theme.table.header.height+theme.table.header.padding*2,
		},
		row: {
			padding: 1,
			totalHeight: () => theme.row.height+theme.row.padding*2,
		}
	},

	columnActionMenu: {
		width: 80,
	},
}

const StyledTable = styled(Table)`
 // sgf add 2018-03-06 处理拖动的样式
  tr.drop-over-downward td {
    border-bottom: 2px dashed #1890ff;
  }
  
  tr.drop-over-upward td {
    border-top: 2px dashed #1890ff;
  }
  //end
  
	height: ${theme.table.height}px;

  // sgf add 2018-2-27 处理固定列对不齐
  .ant-table-row {
   height:32px !important;
   td {
   height:32px !important;
   }
  }
  //end
  
  a {
    color: #333;
  }

	//调整标题条高度
	.ant-table-middle .ant-table-thead > tr > th {
		padding: ${theme.table.header.padding}px;
		text-align: center;
		background-color: #ecf6fd;
		color: #108ee9;
		font-weight: bold;
	}

	/* //操作列样式
	.ant-table-fixed {
		th {
		  border-bottom: 1px solid #f4f4f4;
		  transition: all .3s;
		}
	}
	*/


	//调整表格行的间距
	.ant-table-tbody > tr > td {
		padding: ${theme.table.row.padding}px !important;
		// border-right:solid 1px #108ee9 !important;  //zyk 2017-12-21 加表格右边线
		// border-top:solid 1px #108ee9 !important;    //zyk 2017-12-21 加表格左边线
		font-size:14px                            //zyk 2017-12-21 调整大小为12px 原为14px
	}

	//调整表格行的间距



	//调整勾选列宽度
	.ant-table-selection-column {
		min-width: 36px !important;
		width: 36px !important;
	}

`;

const StyledMenu = styled(Menu)`
	 width: ${theme.columnActionMenu.width}px;
	 li {
	 	font-size: ${theme.fontSize}px;
	 	text-align: center;
	 }
`;

const StyledDropdown = styled(Dropdown)`

`;

export {
  StyledMenu,
  StyledTable,
  StyledDropdown,
  theme,
}
