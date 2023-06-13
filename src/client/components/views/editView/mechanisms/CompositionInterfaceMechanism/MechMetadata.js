import * as React from 'react';
import Box from '@mui/material/Box';
import { withStyles } from '@mui/styles';
import NodeSelection from '../shared/NodeSelection';
import vars from '../../../../../assets/styles/variables';
import { PortTypes } from '@metacell/meta-diagram';
import FunctionInput, { MetaDataInput } from '../shared/FunctionInput';
import { CompositionIcon } from '../shared/Icons';
import debounce from 'lodash.debounce';
import { toObject } from '../../utils';
import PortsList from '../shared/PortsList';
import { Typography } from '@mui/material';

const styles = {
  textColor: {
    color: vars.functionTextColor,
  },
  codeColor: {
    color: vars.functionCodeColor,
  },
};

function MechMetadata(props) {
  const {
    classes,
    model,
    model: { options },
    engine,
    changeVisibility,
    updateOptions,
  } = props;

  const [optionsValue, setOptions] = React.useState(() => options);
  const optionKeys = toObject(Object.entries(options));

  const handleValueChange = ({ key, value }) => {
    setOptions((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // debounce search term
  const debounceFn = React.useCallback(
    debounce((value) => {
      if (updateOptions) {
        updateOptions(value);
      }
    }, 800),
    []
  );

  React.useEffect(() => {
    debounceFn(optionsValue);
  }, [debounceFn, optionsValue]);

  const functionValues = (label, value) => (
    <Box key={value} className={[classes.block, classes.paddingXS]}>
      <Typography component="label">{label}</Typography>
      <Typography className="function" noWrap>
        {value}
      </Typography>
    </Box>
  );

  return (
    <Box className={`primary-node rounded ${options.variant}`}>
      {options.selected && (
        <NodeSelection
          node={model}
          engine={engine}
          text={'Hide properties'}
          changeVisibility={changeVisibility}
        />
      )}
      <Box className="primary-node_header">
        <Box className="icon-wrapper">
          <CompositionIcon />
        </Box>

        <Box display="inline-flex" alignItems="center" component="p">
          <MetaDataInput
            textAlign="center"
            value={optionsValue.name}
            onChange={(e) =>
              handleValueChange({ key: optionKeys.name, value: e.target.value })
            }
          />
        </Box>
      </Box>

      <PortsList
        ports={options.ports}
        portType={PortTypes.INPUT_PORT}
        engine={engine}
        model={model}
      />

      <Box className="seprator" />

      <Box className="block-wrapper">
        <FunctionInput
          label={optionKeys.function}
          value={optionsValue.function}
          onChange={(e) =>
            handleValueChange({
              key: optionKeys.function,
              value: e.target.value,
            })
          }
          disabled
        />
        {functionValues(optionKeys.port_map, optionsValue.port_map)}
        {functionValues(optionKeys.composition, optionsValue.composition)}
      </Box>

      <Box className="seprator" />

      <PortsList
        ports={options.ports}
        portType={PortTypes.OUTPUT_PORT}
        engine={engine}
        model={model}
        direction="right"
      />
    </Box>
  );
}

export default withStyles(styles)(MechMetadata);
