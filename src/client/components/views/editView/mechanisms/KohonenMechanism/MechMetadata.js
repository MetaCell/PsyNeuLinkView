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
import { KohonenMechIcon } from '../shared/Icons';
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
          <KohonenMechIcon />
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
        <FunctionInput
          label={optionKeys.selection_function}
          value={optionsValue.selection_function}
          onChange={(e) =>
            handleOptionChange(
              {
                key: optionKeys.selection_function,
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
        <CustomValueInput
          label={optionKeys.learning_rate}
          value={optionsValue.learning_rate}
          onChange={(e) =>
            handleOptionChange(
              {
                key: optionKeys.learning_rate,
                value: e.target.value,
              },
              updateOptions
            )
          }
          minWidth="100%"
        />
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
          minWidth="100%"
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
        <FunctionInput
          label={optionKeys.distance_function}
          value={optionsValue.distance_function}
          onChange={(e) =>
            handleOptionChange(
              {
                key: optionKeys.distance_function,
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
