import model from './model';
import AppTabs from './AppTabs';
import service from './service';
import { theme } from './styled';

AppTabs.service = service;
AppTabs.theme = theme;

export default AppTabs;

//注册模型
import {modelRegister} from 'utils';
modelRegister(model);