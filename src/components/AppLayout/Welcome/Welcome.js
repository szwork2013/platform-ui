import service from 'service';

import {StyledDiv} from './styled';

//欢迎信息
const Welcome = (props) => {
	let name = service.userInfo.user.name;
	let orgName = service.userInfo.user.orgFullName.split('/')[0];
  return (
    <StyledDiv>  
      欢迎您：{orgName+' '+name}  
    </StyledDiv>
  );
}

export default Welcome;
