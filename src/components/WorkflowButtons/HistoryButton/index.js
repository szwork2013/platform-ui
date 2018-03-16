import HistoryButton from './HistoryButton';

//样式
import {theme} from './styled';
HistoryButton.theme = theme;

export default HistoryButton;

//注册模型
import model from './model';
import {modelRegister} from 'utils';
modelRegister(model);
