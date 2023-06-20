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
  MatrixInput,
} from '../FunctionInput';
import AddToVisualMenu from '../../../shared/AddToVisualMenu';

function ControlMechForm(props) {
  const { optionKeys, optionsValue, updateOptions, value, updateValue } = props;

  return (
    <Box className="block-wrapper">
      <ListSelect
        options={defaultFilters}
        label={optionKeys.monitor_for_control}
        value={optionsValue.monitor_for_control}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.monitor_for_control,
              value: e.target.value,
            },
            updateOptions
          )
        }
      />
      <ListSelect
        options={defaultFilters}
        label={optionKeys.objective_mechanism}
        value={optionsValue.objective_mechanism}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.objective_mechanism,
              value: e.target.value,
            },
            updateOptions
          )
        }
      />
      <CustomCheckInput
        label={optionKeys.allow_probes}
        checked={optionsValue.allow_probes}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.allow_probes,
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
      <CustomValueInput
        label={optionKeys.default_allocation}
        value={optionsValue.default_allocation}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.default_allocation,
              value: e.target.value,
            },
            updateOptions
          )
        }
        minWidth="100%"
      />
      <CustomValueInput
        label={optionKeys.modulation}
        value={optionsValue.modulation}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.modulation,
              value: e.target.value,
            },
            updateOptions
          )
        }
        minWidth="100%"
      />
      <ListSelect
        options={defaultFilters}
        label={optionKeys.control}
        value={optionsValue.control}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.control,
              value: e.target.value,
            },
            updateOptions
          )
        }
      />
      <FunctionInput
        label={optionKeys.combine_costs}
        value={optionsValue.combine_costs}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.combine_costs,
              value: e.target.value,
            },
            updateOptions
          )
        }
      />
      <FunctionInput
        label={optionKeys.compute_reconfiguration_cost}
        value={optionsValue.compute_reconfiguration_cost}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.compute_reconfiguration_cost,
              value: e.target.value,
            },
            updateOptions
          )
        }
      />{' '}
      <FunctionInput
        label={optionKeys.compute_net_outcome}
        value={optionsValue.compute_net_outcome}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.compute_net_outcome,
              value: e.target.value,
            },
            updateOptions
          )
        }
      />
      <MatrixInput
        label={optionKeys.reconfiguration_cost}
        value={optionsValue.reconfiguration_cost}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.reconfiguration_cost,
              value: e.target.value,
            },
            updateOptions
          )
        }
      />
      <ListSelect
        options={defaultFilters}
        label={optionKeys.costs}
        value={optionsValue.costs}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.costs,
              value: e.target.value,
            },
            updateOptions
          )
        }
      />
      <ListSelect
        options={defaultFilters}
        label={optionKeys.combined_costs}
        value={optionsValue.combined_costs}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.combined_costs,
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
  );
}

export default ControlMechForm;
