import * as React from 'react';
import Box from '@mui/material/Box';
import { withStyles } from '@mui/styles';
import NodeSelection from '../shared/NodeSelection';
import vars from '../../../../../assets/styles/variables';
import { PortTypes } from '@metacell/meta-diagram';
import FunctionInput, {
  CustomCheckInput,
  CustomValueInput,
  MetaDataInput,
} from '../shared/FunctionInput';
import { TransferMechIcon } from '../shared/Icons';
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
          <TransferMechIcon />
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
          label={optionKeys.noise}
          value={optionsValue.noise}
          onChange={(e) =>
            handleValueChange({
              key: optionKeys.noise,
              value: e.target.value,
            })
          }
        />
        <CustomValueInput
          label={optionKeys.clip}
          value={optionsValue.clip}
          onChange={(e) =>
            handleValueChange({
              key: optionKeys.clip,
              value: e.target.value,
            })
          }
        />
        <CustomValueInput
          label={optionKeys.integration_rate}
          value={optionsValue.integration_rate}
          onChange={(e) =>
            handleValueChange({
              key: optionKeys.integration_rate,
              value: e.target.value,
            })
          }
        />

        <CustomCheckInput
          label={optionKeys.integrator_mode}
          checked={optionsValue.integrator_mode}
          onChange={(e) =>
            handleValueChange({
              key: optionKeys.integrator_mode,
              value: e.target.checked,
            })
          }
        />

        <FunctionInput
          label={optionKeys.integrator_function}
          value={optionsValue.integrator_function}
          onChange={(e) =>
            handleValueChange({
              key: optionKeys.integrator_function,
              value: e.target.value,
            })
          }
        />

        <CustomValueInput
          label={optionKeys.on_resume_integrator_mode}
          value={optionsValue.on_resume_integrator_mode}
          onChange={(e) =>
            handleValueChange({
              key: optionKeys.on_resume_integrator_mode,
              value: e.target.value,
            })
          }
        />
        <CustomValueInput
          label={optionKeys.termination_threshold}
          value={optionsValue.termination_threshold}
          onChange={(e) =>
            handleValueChange({
              key: optionKeys.termination_threshold,
              value: e.target.value,
            })
          }
        />
        <CustomValueInput
          label={optionKeys.termination_comparison_op}
          value={optionsValue.termination_comparison_op}
          onChange={(e) =>
            handleValueChange({
              key: optionKeys.termination_comparison_op,
              value: e.target.value,
            })
          }
        />

        <FunctionInput
          label={optionKeys.termination_measure}
          value={optionsValue.termination_measure}
          onChange={(e) =>
            handleValueChange({
              key: optionKeys.termination_measure,
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
