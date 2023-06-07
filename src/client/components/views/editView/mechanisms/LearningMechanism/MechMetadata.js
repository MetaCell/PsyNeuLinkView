import * as React from 'react';
import Box from '@mui/material/Box';
import { withStyles } from '@mui/styles';
import NodeSelection from '../shared/NodeSelection';
import Typography from '@mui/material/Typography';
import InputOutputNode from '../shared/InputOutputNode';
import vars from '../../../../../assets/styles/variables';
import { PortTypes, PortWidget } from '@metacell/meta-diagram';
import FunctionInput, {
  CustomCheckInput,
  CustomValueInput,
  MatrixInput,
  MetaDataInput,
} from '../shared/FunctionInput';
import FilterSelect from '../../../../common/FilterSelect';
import { MenuItem } from '@mui/material';
import { MechIcon } from '../shared/Icons';
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

const signalsOptions = [
  { name: 'LearningSignal', variable: '(OWNER_VALUE, 0)' },
];

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

  const onFilterChange = React.useCallback((event) => {
    const selected = event.target.value;
    // setType(selected);
  }, []);

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
          <MechIcon />
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
          label={optionKeys.variable}
          value={optionsValue.variable}
          onChange={(e) =>
            handleValueChange({
              key: optionKeys.variable,
              value: e.target.value,
            })
          }
        />
        <CustomValueInput
          label={optionKeys.error_sources}
          value={optionsValue.error_sources}
          onChange={(e) =>
            handleValueChange({
              key: optionKeys.error_sources,
              value: e.target.value,
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
        />

        {/* <Box
          className="block"
          sx={{
            minWidth: '100%',
          }}
        >
          <FilterSelect
            size="small"
            width={70}
            maxWidth={70}
            label="learning_signals"
            variant="list"
            value={signalsOptions[0]}
            onChange={onFilterChange}
          >
            {!!signalsOptions && signalsOptions.length > 0
              ? signalsOptions.map((type) => (
                  <MenuItem key={type.name} value={type.name}>
                    <Typography fontSize={14} textTransform="">
                      {`${type.name}: ${type.variable}`}
                    </Typography>
                  </MenuItem>
                ))
              : 'Not found'}
          </FilterSelect>
        </Box> */}
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
          label={optionKeys.primary_learned_projection}
          value={optionsValue.primary_learned_projection}
          onChange={(e) =>
            handleValueChange({
              key: optionKeys.primary_learned_projection,
              value: e.target.value,
            })
          }
          minWidth="100%"
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

        <Box
          className="block"
          sx={{
            minWidth: '100%',
          }}
        >
          <FilterSelect
            size="small"
            width={70}
            maxWidth={70}
            label="error_matrices"
            variant="list"
            value={optionsValue.error_matrices}
            onChange={(e) =>
              handleValueChange({
                key: optionKeys.error_matrices,
                value: e.target.value,
              })
            }
            // renderValue={(value) => (
            //   <Typography fontSize={14} textTransform="">
            //     {value.charAt(0).toUpperCase() + value.slice(1).replace('-', ' ')}
            //   </Typography>
            // )}
          >
            {!!defaultFilters && defaultFilters.length > 0
              ? defaultFilters
                  .map((opt) => ({ name: opt, variable: opt }))
                  .map((type) => (
                    <MenuItem key={type.name} value={type.name}>
                      <Typography fontSize={14} textTransform="">
                        {`${type.name}: ${type.variable}`}
                      </Typography>
                    </MenuItem>
                  ))
              : 'Not found'}
          </FilterSelect>
        </Box>

        <MatrixInput label="error_matrix" value={'BackPropagation'} />
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
