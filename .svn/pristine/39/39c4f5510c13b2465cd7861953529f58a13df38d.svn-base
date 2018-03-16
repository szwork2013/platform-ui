import React from 'react';
import wfservice from 'wfservice';
import { Form as FormLayout, FormItem } from 'components';
const FormContainer = FormLayout.FormContainer;
const Form = FormContainer.StyledForm;
const Row = FormContainer.StyledRow;


//权限定义表单
class Opinions extends React.Component {

  componentDidMount() {

  }



  render() {
    //解构参数
    let {
      record, //FormContainer注入：模型
      canEdit = true, //FormContainer注入：是否可编辑
      getFieldDecorator,
      setFieldsValue,
      Type,
      planType,
    } = this.props;
    //构造FormItem的公共参数
    const itemProps = {
      canEdit, required: canEdit,
      getFieldDecorator, setFieldsValue,
    };
    const itemWidth = ['96%', '10%', '90%'];
    if ((Type == 'IT_CONSUMABLE') || (Type == 0)) {
      return (
        <div>
          {planType != 1 &&
            <Form layout='inline'>
              <Row>
                <FormItem type='CommentView' {...itemProps} width={itemWidth}
                  commentColumns={wfservice.getCommentColumns(record)}
                />
              </Row>
            </Form>
          }
          {planType == 1 &&
            <Form layout='inline'>
              <Row>
                <FormItem type='CommentView' {...itemProps} width={itemWidth}
                  commentColumns={wfservice.getCommentColumns(record)}
                />
              </Row>
            </Form>
          }
        </div>
      )
    }
    if ((Type == 'OFFICE_EQUIPMENT') || (Type == 1)) {
      return (
        <div>
          {planType != 1 &&
            <Form layout='inline'>
              <Row>
                <FormItem type='CommentView' {...itemProps} width={itemWidth}
                  commentColumns={wfservice.getCommentColumns(record)}
                />
              </Row>
            </Form>
          }
          {planType == 1 &&
            <Form layout='inline'>
              <Row>
                <FormItem type='CommentView' {...itemProps} width={itemWidth}
                  commentColumns={wfservice.getCommentColumns(record)}
                />
              </Row>
            </Form>
          }
        </div>
      )
    }
  }
}
export default Opinions;
