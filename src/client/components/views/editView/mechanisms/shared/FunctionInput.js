import React, { useCallback, useMemo } from 'react';
import {
  Box,
  MenuItem,
  Stack,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import FilterSelect from '../../../../common/FilterSelect';
import { makeStyles, styled } from '@mui/styles';
import CodeEditor from '@uiw/react-textarea-code-editor';
import vars from '../../../../../assets/styles/variables';
import PropTypes from 'prop-types';

const { listItemActiveBg, breadcrumbTextColor } = vars;

const functionTypes = [
  { value: 'not-specified', label: 'Not specified', text: '' },
  { value: 'combination', label: 'Combination', text: 'pnl.Combination()' },
  { value: 'distribution', label: 'Distribution', text: 'pnl.Distribution()' },
  { value: 'linear', label: 'Linear', text: 'pnl.Linear()' },
  {
    value: 'logistic',
    label: 'Logistic',
    text: 'pnl.Logistic(gain=1.0, bias=-4)',
  },
  { value: 'objective', label: 'Objective', text: 'pnl.Objective()' },
  { value: 'optimization', label: 'Optimization', text: 'pnl.Optimization()' },
  { value: 'selections', label: 'Selections', text: 'pnl.Selections()' },
  { value: 'custom-function', label: 'Custom function', text: '' },
];

const allTypes = functionTypes.map((type) => type.value);

const matrixTypes = [
  'np.Matrix',
  'Float',
  '1d np.array',
  '2d np.array',
  'Numeric Values',
  'Scalar',
];

const CustomSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 36,
  height: 20,
  padding: 0,
  zIndex: 1009101,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: listItemActiveBg,
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: listItemActiveBg,
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: theme.palette.grey[100],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: 0.7,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 16,
    height: 16,
  },
  '& .MuiSwitch-track': {
    borderRadius: 20 / 2,
    backgroundColor: '#E9E9EA',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

const useStyles = makeStyles(() => ({
  input: {
    borderRadius: '0.5rem',
    '& .w-tc-editor-text': {
      borderRadius: '0.5rem',
      border: '1px solid transparent !important',
    },
    '& .w-tc-editor-text:focus': {
      borderColor: `${listItemActiveBg} !important`,
    },
  },
  root: {
    zIndex: 1009101,
    '& .MuiOutlinedInput-root': {
      borderRadius: '0.5rem',

      '& fieldset': {
        borderColor: 'transparent',
      },
      '&:hover fieldset': {
        borderColor: listItemActiveBg,
      },
      '&.Mui-focused fieldset': {
        borderWidth: '1px',
        borderColor: listItemActiveBg,
      },
    },
    '& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root': {
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),

      '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': {
        padding: '0.25rem 0',
        '&:focus, &:hover': {
          padding: '0.25rem 0.375rem',
        },
      },
    },
  },
  switch: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',

    '& label': {
      textTransform: 'capitalize !important',
      textOverflow: 'ellipsis',
    },
    '& .value': {
      fontSize: '0.875rem',
      color: breadcrumbTextColor,
      textTransform: 'capitalize',
    },
  },
  label: {
    fontSize: '0.625rem',
    fontWeight: 500,
    lineHeight: '0.875rem',
    textTransform: 'capitalize !important',
    textOverflow: 'ellipsis',
  },
}));

export const CustomCheckInput = ({ label, ...props }) => {
  const classes = useStyles();
  return (
    <Box
      className="block"
      sx={{
        minWidth: '100%',
        ...props.sx
      }}
    >
      <Stack direction="row" className={classes.switch}>
        <Stack spacing={0.5}>
          <Typography component="label">{label}</Typography>
          <Typography className="value">
            {props?.checked?.toString()}
          </Typography>
        </Stack>
        <Box>
          <CustomSwitch defaultChecked {...props} />
        </Box>
      </Stack>
    </Box>
  );
};

export const MetaDataInput = ({ variant = 'md', textAlign, ...props }) => {
  const classes = useStyles();
  const inputRef = React.useRef();

  const memoisedDataInput = useMemo(() => (
    <TextField
      ref={inputRef}
      classes={{ root: classes.root }}
      value={'Function FunctionFunctionFunction'}
      {...props}
      sx={{
        '& .MuiOutlinedInput-root': {
          '& input': {
            textAlign,
          },
        },

        '& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root': {
          fontSize: variant === 'sm' ? '0.625rem' : '0.875rem',
          fontWeight: variant === 'sm' ? 500 : 400,
          color: 'inherit',
        },
      }}
      FormHelperTextProps={{
        style: {
          textAlign: 'center',
        },
      }}
    />
  ), [classes.root, props, textAlign, variant]);

  if (inputRef.current !== undefined) {
    let _instance = inputRef.current;
    while (_instance && _instance.tagName !== 'INPUT') {
      _instance = _instance.childNodes[0];
    }

    _instance.addEventListener('focus', () => {
      props?.model?.setLocked(true);
    });
    _instance.addEventListener('blur', () => {
      props?.model?.setLocked(false);
    });
  }

  return memoisedDataInput;
};

