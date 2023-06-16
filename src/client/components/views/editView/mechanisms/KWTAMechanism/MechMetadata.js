import * as React from 'react';
import Box from '@mui/material/Box';
import { withStyles } from '@mui/styles';
import NodeSelection from '../shared/NodeSelection';
import vars from '../../../../../assets/styles/variables';
import { PortTypes } from '@metacell/meta-diagram';
import FunctionInput, {
  CustomCheckInput,
  CustomValueInput,
  MatrixInput,
  MetaDataInput,
} from '../shared/FunctionInput';
import { KWTAMechIcon } from '../shared/Icons';
import debounce from 'lodash.debounce';
import {
  debounceUpdateValue,
  handleOptionChange,
  handleValueChange,
  toObject,
} from '../../utils';
import PortsList from '../shared/PortsList';
import AddToVisualMenu from '../../shared/AddToVisualMenu';

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
    classes,
    model,
    model: { options },
    engine,
    changeVisibility,
    onUpdateOptions,
  } = props;

  const [optionsValue, updateOptions] = React.useState(() => options);
  const optionKeys = toObject(Object.entries(options));
  const [value, updateValue] = React.useState(() => ['Composition 2']);

  React.useEffect(() => {
    debounceUpdateValue(optionsValue, onUpdateOptions);
  }, [onUpdateOptions, optionsValue]);

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
        <Box className="icon-wrapper">
          <KWTAMechIcon />
        </Box>

        <Box display="inline-flex" alignItems="center" component="p">
          <MetaDataInput
            textAlign="center"
            value={optionsValue.name}
            onChange={(e) =>
              handleOptionChange(
                { key: optionKeys.name, value: e.target.value },
                updateOptions
              )
            }
          />
        </Box>
      </Box>

      <PortsList
        ports={options.ports}
        portType={PortTypes.INPUT_PORT}
        engine={engine}
        model={model}
      />

      <Box className="seprator" />

      <Box className="block-wrapper">
        <CustomValueInput
          label={optionKeys.k_value}
          value={optionsValue.k_value}
          onChange={(e) =>
            handleOptionChange(
              {
                key: optionKeys.k_value,
                value: e.target.value,
              },
              updateOptions
            )
          }
        />
        <CustomValueInput
          label={optionKeys.threshold}
          value={optionsValue.threshold}
          onChange={(e) =>
            handleOptionChange(
              {
                key: optionKeys.threshold,
                value: e.target.value,
              },
              updateOptions
            )
          }
        />
        <CustomValueInput
          label={optionKeys.ratio}
          value={optionsValue.ratio}
          onChange={(e) =>
            handleOptionChange(
              {
                key: optionKeys.ratio,
                value: e.target.value,
              },
              updateOptions
            )
          }
        />
        <CustomCheckInput
          label={optionKeys.average_based}
          checked={optionsValue.average_based}
          onChange={(e) =>
            handleOptionChange(
              {
                key: optionKeys.average_based,
                value: e.target.checked,
              },
              updateOptions
            )
          }
        />
        <CustomCheckInput
          label={optionKeys.inhibition_only}
          checked={optionsValue.inhibition_only}
          onChange={(e) =>
            handleOptionChange(
              {
                key: optionKeys.inhibition_only,
                value: e.target.checked,
              },
              updateOptions
            )
          }
        />
        <FunctionInput
          label={optionKeys.function}
          value={optionsValue.function}
          onChange={(e) =>
            handleOptionChange(
              {
                key: optionKeys.function,
                value: e.target.value,
              },
              updateOptions
            )
          }
        />
        <MatrixInput
          label={optionKeys.matrix}
          value={optionsValue.matrix}
          onChange={(e) =>
            handleOptionChange(
              {
                key: optionKeys.matrix,
                value: e.target.value,
              },
              updateOptions
            )
          }
        />
        <AddToVisualMenu
          value={value}
          onChange={(id) => handleValueChange(id, value, updateValue)}
        />{' '}
      </Box>

      <Box className="seprator" />

      <PortsList
        ports={options.ports}
        portType={PortTypes.OUTPUT_PORT}
        engine={engine}
        model={model}
        direction="right"
      />
    </Box>
  );
}

export default withStyles(styles)(MechMetadata);
