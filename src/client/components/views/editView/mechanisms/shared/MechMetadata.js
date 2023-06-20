import * as React from 'react';
import Box from '@mui/material/Box';
import { withStyles } from '@mui/styles';
import NodeSelection from './NodeSelection';
import vars from '../../../../../assets/styles/variables';
import { PortTypes } from '@metacell/meta-diagram';
import { MetaDataInput } from './FunctionInput';
import {
  debounceUpdateValue,
  handleOptionChange,
  handleValueChange,
  toObject,
} from '../../utils';
import PortsList from './PortsList';
import { getIconFromType } from './helper';
import { PNLMechanisms } from '../../../../../../constants';
import LearningMechForm from './subclass/LearningMechForm';
import ProcessingMechForm from './subclass/ProcessingMechForm';
import ModulatoryMechForm from './subclass/ModulatoryMechForm';
import ContrastiveMechForm from './subclass/ContrastiveMechForm';
import AutoLearningMechForm from './subclass/AutoLearningMechForm';
import PredictionErrorMechForm from './subclass/PredictionErrorMechForm';
import GatingMechForm from './subclass/GatingMechForm';
import ControlMechForm from './subclass/ControlMechForm';
import LCControlMechForm from './subclass/LCControlMechForm';
import AGTControlMechForm from './subclass/AGTControlMechForm';
import OptControlMechForm from './subclass/OptControlMechForm';
import CompositionMechForm from './subclass/CompositionMechForm';
import ObjMechForm from './subclass/IntegratorMechForm';
import TransferMechForm from './subclass/TransferMechForm';
import RecurrentTransferMechForm from './subclass/RecurrentTransferMechForm';
import DDMForm from './subclass/DDMForm';
import KohonenMechForm from './subclass/KohonenMechForm';
import KohonenLearningMechForm from './subclass/KohonenLearningMechForm';
import KWTAMechForm from './subclass/KWTAMechForm';
import LCAMechForm from './subclass/LCAMechForm';

const styles = {
  textColor: {
    color: vars.functionTextColor,
  },
  codeColor: {
    color: vars.functionCodeColor,
  },
};

function MechMetadata(props) {
  const {
    model,
    model: { options },
    engine,
    changeVisibility,
    onUpdateOptions,
  } = props;

  const [optionsValue, updateOptions] = React.useState(() => options);
  const optionKeys = toObject(Object.entries(options));
  const [value, updateValue] = React.useState(() => ['Composition 2']);

  const formProps = {
    optionKeys,
    optionsValue,
    updateOptions,
    value,
    updateValue,
  };

  React.useEffect(() => {
    debounceUpdateValue(optionsValue, onUpdateOptions);
  }, [onUpdateOptions, optionsValue]);

  function getFormByNodeType() {
    switch (model.getOption('shape')) {
      case PNLMechanisms.MECHANISM:
      case PNLMechanisms.PROCESSING_MECH:
      case PNLMechanisms.DEFAULT_PROCESSING_MECH:
      case PNLMechanisms.INTEGRATOR_MECH:
      case PNLMechanisms.EPISODIC_MECH:
      case PNLMechanisms.COMPARATOR_MECH:
        return <ProcessingMechForm {...formProps} />;
      case PNLMechanisms.LEARNING_MECH:
        return <LearningMechForm {...formProps} />;
      case PNLMechanisms.MODULATORY_MECH:
        return <ModulatoryMechForm {...formProps} />;
      case PNLMechanisms.CONTRASTIVE_MECH:
        return <ContrastiveMechForm {...formProps} />;
      case PNLMechanisms.AUTO_LEARNING_MECH:
        return <AutoLearningMechForm {...formProps} />;
      case PNLMechanisms.PREDICTION_ERROR_MECH:
        return <PredictionErrorMechForm {...formProps} />;
      case PNLMechanisms.GATING_MECH:
        return <GatingMechForm {...formProps} />;
      case PNLMechanisms.CTRL_MECH:
        return <ControlMechForm {...formProps} />;
      case PNLMechanisms.LC_CTRL_MECH:
        return <LCControlMechForm {...formProps} />;
      case PNLMechanisms.AGT_CTRL_MECH:
        return <AGTControlMechForm {...formProps} />;
      case PNLMechanisms.OPT_CTRL_MECH:
        return <OptControlMechForm {...formProps} />;
      case PNLMechanisms.COMPOSITION_MECH:
        return <CompositionMechForm {...formProps} />;
      case PNLMechanisms.OBJ_MECH:
        return <ObjMechForm {...formProps} />;
      case PNLMechanisms.TRANSFER_MECH:
        return <TransferMechForm {...formProps} />;
      case PNLMechanisms.RECURRENT_TRANSFER_MECH:
        return <RecurrentTransferMechForm {...formProps} />;
      case PNLMechanisms.DDM:
        return <DDMForm {...formProps} />;
      case PNLMechanisms.KOHONEN_MECH:
        return <KohonenMechForm {...formProps} />;
      case PNLMechanisms.KOHONEN_LEARNING_MECH:
        return <KohonenLearningMechForm {...formProps} />;
      case PNLMechanisms.KWTA_MECH:
        return <KWTAMechForm {...formProps} />;
      case PNLMechanisms.LCA_MECH:
        return <LCAMechForm {...formProps} />;
      default:
        return null;
    }
  }

  return (
    <Box className={`primary-node rounded ${options.variant}`}>
      {options.selected && (
        <NodeSelection
          node={model}
          engine={engine}
          text={'Hide properties'}
          changeVisibility={changeVisibility}
        />
      )}
      <Box className="primary-node_header">
        <Box className="icon-wrapper">{getIconFromType(model)}</Box>{' '}
        <Box display="inline-flex" alignItems="center" component="p">
          <MetaDataInput
            textAlign="center"
            value={optionsValue.name}
            onChange={(e) =>
              handleOptionChange({
                key: optionKeys.name,
                value: e.target.value,
              })
            }
          />
        </Box>
      </Box>

      <PortsList
        ports={optionsValue.ports}
        portType={PortTypes.OUTPUT_PORT}
        engine={engine}
        model={model}
        direction="right"
        handleValueChange={handleValueChange}
      />

      <Box className="seprator" />
      <>{getFormByNodeType()}</>
      <Box className="seprator" />
      <Box className="seprator" />

      <PortsList
        ports={optionsValue.ports}
        portType={PortTypes.INPUT_PORT}
        engine={engine}
        model={model}
        handleValueChange={handleValueChange}
      />
    </Box>
  );
}

export default withStyles(styles)(MechMetadata);
