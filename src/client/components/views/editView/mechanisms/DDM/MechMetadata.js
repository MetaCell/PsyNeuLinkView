import * as React from 'react';
import Box from '@mui/material/Box';
import { withStyles } from '@mui/styles';
import NodeSelection from '../shared/NodeSelection';
import vars from '../../../../../assets/styles/variables';
import { PortTypes } from '@metacell/meta-diagram';
import FunctionInput, {
  CustomValueInput,
  ListSelect,
  MetaDataInput,
} from '../shared/FunctionInput';
import { DDMIcon } from '../shared/Icons';
import debounce from 'lodash.debounce';
import { defaultFilters, toObject } from '../../utils';
import PortsList from '../shared/PortsList';

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <DDMIcon />
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
        />

        <ListSelect
          options={defaultFilters}
          label={optionKeys.standard_output_ports}
          value={optionsValue.standard_output_ports}
          onChange={(e) =>
            handleValueChange({
              key: optionKeys.standard_output_ports,
              value: e.target.value,
            })
          }
        />

        <CustomValueInput
          label={optionKeys.initializer}
          value={optionsValue.initializer}
          onChange={(e) =>
            handleValueChange({
              key: optionKeys.initializer,
              value: e.target.value,
            })
          }
        />
        <CustomValueInput
          label={optionKeys.input_format}
          value={optionsValue.input_format}
          onChange={(e) =>
            handleValueChange({
              key: optionKeys.input_format,
              value: e.target.value,
            })
          }
        />
        <CustomValueInput
          label={optionKeys.stimulus}
          value={optionsValue.stimulus}
          onChange={(e) =>
            handleValueChange({
              key: optionKeys.stimulus,
              value: e.target.value,
            })
          }
        />
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
