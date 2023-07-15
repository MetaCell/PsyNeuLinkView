import * as React from 'react';
import Box from '@mui/material/Box';
import { handleOptionChange, handleValueChange } from '../../../utils';
import FunctionInput from '../FunctionInput';
import AddToVisualMenu from '../../../shared/AddToVisualMenu';
import { Typography } from '@mui/material';
import { PNLLoggables } from '../../../../../../../constants';

function CompositionMechForm(props) {
  const { optionKeys, optionsValue, updateOptions, updateModelOption, updateModelLoggable } = props;

  // const functionValues = (label, value) => (
  //   <Box key={value} className={[classes.block, classes.paddingXS]}>
  //     <Typography component="label">{label}</Typography>
  //     <Typography className="function" noWrap>
  //       {value}
  //     </Typography>
  //   </Box>
  // );

  return (
    <Box className="block-wrapper">
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
