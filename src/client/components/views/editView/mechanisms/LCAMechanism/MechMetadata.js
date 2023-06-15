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
import { LCAMechIcon } from '../shared/Icons';
import debounce from 'lodash.debounce';
import { toObject } from '../../utils';
import PortsList from '../shared/PortsList';
import AddToVisualMenu from '../../shared/AddToVisualMenu';

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
  const [value, setValue] = React.useState(() => ['Composition 2']);

  const handleMenuValueChange = (id) => {
    let newValue = [...value];

    if (newValue.includes(id)) {
      newValue.splice(newValue.indexOf(id), 1);
    } else {
      newValue.push(id);
    }
    setValue(newValue);
  };

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
          <LCAMechIcon />
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
          label={optionKeys.leak}
          value={optionsValue.leak}
          onChange={(e) =>
            handleValueChange({
              key: optionKeys.leak,
              value: e.target.value,
            })
          }
        />
        <CustomValueInput
          label={optionKeys.competition}
          value={optionsValue.competition}
          onChange={(e) =>
            handleValueChange({
              key: optionKeys.competition,
              value: e.target.value,
            })
          }
        />
        <CustomValueInput
          label={optionKeys.self_excitation}
          value={optionsValue.self_excitation}
          onChange={(e) =>
            handleValueChange({
              key: optionKeys.self_excitation,
              value: e.target.value,
            })
          }
        />
        <CustomValueInput
          label={optionKeys.time_step_size}
          value={optionsValue.time_step_size}
          onChange={(e) =>
            handleValueChange({
              key: optionKeys.time_step_size,
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
          label={optionKeys.threshold_criterion}
          value={optionsValue.threshold_criterion}
          onChange={(e) =>
            handleValueChange({
              key: optionKeys.threshold_criterion,
              value: e.target.value,
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
        <CustomValueInput
          label={optionKeys.matrix}
          value={optionsValue.matrix}
          onChange={(e) =>
            handleValueChange({
              key: optionKeys.matrix,
              value: e.target.value,
            })
          }
        />
        <CustomValueInput
          label={optionKeys.auto}
          value={optionsValue.auto}
          onChange={(e) =>
            handleValueChange({
              key: optionKeys.auto,
              value: e.target.value,
            })
          }
        />
        <CustomValueInput
          label={optionKeys.hetero}
          value={optionsValue.hetero}
          onChange={(e) =>
            handleValueChange({
              key: optionKeys.hetero,
              value: e.target.value,
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
          label={optionKeys.termination_measure}
          value={optionsValue.termination_measure}
          onChange={(e) =>
            handleValueChange({
              key: optionKeys.termination_measure,
              value: e.target.value,
            })
          }
        />
        <AddToVisualMenu value={value} onChange={handleMenuValueChange} />
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
