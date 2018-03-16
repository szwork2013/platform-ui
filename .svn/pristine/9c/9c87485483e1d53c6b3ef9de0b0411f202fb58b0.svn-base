import { Row, Col } from 'antd';

import OptionsForm from './OptionsForm';
import ResultView from './ResultView';

import modelDefinition from '../model';

const HistoryExecutions = ( props ) => {
  const {record} = props;

  //取得模型名称
  const modelName = modelDefinition.namespace;

  return (
    <div>
      <div style={{height:0}} >
        <OptionsForm modelName={modelName} record={record}/>
      </div>
      <div>
        <ResultView
          modelName={modelName}
          record={record}
          heightOffset={-42}
        />
      </div>
    </div>
  )
}

export default HistoryExecutions;
