import * as React from 'react';
import Box from '@mui/material/Box';
import { withStyles } from '@mui/styles';
import NodeSelection from '../shared/NodeSelection';
import vars from '../../../../../assets/styles/variables';
import { PortTypes } from '@metacell/meta-diagram';
import FunctionInput, {
  CustomCheckInput,
  CustomValueInput,
  ListSelect,
  MatrixInput,
  MetaDataInput,
} from '../shared/FunctionInput';
import { ControlMechIcon } from '../shared/Icons';
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
          <ControlMechIcon />
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
        <ListSelect
          options={defaultFilters}
          label={optionKeys.monitor_for_control}
          value={optionsValue.monitor_for_control}
          onChange={(e) =>
            handleValueChange({
              key: optionKeys.monitor_for_control,
              value: e.target.value,
            })
          }
        />
        <ListSelect
          options={defaultFilters}
          label={optionKeys.objective_mechanism}
          value={optionsValue.objective_mechanism}
          onChange={(e) =>
            handleValueChange({
              key: optionKeys.objective_mechanism,
              value: e.target.value,
            })
          }
        />
        <CustomCheckInput
          label={optionKeys.allow_probes}
          checked={optionsValue.allow_probes}
          onChange={(e) =>
            handleValueChange({
              key: optionKeys.allow_probes,
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
        <CustomValueInput
          label={optionKeys.default_allocation}
          value={optionsValue.default_allocation}
          onChange={(e) =>
            handleValueChange({
              key: optionKeys.default_allocation,
              value: e.target.value,
            })
          }
          minWidth="100%"
        />
        <CustomValueInput
          label={optionKeys.modulation}
          value={optionsValue.modulation}
          onChange={(e) =>
            handleValueChange({
              key: optionKeys.modulation,
              value: e.target.value,
            })
          }
          minWidth="100%"
        />
        <ListSelect
          options={defaultFilters}
          label={optionKeys.control}
          value={optionsValue.control}
          onChange={(e) =>
            handleValueChange({
              key: optionKeys.control,
              value: e.target.value,
            })
          }
        />
        <FunctionInput
          label={optionKeys.combine_costs}
          value={optionsValue.combine_costs}
          onChange={(e) =>
            handleValueChange({
              key: optionKeys.combine_costs,
              value: e.target.value,
            })
          }
        />
        <FunctionInput
          label={optionKeys.compute_reconfiguration_cost}
          value={optionsValue.compute_reconfiguration_cost}
          onChange={(e) =>
            handleValueChange({
              key: optionKeys.compute_reconfiguration_cost,
              value: e.target.value,
            })
          }
        />{' '}
        <FunctionInput
          label={optionKeys.compute_net_outcome}
          value={optionsValue.compute_net_outcome}
          onChange={(e) =>
            handleValueChange({
              key: optionKeys.compute_net_outcome,
              value: e.target.value,
            })
          }
        />
        <MatrixInput
          label={optionKeys.reconfiguration_cost}
          value={optionsValue.reconfiguration_cost}
          onChange={(e) =>
            handleValueChange({
              key: optionKeys.reconfiguration_cost,
              value: e.target.value,
            })
          }
        />
        <ListSelect
          options={defaultFilters}
          label={optionKeys.costs}
          value={optionsValue.costs}
          onChange={(e) =>
            handleValueChange({
              key: optionKeys.costs,
              value: e.target.value,
            })
          }
        />
        <ListSelect
          options={defaultFilters}
          label={optionKeys.combined_costs}
          value={optionsValue.combined_costs}
          onChange={(e) =>
            handleValueChange({
              key: optionKeys.combined_costs,
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
