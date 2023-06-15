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
import debounce from 'lodash.debounce';
import { defaultFilters, toObject } from '../../utils';
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <ControlMechIcon />
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
          label={optionKeys.state_features}
          value={optionsValue.state_features}
          onChange={(e) =>
            handleValueChange({
              key: optionKeys.state_features,
              value: e.target.value,
            })
          }
        />
        <CustomValueInput
          label={optionKeys.state_feature_default}
          value={optionsValue.state_feature_default}
          onChange={(e) =>
            handleValueChange({
              key: optionKeys.state_feature_default,
              value: e.target.value,
            })
          }
        />
        <CustomValueInput
          label={optionKeys.agent_rep}
          value={optionsValue.agent_rep}
          onChange={(e) =>
            handleValueChange({
              key: optionKeys.agent_rep,
              value: e.target.value,
            })
          }
        />
        <CustomValueInput
          label={optionKeys.num_estimates}
          value={optionsValue.num_estimates}
          onChange={(e) =>
            handleValueChange({
              key: optionKeys.num_estimates,
              value: e.target.value,
            })
          }
        />

        <CustomValueInput
          label={optionKeys.num_trials_per_estimate}
          value={optionsValue.num_trials_per_estimate}
          onChange={(e) =>
            handleValueChange({
              key: optionKeys.num_trials_per_estimate,
              value: e.target.value,
            })
          }
        />

        <CustomValueInput
          label={optionKeys.initial_seed}
          value={optionsValue.initial_seed}
          onChange={(e) =>
            handleValueChange({
              key: optionKeys.initial_seed,
              value: e.target.value,
            })
          }
        />

        <FunctionInput
          label={optionKeys.state_feature_function}
          value={optionsValue.state_feature_function}
          onChange={(e) =>
            handleValueChange({
              key: optionKeys.state_feature_function,
              value: e.target.value,
            })
          }
        />
        <CustomCheckInput
          label={optionKeys.same_seed_for_all_parameter_combinations}
          checked={optionsValue.same_seed_for_all_parameter_combinations}
          onChange={(e) =>
            handleValueChange({
              key: optionKeys.same_seed_for_all_parameter_combinations,
              value: e.target.checked,
            })
          }
        />

        <ListSelect
          options={defaultFilters}
          label={optionKeys.random_variables}
          value={optionsValue.random_variables}
          onChange={(e) =>
            handleValueChange({
              key: optionKeys.random_variables,
              value: e.target.value,
            })
          }
        />

        <FunctionInput
          label={optionKeys.search_function}
          value={optionsValue.search_function}
          onChange={(e) =>
            handleValueChange({
              key: optionKeys.search_function,
              value: e.target.value,
            })
          }
        />
        <FunctionInput
          label={optionKeys.search_termination_function}
          value={optionsValue.search_termination_function}
          onChange={(e) =>
            handleValueChange({
              key: optionKeys.search_termination_function,
              value: e.target.value,
            })
          }
        />

        <ListSelect
          options={defaultFilters}
          label={optionKeys.search_space}
          value={optionsValue.search_space}
          onChange={(e) =>
            handleValueChange({
              key: optionKeys.search_space,
              value: e.target.value,
            })
          }
        />

        <FunctionInput
          label={optionKeys.function}
          value={optionsValue.function}
          onChange={(e) =>
            handleValueChange({
              key: optionKeys.function,
              value: e.target.value,
            })
          }
        />

        <CustomCheckInput
          label={optionKeys.search_statefulness}
          checked={optionsValue.search_statefulness}
          onChange={(e) =>
            handleValueChange({
              key: optionKeys.search_statefulness,
              value: e.target.checked,
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
