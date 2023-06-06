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

function toObject(pairs) {
  return Array.from(pairs).reduce(
    (acc, [key]) => Object.assign(acc, { [key]: key }),
    {}
  );
}

const defaultFilters = ['N/A'];

function PropertyInput({ label, value, updateValue }) {
  return (
    <Box className="block">
      <Typography component="label" className=".sm">
        {label}
      </Typography>
      <MetaDataInput
        value={value}
        onChange={(e) => updateValue(e.target.value)}
      />
    </Box>
  );
}

function MechMetadata(props) {
  const {
    classes,
    model,
    model: { options },
    engine,
    changeVisibility,
  } = props;

  const [optionsValue, setOptions] = React.useState(() => options);
  const optionKeys = toObject(Object.entries(options));
  const optionsEntries = Object.entries(options);

  const functionValues = (label, value) => (
    <Box className="block">
      <Typography component="label">{label}</Typography>
      {/* <TextField
        id="outlined-multiline-flexible"
        maxRows={4}
        value={value}
        onChange={ (e) => {console.log(e)} }
        variant="outlined"
        style={{ zIndex: 11 }}
      /> */}
      <Typography>{value}</Typography>
    </Box>
  );

  const handleValueChange = ({ key, value }) => {
    setOptions((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const onFilterChange = React.useCallback((event) => {
    const selected = event.target.value;
    // setType(selected);
  }, []);

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
        <Typography component="p">{options.name}</Typography>
      </Box>

      <Box>
        {options.ports.map((port) => {
          switch (port.getType()) {
            case PortTypes.INPUT_PORT:
              return (
                <PortWidget
                  key={model.getID() + '_' + port.getId()}
                  engine={engine}
                  port={model.getPort(port.getId())}
                >
                  <InputOutputNode text={port.getId()} />
                </PortWidget>
              );
            default:
              return <></>;
          }
        })}
      </Box>

      <Box className="seprator" />

      <Box className="block-wrapper" zIndex={1009101}>
        {/* {optionsEntries.map(([key, value]) => {
        return (
          <CustomValueInput label={key} value='variable' />

        )
      })} */}

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
        </Box>
        <CustomValueInput
          label={optionKeys.modulation}
          value={optionsValue.modulation}
          onChange={(e) =>
            handleValueChange({
              key: optionKeys.modulation,
              value: e.target.value,
            })
          }
        />
        <CustomValueInput
          label={optionKeys.input_source}
          value={optionsValue.input_source}
          onChange={(e) =>
            handleValueChange({
              key: optionKeys.input_source,
              value: e.target.value,
            })
          }
        />
        <CustomValueInput
          label={optionKeys.output_source}
          value={optionsValue.output_source}
          onChange={(e) =>
            handleValueChange({
              key: optionKeys.output_source,
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
            label="input_ports"
            variant="list"
            value={signalsOptions[0]}
            onChange={onFilterChange}
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
        <CustomValueInput label={'error_signal'} value={options.error_signal} />
        <CustomValueInput
          label={'learning_signal'}
          value={options.learning_signal}
        />
        <CustomValueInput
          label={'output_values'}
          value={options.output_values}
        />

        <CustomValueInput
          label={'primary_learned_projection'}
          value={options.primary_learned_projection}
          minWidth="100%"
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
            label="input_ports"
            variant="list"
            value={defaultFilters[0]}
            onChange={onFilterChange}
          >
            {!!defaultFilters && defaultFilters.length > 0
              ? defaultFilters
                  .map((opt) => ({ name: opt, variable: opt }))
                  .map((type) => (
                    <MenuItem key={type.name} value={type.name}>
                      <Typography fontSize={14} textTransform="">
                        {`${type.variable}`}
                      </Typography>
                    </MenuItem>
                  ))
              : 'Not found'}
          </FilterSelect>
        </Box>
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
            label="output_ports"
            variant="list"
            value={defaultFilters[0]}
            onChange={onFilterChange}
          >
            {!!defaultFilters && defaultFilters.length > 0
              ? defaultFilters
                  .map((opt) => ({ name: opt, variable: opt }))
                  .map((type) => (
                    <MenuItem key={type.name} value={type.name}>
                      <Typography fontSize={14} textTransform="">
                        {`${type.variable}`}
                      </Typography>
                    </MenuItem>
                  ))
              : 'Not found'}
          </FilterSelect>
        </Box>
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
            label="error_signal_input_ports"
            variant="list"
            value={defaultFilters[0]}
            onChange={onFilterChange}
          >
            {!!defaultFilters && defaultFilters.length > 0
              ? defaultFilters
                  .map((opt) => ({ name: opt, variable: opt }))
                  .map((type) => (
                    <MenuItem key={type.name} value={type.name}>
                      <Typography fontSize={14} textTransform="">
                        {`${type.variable}`}
                      </Typography>
                    </MenuItem>
                  ))
              : 'Not found'}
          </FilterSelect>
        </Box>

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
            value={signalsOptions[0]}
            onChange={onFilterChange}
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

        <FunctionInput label="function" value={'BackPropagation'} />
        <MatrixInput label="error_matrix" value={'BackPropagation'} />
        {/* </Box> */}
      </Box>

      <Box className="seprator" />

      <Box>
        {options.ports.map((port) => {
          switch (port.getType()) {
            case PortTypes.OUTPUT_PORT:
              return (
                <PortWidget
                  key={model.getID() + '_' + port.getId()}
                  engine={engine}
                  port={model.getPort(port.getId())}
                >
                  <InputOutputNode text={port.getId()} direction="right" />
                </PortWidget>
              );
            default:
              return <></>;
          }
        })}
      </Box>
    </Box>
  );
}

export default withStyles(styles)(MechMetadata);
