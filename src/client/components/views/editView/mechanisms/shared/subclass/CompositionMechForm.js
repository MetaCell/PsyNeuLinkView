import * as React from 'react';
import Box from '@mui/material/Box';
import FunctionInput from '../FunctionInput';
import { handleOptionChange } from '../../../utils';
import AddToVisualMenu from '../../../shared/AddToVisualMenu';
import { PNLLoggables } from '../../../../../../../constants';
// import { Typography } from '@mui/material';

function CompositionMechForm(props) {
  const { optionKeys, optionsValue, updateOptions, updateModelOption, updateModelLoggable, model } = props;


  return (
    <Box className="block-wrapper">
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
      {/* {functionValues(optionKeys.port_map, optionsValue.port_map)} */}
      {/* {functionValues(optionKeys.composition, optionsValue.composition)} */}
      <AddToVisualMenu
        onChange={updateModelLoggable}
        options={optionsValue[PNLLoggables]}
      />{' '}
    </Box>
  );
}

export default CompositionMechForm;
