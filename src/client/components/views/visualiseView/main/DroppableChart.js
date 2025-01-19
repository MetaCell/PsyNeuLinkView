import React, {
  useRef,
  useMemo,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { useDrop } from 'react-dnd';
import { makeStyles } from '@mui/styles';
import { Typography } from '@mui/material';
import LineChart from './charts/lineChart';
import ScatterChart from './charts/ScatterChart';
import { getInitialChartData } from './charts/util';
// import CandleStickChart from './charts/CandleStick';
import vars from '../../../../assets/styles/variables';
import FilterSelect from '../../../common/FilterSelect';
import { filters, renderChartIcon } from './charts/filter';
import { Box, Stack, MenuItem, Snackbar } from '@mui/material';
import { useDispatch, useStore, useSelector } from 'react-redux';
import { updateWidget } from '@metacell/geppetto-meta-client/common/layout/actions';

const { elementBorderColor, dropdownBorderColor } = vars;

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiSelect-filled': {
      paddingTop: 'none !important',
      background: 'white',
      '& .MuiFilledInput-root': {
        background: 'white',
      },
    },
    '& .MuiTypography-root': {
      fontWeight: 500,
    },
    '& .MuiInputBase-root': {
      borderRadius: theme.spacing(1),
      '& .css-1gzkxga-MuiSelect-select-MuiInputBase-input-MuiFilledInput-input':
        {
          borderRadius: theme.spacing(1),
          boxShadow:
            ' 0px 3px 8px rgba(0, 0, 0, 0.12), 0px 3px 1px rgba(0, 0, 0, 0.04)',
          paddingTop: '0.375rem',
          paddingBottom: '0.375rem',
          paddingLeft: '0.5rem',
        },
    },
    '& .MuiInputBase-root:hover': {
      content: 'none',
    },
    '& .MuiInputBase-root:before, & .MuiInputBase-root:after': {
      borderBottom: 'none',
      content: 'none',
    },
  },
  filter: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
}));


const chartInfo = { mode: 'markers', type: 'scatter' };

export const DroppableChart = ({ id, model, accept = 'element' }) => {
  const dispatch = useDispatch();
  const store = useStore();
  const classes = useStyles();
  const [chartType, setChartType] = useState(() => 'line');
  const chartRef = useRef();
  const results = useSelector((state) => state.general.results);

  const getWidgetById = useCallback(
    (id) => {
      return store.getState().widgets[id];
    },
    [store]
  );

  const watchModel = useMemo(() => model, [model]);

  const chartData = useMemo(
    () => getInitialChartData(watchModel),
    [watchModel]
  );
  const scatterData = useMemo(
    () => getInitialChartData(watchModel, chartInfo),
    [watchModel]
  );

  const chart = useMemo(() => {
    switch (chartType) {
      case 'line':
        return <LineChart data={chartData} />;
      case 'scatter':
        return <ScatterChart data={scatterData} />;
      default:
        return null;
    }
  }, [chartData, chartType, scatterData]);

  const onChartFilterChange = useCallback((event) => {
    const selected = event.target.value;
    setChartType(selected);
  }, []);

  const checkCanDrop = useCallback((item) => {
    return !chartRef.current.model?.some((ele) => ele.id === item.id);
  }, []);

  const [{ isOver, canDrop }, dropRef] = useDrop(() => ({
    accept,
    canDrop: checkCanDrop,
    drop: (node) => onDrop(node, canDrop),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }));

  const onDrop = useCallback(
    async (node) => {
      if (!node) return;

      const newModel = [...chartRef.current.model];

      const widgetConfig = getWidgetById(id);
      const isDroppable = await checkCanDrop(node);

      if (isDroppable) {
        const nodeResults = results['resultsMap'][node.id];
        const xCoordinates = []
        const yCoordinates = []
        const labels = []
        nodeResults?.info.forEach((element) => {
          xCoordinates.push(String(element['x']));
          yCoordinates.push(String(element['y']));
          labels.push(element['text']);
        });
        const newNode = {
          ...node,
          x: xCoordinates,
          y: yCoordinates,
          text: labels,
        };

        dispatch(
          updateWidget({
            ...widgetConfig,
            props: {
              ...widgetConfig.props,
              model: [...newModel, newNode],
            },
          })
        );
      }
    },
    [getWidgetById, id, checkCanDrop, dispatch, results]
  );

  useEffect(() => {
    chartRef.current = {
      model,
    };
  }, [model]);

  const isActive = isOver && canDrop;
  const inActive = isOver && !canDrop;
  let backgroundColor = elementBorderColor;
  if (isActive) {
    backgroundColor = 'rgba(118, 118, 128, 0.1)';
  } else if (canDrop) {
    backgroundColor = dropdownBorderColor;
  }

  return (
    <Box
      ref={dropRef}
      style={{ backgroundColor, height: '100%', width: '100%', position: 'relative' }}
    >
      {chart}
      <Box className={classes.filter}>
        <FilterSelect
          size="small"
          value={chartType}
          onChange={onChartFilterChange}
          renderValue={(value) => (
            <Stack direction="row" spacing={0.75} alignItems="center">
              {renderChartIcon(value)}
              <Typography fontSize={14} textTransform="">
                {value.charAt(0).toUpperCase() +
                  value.slice(1).replaceAll('-', ' ')}
              </Typography>
            </Stack>
          )}
        >
          {!!filters && filters.length > 0
            ? filters.map((filter) => (
                <MenuItem key={filter.value} value={filter.value}>
                  <Stack direction="row" spacing={0.75} alignItems="center">
                    <>{renderChartIcon(filter.value)}</>
                    <Typography fontSize={14} textTransform="">
                      {filter.label}
                    </Typography>
                  </Stack>
                </MenuItem>
              ))
            : 'No chart types found'}
        </FilterSelect>
      </Box>
      {inActive && (
        <Snackbar
          autoHideDuration={6000}
          open={inActive}
          message="Model already exist in chart"
        />
      )}
    </Box>
  );
};
