import * as React from 'react';
import Box from '@mui/material/Box';
import { withStyles } from '@mui/styles';
import NodeSelection from '../shared/NodeSelection';
import vars from '../../../../../assets/styles/variables';
import { PortTypes } from '@metacell/meta-diagram';
import FunctionInput, {
  CustomCheckInput,
  CustomValueInput,
  MatrixInput,
  MetaDataInput,
} from '../shared/FunctionInput';
import { KWTAMechIcon } from '../shared/Icons';
import debounce from 'lodash.debounce';
import { toObject } from '../../utils';
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
          <KWTAMechIcon />
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
        <CustomValueInput
          label={optionKeys.k_value}
          value={optionsValue.k_value}
          onChange={(e) =>
            handleValueChange({
              key: optionKeys.k_value,
              value: e.target.value,
            })
          }
        />
        <CustomValueInput
          label={optionKeys.threshold}
          value={optionsValue.threshold}
          onChange={(e) =>
            handleValueChange({
              key: optionKeys.threshold,
              value: e.target.value,
            })
          }
        />
        <CustomValueInput
          label={optionKeys.ratio}
          value={optionsValue.ratio}
          onChange={(e) =>
            handleValueChange({
              key: optionKeys.ratio,
              value: e.target.value,
            })
          }
        />
        <CustomCheckInput
          label={optionKeys.average_based}
          checked={optionsValue.average_based}
          onChange={(e) =>
            handleValueChange({
              key: optionKeys.average_based,
              value: e.target.checked,
            })
          }
        />
        <CustomCheckInput
          label={optionKeys.inhibition_only}
          checked={optionsValue.inhibition_only}
          onChange={(e) =>
            handleValueChange({
              key: optionKeys.inhibition_only,
              value: e.target.checked,
            })
          }
        />
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
        <MatrixInput
          label={optionKeys.matrix}
          value={optionsValue.matrix}
          onChange={(e) =>
            handleValueChange({
              key: optionKeys.matrix,
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
