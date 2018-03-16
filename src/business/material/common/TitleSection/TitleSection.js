import {Col} from 'antd';

import {StyledHeaderDiv} from '../../../styled';

import { Form as FormLayout, FormItem } from 'components';
const FormContainer = FormLayout.FormContainer;
const Form = FormContainer.StyledForm;
const Row = FormContainer.StyledRow;

import service from 'service';
import wfservice from 'wfservice';

const TitleSection = ({
      title
}) => {

  return(
    <div>
      <Row>
        <StyledHeaderDiv>{title}</StyledHeaderDiv>
      </Row>
    </div>
  )
}

export default TitleSection;
