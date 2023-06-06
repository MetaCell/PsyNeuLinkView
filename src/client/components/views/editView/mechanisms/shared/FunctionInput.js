import React, { useCallback } from 'react';
import {
  Box,
  Checkbox,
  FilledInput,
  MenuItem,
  Stack,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import FilterSelect from '../../../../common/FilterSelect';
import { makeStyles, styled } from '@mui/styles';
import CodeEditor, { SelectionText } from '@uiw/react-textarea-code-editor';
import vars from '../../../../../assets/styles/variables';

const {
  listItemActiveBg,
  buttonPrimaryBgHoverColor,
  breadcrumbLinkColor,
  breadcrumbTextColor,
} = vars;

const functionTypes = [
  { value: 'not-specified', label: 'Not specified' },
  { value: 'combination', label: 'Combination' },
  { value: 'distribution', label: 'Distribution' },
  { value: 'objective', label: 'Objective' },
  { value: 'optimization', label: 'Optimization' },
  { value: 'selections', label: 'Selections' },
  { value: 'custom-function', label: 'Custom function' },
];
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
          // color: buttonPrimaryBgHoverColor,
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
  },
}));

export const CustomCheckInput = ({ label, ...props }) => {
  const classes = useStyles();
  return (
    <Box
      className="block"
      sx={{
        // width: '100% !important',
        minWidth: '100%',
      }}
    >
      <Stack
        direction="row"
        // spacing={1}
        // justifyContent="space-between"
        // alignItems="center"
        // width="100%"
        // minWidth="100%"
        className={classes.switch}
      >
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

  // const textCol

  return (
    <TextField
      classes={{ root: classes.root }}
      value={'Function FunctionFunctionFunction'}
      {...props}
      sx={{
        '& .MuiOutlinedInput-root': {
          '& input': {
            textAlign,
          },
        },
        // color: 'inherit',

        '& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root': {
          fontSize: variant === 'sm' ? '0.625rem' : '0.875rem',
          fontWeight: variant === 'sm' ? 500 : 400,
          // color: variant === 'sm' ? breadcrumbLinkColor : breadcrumbTextColor,
          color: 'inherit',
          textAlign: 'center',
          '::-webkit-input-placeholder': {
            textAlign: 'center',
          },
          ' :-moz-placeholder': {
            textAlign: 'center',
          },
        },
      }}
      FormHelperTextProps={{
        style: {
          textAlign: 'center',
        },
      }}
    />
  );
};

export const CustomValueInput = ({ label, minWidth, ...props }) => {
  const classes = useStyles();

  return (
    <Box className="block" sx={{ minWidth }}>
      <Tooltip title={label} arrow>
        <Typography component="label" className={classes.label}>
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
  const textRef = React.useRef();
  const [type, setType] = React.useState(() => defaultType ?? 'np.Matrix');
  const [code, setCode] = React.useState(
    () => 'np.matrix([[1, 2], [3, 4]]) matrix([[1, 2], [3, 4]])'
  );

  const onChartFilterChange = useCallback((event) => {
    const selected = event.target.value;
    setType(selected);
  }, []);

  return (
    <Box className="block">
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
          {/* <MetaDataInput variant="sm" /> */}

          <FilterSelect
            size="small"
            width={70}
            maxWidth={70}
            // label={label}
            // variant="list"
            value={type}
            onChange={onChartFilterChange}
            renderValue={(value) => (
              <Typography fontSize={14} textTransform="">
                {value.charAt(0).toUpperCase() +
                  value.slice(1).replace('-', ' ')}
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
        <CodeEditor
          value={code}
          ref={textRef}
          language="js"
          placeholder="Please enter JS code."
          onChange={(evn) => setCode(evn.target.value)}
          // padding={textRef.current !== undefined ? 15 : 0}
          padding={15}
          style={{
            fontFamily:
              'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
            fontSize: 14,
            // width: '100%',
            // width: 'calc(100% - 42px)',
            backgroundColor: 'inherit',
          }}
          className={classes.input}
        />
      </Box>
    </Box>
  );
};
const FunctionInput = ({
  label,
  onLabelChange,
  value,
  onChange,
  defaultType,
}) => {
  const classes = useStyles();
  const textRef = React.useRef();
  const [type, setType] = React.useState(() => defaultType ?? 'distribution');
  const [code, setCode] = React.useState(
    () =>
      'function=pnl.Logistic(gain=1.0, bias=-4) pnl.Logistic (gain=1.0, bias=-4)'
  );

  const onChartFilterChange = useCallback((event) => {
    const selected = event.target.value;
    setType(selected);
  }, []);

  console.log(textRef, 'textRef');

  return (
    <Box className="block" sx={{ minWidth: '100%' }}>
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
            width={70}
            maxWidth={70}
            value={type}
            onChange={onChartFilterChange}
            renderValue={(value) => (
              <Typography fontSize={14} textTransform="">
                {value.charAt(0).toUpperCase() +
                  value.slice(1).replace('-', ' ')}
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
        <CodeEditor
          value={code}
          ref={textRef}
          language="js"
          placeholder="Please enter JS code."
          onChange={(evn) => setCode(evn.target.value)}
          // padding={textRef.current !== undefined ? 15 : 0}
          padding={15}
          style={{
            fontFamily:
              'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
            fontSize: 14,
            // width: '100%',
            // width: 'calc(100% - 42px)',
            backgroundColor: 'inherit',
          }}
          className={classes.input}
        />
      </Box>
    </Box>
  );
};

export default FunctionInput;
