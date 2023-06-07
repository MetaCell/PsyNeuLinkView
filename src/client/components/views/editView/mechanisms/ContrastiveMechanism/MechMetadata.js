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
import { MechIcon } from '../shared/Icons';
import debounce from 'lodash.debounce';
import { toObject } from '../../utils';
import PortsList from '../shared/PortsList';

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
    updateOptions,
  } = props;

  const [optionsValue, setOptions] = React.useState(() => options);
  const optionKeys = toObject(Object.entries(options));

  const handleValueChange = ({ key, value }) => {
    setOptions((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // debounce search term
  const debounceFn = React.useCallback(
    debounce((value) => {
      if (updateOptions) {
        updateOptions(value);
      }
    }, 800),
    []
  );

  React.useEffect(() => {
    debounceFn(optionsValue);
  }, [debounceFn, optionsValue]);

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
          <MechIcon />
        </Box>

        <Box display="inline-flex" alignItems="center" component="p">
          <MetaDataInput
            textAlign="center"
            value={optionsValue.name}
            onChange={(e) =>
              handleValueChange({ key: optionKeys.name, value: e.target.value })
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
          label={optionKeys.variable}
          value={optionsValue.variable}
          onChange={(e) =>
            handleValueChange({
              key: optionKeys.variable,
              value: e.target.value,
            })
          }
        />
        <CustomValueInput
          label={optionKeys.input_size}
          value={optionsValue.input_size}
          onChange={(e) =>
            handleValueChange({
              key: optionKeys.input_size,
              value: e.target.value,
            })
          }
        />
        <CustomValueInput
          label={optionKeys.hidden_size}
          value={optionsValue.hidden_size}
          onChange={(e) =>
            handleValueChange({
              key: optionKeys.hidden_size,
              value: e.target.value,
            })
          }
        />
        <CustomValueInput
          label={optionKeys.target_size}
          value={optionsValue.target_size}
          onChange={(e) =>
            handleValueChange({
              key: optionKeys.target_size,
              value: e.target.value,
            })
          }
        />

        <CustomValueInput
          label={optionKeys.mode}
          value={optionsValue.mode}
          onChange={(e) =>
            handleValueChange({
              key: optionKeys.mode,
              value: e.target.value,
            })
          }
        />
        <CustomValueInput
          label={optionKeys.clamp}
          value={optionsValue.clamp}
          onChange={(e) =>
            handleValueChange({
              key: optionKeys.clamp,
              value: e.target.value,
            })
          }
        />

        <CustomCheckInput
          label={optionKeys.separated}
          checked={optionsValue.separated}
          onChange={(e) =>
            handleValueChange({
              key: optionKeys.separated,
              value: e.target.checked,
            })
          }
        />
        <FunctionInput
          label={optionKeys.combination_function}
          value={optionsValue.combination_function}
          onChange={(e) =>
            handleValueChange({
              key: optionKeys.combination_function,
              value: e.target.value,
            })
          }
        />

        <CustomCheckInput
          label={optionKeys.continuous}
          checked={optionsValue.continuous}
          onChange={(e) =>
            handleValueChange({
              key: optionKeys.continuous,
              value: e.target.checked,
            })
          }
        />

        <CustomValueInput
          label={optionKeys.minus_phase_termination_condition}
          value={optionsValue.minus_phase_termination_condition}
          onChange={(e) =>
            handleValueChange({
              key: optionKeys.minus_phase_termination_condition,
              value: e.target.value,
            })
          }
        />
        <CustomValueInput
          label={optionKeys.minus_phase_termination_threshold}
          value={optionsValue.minus_phase_termination_threshold}
          onChange={(e) =>
            handleValueChange({
              key: optionKeys.minus_phase_termination_threshold,
              value: e.target.value,
            })
          }
        />
        <CustomValueInput
          label={optionKeys.plus_phase_termination_condition}
          value={optionsValue.plus_phase_termination_condition}
          onChange={(e) =>
            handleValueChange({
              key: optionKeys.plus_phase_termination_condition,
              value: e.target.value,
            })
          }
        />
        <CustomValueInput
          label={optionKeys.plus_phase_termination_threshold}
          value={optionsValue.plus_phase_termination_threshold}
          onChange={(e) =>
            handleValueChange({
              key: optionKeys.plus_phase_termination_threshold,
              value: e.target.value,
            })
          }
          minWidth="100%"
        />
        <CustomValueInput
          label={optionKeys.max_passes}
          value={optionsValue.max_passes}
          onChange={(e) =>
            handleValueChange({
              key: optionKeys.max_passes,
              value: e.target.value,
            })
          }
          minWidth="100%"
        />

        <FunctionInput
          label={optionKeys.phase_convergence_function}
          value={optionsValue.phase_convergence_function}
          onChange={(e) =>
            handleValueChange({
              key: optionKeys.phase_convergence_function,
              value: e.target.value,
            })
          }
        />

        <FunctionInput
          label={optionKeys.learning_function}
          value={optionsValue.learning_function}
          onChange={(e) =>
            handleValueChange({
              key: optionKeys.learning_function,
              value: e.target.value,
            })
          }
        />
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
