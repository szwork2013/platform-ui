import React from 'react';
import OptionsForm from './SearchBar';
import ListView from './View';
import modelDefinition from './model';
import {connect} from 'dva';

const modelName = modelDefinition.namespace;

class AnalyseCompany extends React.Component {
  componentWillMount() {
    const {dispatch,} = this.props;
  }
  render() {
    return (
      <div>
        <OptionsForm/>
        <ListView/>
      </div>
    )
  }
}

export default connect(({itemrealdata, loading, apptabs: {tabs}}) =>
  ({itemrealdata, loading: loading.models[modelName], tabs})
)(AnalyseCompany);
