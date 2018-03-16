import dynamic from 'dva/dynamic';
const Form = dynamic({
  app,
  component: () => import('./Form')
});

export default Form;
