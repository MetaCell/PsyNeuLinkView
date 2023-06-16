import * as React from 'react';
import Box from '@mui/material/Box';
import { withStyles } from '@mui/styles';
import NodeSelection from '../shared/NodeSelection';
import vars from '../../../../../assets/styles/variables';
import { PortTypes } from '@metacell/meta-diagram';
import FunctionInput, {
  CustomCheckInput,
  CustomValueInput,
  ListSelect,
  MetaDataInput,
} from '../shared/FunctionInput';
import { ControlMechIcon } from '../shared/Icons';
import {
  debounceUpdateValue,
  defaultFilters,
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
          <ControlMechIcon />
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
          label={optionKeys.state_features}
          value={optionsValue.state_features}
          onChange={(e) =>
            handleOptionChange(
              {
                key: optionKeys.state_features,
                value: e.target.value,
              },
              updateOptions
            )
          }
        />
        <CustomValueInput
          label={optionKeys.state_feature_default}
          value={optionsValue.state_feature_default}
          onChange={(e) =>
            handleOptionChange(
              {
                key: optionKeys.state_feature_default,
                value: e.target.value,
              },
              updateOptions
            )
          }
        />
        <CustomValueInput
          label={optionKeys.agent_rep}
          value={optionsValue.agent_rep}
          onChange={(e) =>
            handleOptionChange(
              {
                key: optionKeys.agent_rep,
                value: e.target.value,
              },
              updateOptions
            )
          }
        />
        <CustomValueInput
          label={optionKeys.num_estimates}
          value={optionsValue.num_estimates}
          onChange={(e) =>
            handleOptionChange(
              {
                key: optionKeys.num_estimates,
                value: e.target.value,
              },
              updateOptions
            )
          }
        />
        <CustomValueInput
          label={optionKeys.num_trials_per_estimate}
          value={optionsValue.num_trials_per_estimate}
          onChange={(e) =>
            handleOptionChange(
              {
                key: optionKeys.num_trials_per_estimate,
                value: e.target.value,
              },
              updateOptions
            )
          }
        />
        <CustomValueInput
          label={optionKeys.initial_seed}
          value={optionsValue.initial_seed}
          onChange={(e) =>
            handleOptionChange(
              {
                key: optionKeys.initial_seed,
                value: e.target.value,
              },
              updateOptions
            )
          }
        />
        <FunctionInput
          label={optionKeys.state_feature_function}
          value={optionsValue.state_feature_function}
          onChange={(e) =>
            handleOptionChange(
              {
                key: optionKeys.state_feature_function,
                value: e.target.value,
              },
              updateOptions
            )
          }
        />
        <CustomCheckInput
          label={optionKeys.same_seed_for_all_parameter_combinations}
          checked={optionsValue.same_seed_for_all_parameter_combinations}
          onChange={(e) =>
            handleOptionChange(
              {
                key: optionKeys.same_seed_for_all_parameter_combinations,
                value: e.target.checked,
              },
              updateOptions
            )
          }
        />
        <ListSelect
          options={defaultFilters}
          label={optionKeys.random_variables}
          value={optionsValue.random_variables}
          onChange={(e) =>
            handleOptionChange(
              {
                key: optionKeys.random_variables,
                value: e.target.value,
              },
              updateOptions
            )
          }
        />
        <FunctionInput
          label={optionKeys.search_function}
          value={optionsValue.search_function}
          onChange={(e) =>
            handleOptionChange(
              {
                key: optionKeys.search_function,
                value: e.target.value,
              },
              updateOptions
            )
          }
        />
        <FunctionInput
          label={optionKeys.search_termination_function}
          value={optionsValue.search_termination_function}
          onChange={(e) =>
            handleOptionChange(
              {
                key: optionKeys.search_termination_function,
                value: e.target.value,
              },
              updateOptions
            )
          }
        />
        <ListSelect
          options={defaultFilters}
          label={optionKeys.search_space}
          value={optionsValue.search_space}
          onChange={(e) =>
            handleOptionChange(
              {
                key: optionKeys.search_space,
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
        <CustomCheckInput
          label={optionKeys.search_statefulness}
          checked={optionsValue.search_statefulness}
          onChange={(e) =>
            handleOptionChange(
              {
                key: optionKeys.search_statefulness,
                value: e.target.checked,
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
