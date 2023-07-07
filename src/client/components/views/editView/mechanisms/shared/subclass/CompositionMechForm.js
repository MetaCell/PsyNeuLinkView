import * as React from 'react';
import Box from '@mui/material/Box';
import { handleOptionChange, handleValueChange } from '../../../utils';
import FunctionInput from '../FunctionInput';
import AddToVisualMenu from '../../../shared/AddToVisualMenu';
import { Typography } from '@mui/material';

function CompositionMechForm(props) {
  const {
    optionKeys,
    optionsValue,
    updateOptions,
    value,
    updateValue,
    classes,
    updateModelOption,
  } = props;

  const functionValues = (label, value) => (
    <Box key={value} className={[classes.block, classes.paddingXS]}>
      <Typography component="label">{label}</Typography>
      <Typography className="function" noWrap>
        {value}
      </Typography>
    </Box>
  );

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
      {functionValues(optionKeys.port_map, optionsValue.port_map)}
      {functionValues(optionKeys.composition, optionsValue.composition)}
      <AddToVisualMenu
        value={value}
        onChange={(id) => handleValueChange(id, value, updateValue)}
      />{' '}
    </Box>
  );
}

export default CompositionMechForm;
