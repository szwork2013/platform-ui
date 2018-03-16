import React from 'react';
import OptionsForm from './OptionsForm';
import ListView from './View';
import modelDefinition from './model';
import {connect} from 'dva';

const modelName = modelDefinition.namespace;

class MyItemRealData extends React.Component {

  render() {
    return (
      <div>
        <OptionsForm/>
        <ListView/>
      </div>
    )
  }
}

export default connect(({budget_itemrealdata, loading, apptabs: {tabs}}) =>
  ({budget_itemrealdata, loading: loading.models[modelName], tabs})
)(MyItemRealData);
