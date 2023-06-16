import * as React from 'react';
import Box from '@mui/material/Box';
import { withStyles } from '@mui/styles';
import NodeSelection from '../shared/NodeSelection';
import vars from '../../../../../assets/styles/variables';
import { PortTypes } from '@metacell/meta-diagram';
import FunctionInput, {
  CustomCheckInput,
  CustomValueInput,
  MetaDataInput,
} from '../shared/FunctionInput';
import { RecurrentTransferMechIcon } from '../shared/Icons';
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
          <RecurrentTransferMechIcon />
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
        <CustomValueInput
          label={optionKeys.auto}
          value={optionsValue.auto}
          onChange={(e) =>
            handleOptionChange(
              {
                key: optionKeys.auto,
                value: e.target.value,
              },
              updateOptions
            )
          }
        />
        <CustomValueInput
          label={optionKeys.hetero}
          value={optionsValue.hetero}
          onChange={(e) =>
            handleOptionChange(
              {
                key: optionKeys.hetero,
                value: e.target.value,
              },
              updateOptions
            )
          }
        />
        <CustomCheckInput
          label={optionKeys.has_recurrent_input_port}
          checked={optionsValue.has_recurrent_input_port}
          onChange={(e) =>
            handleOptionChange(
              {
                key: optionKeys.has_recurrent_input_port,
                value: e.target.checked,
              },
              updateOptions
            )
          }
        />
        <FunctionInput
          label={optionKeys.combination_function}
          value={optionsValue.combination_function}
          onChange={(e) =>
            handleOptionChange(
              {
                key: optionKeys.combination_function,
                value: e.target.value,
              },
              updateOptions
            )
          }
        />
        <CustomCheckInput
          label={optionKeys.enable_learning}
          checked={optionsValue.enable_learning}
          onChange={(e) =>
            handleOptionChange(
              {
                key: optionKeys.enable_learning,
                value: e.target.checked,
              },
              updateOptions
            )
          }
        />
        <CustomCheckInput
          label={optionKeys.learning_rate}
          checked={optionsValue.learning_rate}
          onChange={(e) =>
            handleOptionChange(
              {
                key: optionKeys.learning_rate,
                value: e.target.checked,
              },
              updateOptions
            )
          }
        />
        <FunctionInput
          label={optionKeys.learning_function}
          value={optionsValue.learning_function}
          onChange={(e) =>
            handleOptionChange(
              {
                key: optionKeys.learning_function,
                value: e.target.value,
              },
              updateOptions
            )
          }
        />
        <CustomCheckInput
          label={optionKeys.learning_enabled}
          checked={optionsValue.learning_enabled}
          onChange={(e) =>
            handleOptionChange(
              {
                key: optionKeys.learning_enabled,
                value: e.target.checked,
              },
              updateOptions
            )
          }
        />
        <CustomValueInput
          label={optionKeys.integration_rate}
          value={optionsValue.integration_rate}
          onChange={(e) =>
            handleOptionChange(
              {
                key: optionKeys.integration_rate,
                value: e.target.value,
              },
              updateOptions
            )
          }
        />
        <CustomValueInput
          label={optionKeys.noise}
          value={optionsValue.noise}
          onChange={(e) =>
            handleOptionChange(
              {
                key: optionKeys.noise,
                value: e.target.value,
              },
              updateOptions
            )
          }
        />
        <CustomValueInput
          label={optionKeys.smoothing_factor}
          value={optionsValue.smoothing_factor}
          onChange={(e) =>
            handleOptionChange(
              {
                key: optionKeys.smoothing_factor,
                value: e.target.value,
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
