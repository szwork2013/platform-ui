import styled from 'styled-components';

import {Row} from 'antd';

//样式定义
const theme = {
	height: 50,
	imgHeight: 50,
	totalHeight: () => theme.height,
}

const StyledRow = styled(Row)`
	height: ${theme.height}px;
	background: rgb(0,78,161);

	//图片的高度
	img {
		height: ${theme.imgHeight}px;
	}
`;

export {
	StyledRow,
	theme
}
