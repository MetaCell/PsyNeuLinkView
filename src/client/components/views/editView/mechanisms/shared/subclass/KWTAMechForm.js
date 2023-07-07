import * as React from 'react';
import Box from '@mui/material/Box';
import { handleOptionChange, handleValueChange } from '../../../utils';
import FunctionInput, {
  CustomCheckInput,
  CustomValueInput,
  MatrixInput,
} from '../FunctionInput';
import AddToVisualMenu from '../../../shared/AddToVisualMenu';

function KWTAMechForm(props) {
  const { optionKeys, optionsValue, updateOptions, value, updateValue, updateModelOption } = props;

  return (
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
            updateOptions,
            updateModelOption
          )
        }
        updateModelOption={updateModelOption}
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
  );
}

export default KWTAMechForm;
