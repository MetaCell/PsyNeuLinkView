import * as React from 'react';
import Box from '@mui/material/Box';
import { withStyles } from '@mui/styles';
import NodeSelection from './NodeSelection';
import vars from '../../../../../assets/styles/variables';
import { PortTypes } from '@metacell/meta-diagram';
import { MetaDataInput } from './FunctionInput';
import { debounceUpdateValue, handleOptionChange, toObject } from '../../utils';
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
import {useEffect, useRef} from "react";
import ModelSingleton from '../../../../../model/ModelSingleton';
import { useDispatch } from 'react-redux';
import { setModelTree } from '../../../../../redux/actions/general';

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

  const dispatch = useDispatch();
  const [optionsValue, updateOptions] = React.useState(() => options);
  const optionKeys = toObject(Object.entries(options));
  const elementRef = useRef(null);

  const shape = model.getOption('shape');
  const modelHandler = ModelSingleton.getInstance();

  const updateModelOption = (params) => {
    model.setOption(params.key, params.value, true);
  };

  const updateModelLoggable = (params) => {
    model.setLoggable(params.key, params.value, true);
  };


  const formProps = {
    optionKeys,
    optionsValue,
    updateOptions,
    updateModelOption,
    updateModelLoggable
  };

  useEffect(() => {
    debounceUpdateValue(optionsValue, onUpdateOptions);
  }, [onUpdateOptions, optionsValue]);

  useEffect(() => {
    const { current: parentElement } = elementRef;

    if (parentElement && parentElement.parentElement) {
      parentElement.parentElement.style.clipPath = '';
      parentElement.parentElement.style.zIndex = 10000;
    }
  }, [elementRef]);

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
    <Box ref={elementRef} className={`primary-node rounded ${options.variant}`}>
      {options.selected && (
        <NodeSelection
          node={model}
          engine={engine}
          text={'Hide properties'}
          changeVisibility={changeVisibility}
        />
      )}
      <Box className="primary-node_header">
        <Box className="icon-wrapper">{getIconFromType(shape)}</Box>{' '}
        <Box display="inline-flex" alignItems="center" component="p">
          <MetaDataInput
            textAlign="center"
            value={optionsValue.name}
            onChange={(e) => {
              handleOptionChange(
                {
                  key: optionKeys.name,
                  value: e.target.value,
                },
                updateOptions,
                updateModelOption
              );
              modelHandler.updateTreeModel();
              dispatch(setModelTree(modelHandler.getTreeModel()));
            }}
          />
        </Box>
      </Box>

      <PortsList
        ports={optionsValue.ports}
        portType={PortTypes.OUTPUT_PORT}
        engine={engine}
        model={model}
        direction="right"
        handleValueChange={(param) => handleOptionChange(param, updateOptions, updateModelOption)}
      />

      <Box className="separator" />
      <>{getFormByNodeType()}</>
      <Box className="separator" />
      <PortsList
        ports={optionsValue.ports}
        portType={PortTypes.INPUT_PORT}
        engine={engine}
        model={model}
        handleValueChange={(param) => handleOptionChange(param, updateOptions, updateModelOption)}
      />
    </Box>
  );
}

export default withStyles(styles)(MechMetadata);
