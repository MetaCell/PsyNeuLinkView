import * as React from 'react';
import Box from '@mui/material/Box';
import {
  defaultFilters,
  handleOptionChange
} from '../../../utils';
import FunctionInput, { CustomValueInput, ListSelect } from '../FunctionInput';
import AddToVisualMenu from '../../../shared/AddToVisualMenu';
import { PNLLoggables } from '../../../../../../../constants';

function GatingMechForm(props) {
  const { optionKeys, optionsValue, updateOptions, updateModelOption, updateModelLoggable, model } = props;

  return (
    <Box className="block-wrapper">
      <ListSelect
        options={defaultFilters}
        label={optionKeys.default_gating_allocation}
        value={optionsValue.default_gating_allocation}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.default_gating_allocation,
              value: e.target.value,
            },
            updateOptions,
            updateModelOption
          )
        }
      />
      <ListSelect
        options={defaultFilters}
        label={optionKeys.monitor_for_gating}
        value={optionsValue.monitor_for_gating}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.monitor_for_gating,
              value: e.target.value,
            },
            updateOptions,
            updateModelOption
          )
        }
      />
      <FunctionInput
        model={model}
        label={optionKeys.function}
        value={optionsValue.function}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.function,
              value: e.target.value,
            },
            updateOptions,
            updateModelOption
          )
        }
        updateModelOption={updateModelOption}
      />
      <CustomValueInput
        model={model}
        label={optionKeys.default_allocation}
        value={optionsValue.default_allocation}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.default_allocation,
              value: e.target.value,
            },
            updateOptions,
            updateModelOption
          )
        }
        minWidth="100%"
      />
      <CustomValueInput
        model={model}
        label={optionKeys.modulation}
        value={optionsValue.modulation}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.modulation,
              value: e.target.value,
            },
            updateOptions,
            updateModelOption
          )
        }
        minWidth="100%"
      />
      <ListSelect
        options={defaultFilters}
        label={optionKeys.gate}
        value={optionsValue.gate}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.gate,
              value: e.target.value,
            },
            updateOptions,
            updateModelOption
          )
        }
      />
      <AddToVisualMenu
        onChange={updateModelLoggable}
        options={optionsValue[PNLLoggables]}
      />{' '}
    </Box>
  );
}

export default GatingMechForm;
