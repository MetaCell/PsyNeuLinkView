import * as React from 'react';
import Box from '@mui/material/Box';
import {
  defaultFilters,
  handleOptionChange,
  handleValueChange,
} from '../../../utils';
import FunctionInput, {
  CustomCheckInput,
  CustomValueInput,
  ListSelect,
} from '../FunctionInput';
import AddToVisualMenu from '../../../shared/AddToVisualMenu';

function OptControlMechForm(props) {
  const { optionKeys, optionsValue, updateOptions, value, updateValue } = props;

  return (
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
  );
}

export default OptControlMechForm;
