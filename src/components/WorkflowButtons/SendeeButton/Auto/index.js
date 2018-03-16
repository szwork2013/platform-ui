import SendeeAutoButton from './Auto';

import {theme} from '../styled';
SendeeAutoButton.theme = theme;

export default SendeeAutoButton;

//注册模型
import {modelRegister} from 'utils';
import model from './model';
modelRegister(model);
