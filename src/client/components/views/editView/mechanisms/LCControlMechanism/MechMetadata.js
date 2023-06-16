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
import { ControlMechIcon } from '../shared/Icons';
import {
  debounceUpdateValue,
  defaultFilters,
  handleOptionChange,
  handleValueChange,
  toObject,
} from '../../utils';
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
    model,
    model: { options },
    engine,
    changeVisibility,
    onUpdateOptions,
  } = props;

  const [optionsValue, updateOptions] = React.useState(() => options);
  const optionKeys = toObject(Object.entries(options));
  const [value, updateValue] = React.useState(() => ['Composition 2']);

  React.useEffect(() => {
    debounceUpdateValue(optionsValue, onUpdateOptions);
  }, [onUpdateOptions, optionsValue]);

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
          <ControlMechIcon />
        </Box>

        <Box display="inline-flex" alignItems="center" component="p">
          <MetaDataInput
            textAlign="center"
            value={optionsValue.name}
            onChange={(e) =>
              handleOptionChange(
                { key: optionKeys.name, value: e.target.value },
                updateOptions
              )
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
        <ListSelect
          options={defaultFilters}
          label={optionKeys.modulated_mechanisms}
          value={optionsValue.modulated_mechanisms}
          onChange={(e) =>
            handleOptionChange(
              {
                key: optionKeys.modulated_mechanisms,
                value: e.target.value,
              },
              updateOptions
            )
          }
        />
        <CustomValueInput
          label={optionKeys.initial_w_FitzHughNagumo}
          value={optionsValue.initial_w_FitzHughNagumo}
          onChange={(e) =>
            handleOptionChange(
              {
                key: optionKeys.initial_w_FitzHughNagumo,
                value: e.target.value,
              },
              updateOptions
            )
          }
        />
        <CustomValueInput
          label={optionKeys.initial_v_FitzHughNagumo}
          value={optionsValue.initial_v_FitzHughNagumo}
          onChange={(e) =>
            handleOptionChange(
              {
                key: optionKeys.initial_v_FitzHughNagumo,
                value: e.target.value,
              },
              updateOptions
            )
          }
        />
        <CustomValueInput
          label={optionKeys.time_step_size_FitzHughNagumo}
          value={optionsValue.time_step_size_FitzHughNagumo}
          onChange={(e) =>
            handleOptionChange(
              {
                key: optionKeys.time_step_size_FitzHughNagumo,
                value: e.target.value,
              },
              updateOptions
            )
          }
        />
        <CustomValueInput
          label={optionKeys.t_0_FitzHughNagumo}
          value={optionsValue.t_0_FitzHughNagumo}
          onChange={(e) =>
            handleOptionChange(
              {
                key: optionKeys.t_0_FitzHughNagumo,
                value: e.target.value,
              },
              updateOptions
            )
          }
        />
        <CustomValueInput
          label={optionKeys.a_v_FitzHughNagumo}
          value={optionsValue.a_v_FitzHughNagumo}
          onChange={(e) =>
            handleOptionChange(
              {
                key: optionKeys.a_v_FitzHughNagumo,
                value: e.target.value,
              },
              updateOptions
            )
          }
        />
        <CustomValueInput
          label={optionKeys.b_v_FitzHughNagumo}
          value={optionsValue.b_v_FitzHughNagumo}
          onChange={(e) =>
            handleOptionChange(
              {
                key: optionKeys.b_v_FitzHughNagumo,
                value: e.target.value,
              },
              updateOptions
            )
          }
        />
        <CustomValueInput
          label={optionKeys.c_v_FitzHughNagumo}
          value={optionsValue.c_v_FitzHughNagumo}
          onChange={(e) =>
            handleOptionChange(
              {
                key: optionKeys.c_v_FitzHughNagumo,
                value: e.target.value,
              },
              updateOptions
            )
          }
        />
        <CustomValueInput
          label={optionKeys.d_v_FitzHughNagumo}
          value={optionsValue.d_v_FitzHughNagumo}
          onChange={(e) =>
            handleOptionChange(
              {
                key: optionKeys.d_v_FitzHughNagumo,
                value: e.target.value,
              },
              updateOptions
            )
          }
        />
        <CustomValueInput
          label={optionKeys.e_v_FitzHughNagumo}
          value={optionsValue.e_v_FitzHughNagumo}
          onChange={(e) =>
            handleOptionChange(
              {
                key: optionKeys.e_v_FitzHughNagumo,
                value: e.target.value,
              },
              updateOptions
            )
          }
        />
        <CustomValueInput
          label={optionKeys.f_v_FitzHughNagumo}
          value={optionsValue.f_v_FitzHughNagumo}
          onChange={(e) =>
            handleOptionChange(
              {
                key: optionKeys.f_v_FitzHughNagumo,
                value: e.target.value,
              },
              updateOptions
            )
          }
        />
        <CustomValueInput
          label={optionKeys.threshold_FitzHughNagumo}
          value={optionsValue.threshold_FitzHughNagumo}
          onChange={(e) =>
            handleOptionChange(
              {
                key: optionKeys.threshold_FitzHughNagumo,
                value: e.target.value,
              },
              updateOptions
            )
          }
        />
        <CustomValueInput
          label={optionKeys.time_constant_v_FitzHughNagumo}
          value={optionsValue.time_constant_v_FitzHughNagumo}
          onChange={(e) =>
            handleOptionChange(
              {
                key: optionKeys.time_constant_v_FitzHughNagumo,
                value: e.target.value,
              },
              updateOptions
            )
          }
        />
        <CustomValueInput
          label={optionKeys.a_w_FitzHughNagumo}
          value={optionsValue.a_w_FitzHughNagumo}
          onChange={(e) =>
            handleOptionChange(
              {
                key: optionKeys.a_w_FitzHughNagumo,
                value: e.target.value,
              },
              updateOptions
            )
          }
        />
        <CustomValueInput
          label={optionKeys.b_w_FitzHughNagumo}
          value={optionsValue.b_w_FitzHughNagumo}
          onChange={(e) =>
            handleOptionChange(
              {
                key: optionKeys.b_w_FitzHughNagumo,
                value: e.target.value,
              },
              updateOptions
            )
          }
        />
        <CustomValueInput
          label={optionKeys.c_w_FitzHughNagumo}
          value={optionsValue.c_w_FitzHughNagumo}
          onChange={(e) =>
            handleOptionChange(
              {
                key: optionKeys.c_w_FitzHughNagumo,
                value: e.target.value,
              },
              updateOptions
            )
          }
        />
        <CustomValueInput
          label={optionKeys.mode_FitzHughNagumo}
          value={optionsValue.mode_FitzHughNagumo}
          onChange={(e) =>
            handleOptionChange(
              {
                key: optionKeys.mode_FitzHughNagumo,
                value: e.target.value,
              },
              updateOptions
            )
          }
        />
        <CustomValueInput
          label={optionKeys.uncorrelated_activity_FitzHughNagumo}
          value={optionsValue.uncorrelated_activity_FitzHughNagumo}
          onChange={(e) =>
            handleOptionChange(
              {
                key: optionKeys.uncorrelated_activity_FitzHughNagumo,
                value: e.target.value,
              },
              updateOptions
            )
          }
        />
        <CustomValueInput
          label={optionKeys.time_constant_w_FitzHughNagumo}
          value={optionsValue.time_constant_w_FitzHughNagumo}
          onChange={(e) =>
            handleOptionChange(
              {
                key: optionKeys.time_constant_w_FitzHughNagumo,
                value: e.target.value,
              },
              updateOptions
            )
          }
        />
        <CustomValueInput
          label={optionKeys.integration_method}
          value={optionsValue.integration_method}
          onChange={(e) =>
            handleOptionChange(
              {
                key: optionKeys.integration_method,
                value: e.target.value,
              },
              updateOptions
            )
          }
        />
        <CustomValueInput
          label={optionKeys.base_level_gain}
          value={optionsValue.base_level_gain}
          onChange={(e) =>
            handleOptionChange(
              {
                key: optionKeys.base_level_gain,
                value: e.target.value,
              },
              updateOptions
            )
          }
        />
        <CustomValueInput
          label={optionKeys.scaling_factor_gain}
          value={optionsValue.scaling_factor_gain}
          onChange={(e) =>
            handleOptionChange(
              {
                key: optionKeys.scaling_factor_gain,
                value: e.target.value,
              },
              updateOptions
            )
          }
        />
        <FunctionInput
          label={optionKeys.function}
          value={optionsValue.function}
          onChange={(e) =>
            handleOptionChange(
              {
                key: optionKeys.function,
                value: e.target.value,
              },
              updateOptions
            )
          }
        />
        <CustomValueInput
          label={optionKeys.modulation}
          value={optionsValue.modulation}
          onChange={(e) =>
            handleOptionChange(
              {
                key: optionKeys.modulation,
                value: e.target.value,
              },
              updateOptions
            )
          }
          minWidth="100%"
        />
        <AddToVisualMenu
          value={value}
          onChange={(id) => handleValueChange(id, value, updateValue)}
        />{' '}
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
