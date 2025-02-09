import * as React from 'react';
import Box from '@mui/material/Box';
import { handleOptionChange } from '../../../utils';
import FunctionInput, {
  CustomCheckInput,
  CustomValueInput,
  MatrixInput,
} from '../FunctionInput';
import AddToVisualMenu from '../../../shared/AddToVisualMenu';
import { PNLLoggables } from '../../../../../../../constants';

function KWTAMechForm(props) {
  const { optionKeys, optionsValue, updateOptions, updateModelOption, updateModelLoggable, model } = props;

  return (
    <Box className="block-wrapper">
      <CustomValueInput
        model={model}
        label={optionKeys.k_value}
        value={optionsValue.k_value}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.k_value,
              value: e.target.value,
            },
            updateOptions,
            updateModelOption
          )
        }
      />
      <CustomValueInput
        model={model}
        label={optionKeys.threshold}
        value={optionsValue.threshold}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.threshold,
              value: e.target.value,
            },
            updateOptions,
            updateModelOption
          )
        }
      />
      <CustomValueInput
        model={model}
        label={optionKeys.ratio}
        value={optionsValue.ratio}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.ratio,
              value: e.target.value,
            },
            updateOptions,
            updateModelOption
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
            updateOptions,
            updateModelOption
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
      <MatrixInput
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
      />
      <AddToVisualMenu
        onChange={updateModelLoggable}
        options={optionsValue[PNLLoggables]}
      />{' '}
    </Box>
  );
}

export default KWTAMechForm;
