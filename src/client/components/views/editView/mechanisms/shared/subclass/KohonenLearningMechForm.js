import * as React from 'react';
import Box from '@mui/material/Box';
import { handleOptionChange } from '../../../utils';
import FunctionInput, { CustomValueInput } from '../FunctionInput';
import AddToVisualMenu from '../../../shared/AddToVisualMenu';
import { PNLLoggables } from '../../../../../../../constants';

function KohonenLearningMechForm(props) {
  const { optionKeys, optionsValue, updateOptions, updateModelOption, updateModelLoggable, model } = props;

  return (
    <Box className="block-wrapper">
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
      />
      <CustomValueInput
        model={model}
        label={optionKeys.activity_source}
        value={optionsValue.activity_source}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.activity_source,
              value: e.target.value,
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

export default KohonenLearningMechForm;