export const CustomValueInput = ({ label, minWidth, ...props }) => {
  const classes = useStyles();

  return (
    <Box className="block" sx={{ 'minWidth': minWidth, ...props.sx }}>
      <Tooltip title={label} arrow>
        <Typography noWrap component="label" className={classes.label}>
          {label}
        </Typography>
      </Tooltip>
      <MetaDataInput {...props} />
    </Box>
  );
};

export const MatrixInput = ({
  label,
  onLabelChange,
  value,
  onChange,
  defaultType,
}) => {
  const classes = useStyles();
  const [type, setType] = React.useState(() => defaultType ?? 'np.Matrix');

  const onChartFilterChange = useCallback((event) => {
    const selected = event.target.value;
    setType(selected);
  }, []);

  return (
    <Box
      className="block"
      sx={{
        minWidth: '100%',
      }}
    >
      <Box data-color-mode="light" width="100%">
        <Stack
          direction="row"
          spacing={1.5}
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography component="label" className={classes.label}>
            {label}
          </Typography>

          <FilterSelect
            size="small"
            // width={70}
            // maxWidth={70}
            value={type}
            onChange={onChartFilterChange}
            renderValue={(value) => (
              <Typography fontSize={14} textTransform="">
                {value.charAt(0).toUpperCase() +
                  value.slice(1).replaceAll('-', ' ')}
              </Typography>
            )}
          >
            {!!matrixTypes && matrixTypes.length > 0
              ? matrixTypes
                  .map((value) => ({ value, label: value }))
                  .map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      <Typography fontSize={14} textTransform="">
                        {type.label}
                      </Typography>
                    </MenuItem>
                  ))
              : 'No types found'}
          </FilterSelect>
        </Stack>
      </Box>
    </Box>
  );
};

export const ListSelect = ({ label, options, ...props }) => {
  return (
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
        label={label}
        variant="list"
        {...props}
      >
        {!!options && options.length > 0
          ? options
              .map((opt) => ({ label: opt, value: opt }))
              .map((type) => (
                <MenuItem key={type.label} value={type.value}>
                  <Typography fontSize={14} textTransform="">
                    {`${type.variable}`}
                  </Typography>
                </MenuItem>
              ))
          : 'Not found'}
      </FilterSelect>
    </Box>
  );
};

ListSelect.propTypes = {
  ports: PropTypes.array.isRequired,
  portType: PropTypes.string.isRequired,
  onAdd: PropTypes.func,
  direction: PropTypes.string,
};

const FunctionInput = ({ label, ...props }) => {
  const classes = useStyles();
  const textRef = React.useRef();
  const functionKey = label;
  const optionType = props.value.substring(0, props.value.indexOf('('));
  const typeResult = allTypes.find((type) =>
    optionType.toLowerCase().includes(type)
  );
  const [type, setType] = React.useState(() =>
    typeResult !== '' ? 'custom-function' : 'not-specified'
  );

  const [code, setCode] = React.useState(() => props.value ?? '');

  const onChartFilterChange = useCallback(
    (event) => {
      const selected = event.target.value;
      const code = functionTypes.find((type) => type.value === selected).text;
      props.updateModelOption({
        key: functionKey,
        value: code,
      });
      setCode(code);

      setType(selected);
    },
    [props, functionKey]
  );

  const memoisedCodeEditor = useMemo(
    () => (
      <CodeEditor
        value={code}
        ref={textRef}
        language="js"
        placeholder="Write the function"
        onChange={(evn) => {
          setCode(evn.target.value)
          props.updateModelOption({
            key: functionKey,
            value: evn.target.value,
          });
        }}
        padding={15}
        style={{
          fontFamily:
            'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
          fontSize: 14,
          backgroundColor: 'inherit',
        }}
        className={classes.input}
      />
    ),
    [classes.input, code, functionKey, props]
  );

  if (textRef.current) {
    textRef.current.addEventListener('focus', () => {props.model.setLocked(true)})
    textRef.current.addEventListener('blur', () => {props.model.setLocked(false)})
  }

  return (
    <Box className="block" sx={{ minWidth: '100%', ...props.sx }} zIndex={1009101}>
      <Box data-color-mode="light" width="100%">
        <Stack
          direction="row"
          spacing={1.5}
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography component="label" className={classes.label}>
            {label}
          </Typography>

          <FilterSelect
            key={optionType}
            size="small"
            width={70}
            maxWidth={70}
            value={type}
            onChange={onChartFilterChange}
            renderValue={(value) => (
              <Typography fontSize={14} textTransform="">
                {value.charAt(0).toUpperCase() +
                  value.slice(1).replaceAll('-', ' ')}
              </Typography>
            )}
          >
            {!!functionTypes && functionTypes.length > 0
              ? functionTypes.map((type) => (
                  <MenuItem key={type.value} value={type.value}>
                    <Typography fontSize={14} textTransform="">
                      {type.label}
                    </Typography>
                  </MenuItem>
                ))
              : 'No types found'}
          </FilterSelect>
        </Stack>
        {type === 'not-specified' ? <></> : <>{memoisedCodeEditor}</>}
      </Box>
    </Box>
  );
};

export default FunctionInput;
