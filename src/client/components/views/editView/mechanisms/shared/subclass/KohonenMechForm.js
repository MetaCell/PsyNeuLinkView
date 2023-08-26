import * as React from 'react';
import Box from '@mui/material/Box';
import { handleOptionChange } from '../../../utils';
import FunctionInput, {
  CustomCheckInput,
  CustomValueInput,
} from '../FunctionInput';
import AddToVisualMenu from '../../../shared/AddToVisualMenu';
import { PNLLoggables } from '../../../../../../../constants';

function KohonenMechForm(props) {
  const { optionKeys, optionsValue, updateOptions, updateModelOption, updateModelLoggable, model } = props;

  return (
    <Box className="block-wrapper">
      <FunctionInput
        model={model}
        label={optionKeys.selection_function}
        value={optionsValue.selection_function}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.selection_function,
              value: e.target.value,
            },
            updateOptions,
            updateModelOption
          )
        }
        updateModelOption={updateModelOption}
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
            updateOptions,
            updateModelOption
          )
        }
      />
      <CustomValueInput
        model={model}
        label={optionKeys.learning_rate}
        value={optionsValue.learning_rate}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.learning_rate,
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
        label={optionKeys.matrix}
        value={optionsValue.matrix}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.matrix,
              value: e.target.value,
            },
            updateOptions,
            updateModelOption
          )
        }
        minWidth="100%"
      />
      <FunctionInput
        model={model}
        label={optionKeys.learning_function}
        value={optionsValue.learning_function}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.learning_function,
              value: e.target.value,
            },
            updateOptions,
            updateModelOption
          )
        }
        updateModelOption={updateModelOption}
      />
      <FunctionInput
        model={model}
        label={optionKeys.distance_function}
        value={optionsValue.distance_function}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.distance_function,
              value: e.target.value,
            },
            updateOptions,
            updateModelOption
          )
        }
        updateModelOption={updateModelOption}
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
      <AddToVisualMenu
        onChange={updateModelLoggable}
        options={optionsValue[PNLLoggables]}
      />{' '}
    </Box>
  );
}

export default KohonenMechForm;
