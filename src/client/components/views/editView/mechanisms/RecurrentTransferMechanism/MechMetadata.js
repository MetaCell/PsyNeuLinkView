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
import { RecurrentTransferMechIcon } from '../shared/Icons';
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
          <RecurrentTransferMechIcon />
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

        <CustomCheckInput
          label={optionKeys.has_recurrent_input_port}
          checked={optionsValue.has_recurrent_input_port}
          onChange={(e) =>
            handleValueChange({
              key: optionKeys.has_recurrent_input_port,
              value: e.target.checked,
            })
          }
        />

        <FunctionInput
          label={optionKeys.combination_function}
          value={optionsValue.combination_function}
          onChange={(e) =>
            handleValueChange({
              key: optionKeys.combination_function,
              value: e.target.value,
            })
          }
        />

        <CustomCheckInput
          label={optionKeys.enable_learning}
          checked={optionsValue.enable_learning}
          onChange={(e) =>
            handleValueChange({
              key: optionKeys.enable_learning,
              value: e.target.checked,
            })
          }
        />

        <CustomCheckInput
          label={optionKeys.learning_rate}
          checked={optionsValue.learning_rate}
          onChange={(e) =>
            handleValueChange({
              key: optionKeys.learning_rate,
              value: e.target.checked,
            })
          }
        />
        <FunctionInput
          label={optionKeys.learning_function}
          value={optionsValue.learning_function}
          onChange={(e) =>
            handleValueChange({
              key: optionKeys.learning_function,
              value: e.target.value,
            })
          }
        />

        <CustomCheckInput
          label={optionKeys.learning_enabled}
          checked={optionsValue.learning_enabled}
          onChange={(e) =>
            handleValueChange({
              key: optionKeys.learning_enabled,
              value: e.target.checked,
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
          label={optionKeys.smoothing_factor}
          value={optionsValue.smoothing_factor}
          onChange={(e) =>
            handleValueChange({
              key: optionKeys.smoothing_factor,
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
