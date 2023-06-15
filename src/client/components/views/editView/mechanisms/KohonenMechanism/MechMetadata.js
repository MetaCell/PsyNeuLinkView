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
import { KohonenMechIcon } from '../shared/Icons';
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
          <KohonenMechIcon />
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
          label={optionKeys.selection_function}
          value={optionsValue.selection_function}
          onChange={(e) =>
            handleValueChange({
              key: optionKeys.selection_function,
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
        <CustomValueInput
          label={optionKeys.learning_rate}
          value={optionsValue.learning_rate}
          onChange={(e) =>
            handleValueChange({
              key: optionKeys.learning_rate,
              value: e.target.value,
            })
          }
          minWidth="100%"
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
          minWidth="100%"
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
        <FunctionInput
          label={optionKeys.distance_function}
          value={optionsValue.distance_function}
          onChange={(e) =>
            handleValueChange({
              key: optionKeys.distance_function,
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
