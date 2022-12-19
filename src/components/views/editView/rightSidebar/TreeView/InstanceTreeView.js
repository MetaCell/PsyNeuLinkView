import React, { useEffect, useState } from 'react';
import TreeView from '@mui/lab/TreeView';
import StyledTreeItem from './TreeViewItem';
import {
  FileIcon,
  ShapeArrowToolIcon,
  CircleIcon,
  CloseIcon,
  ArrowDropDownIcon,
  ArrowRightIcon,
} from './Icons';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  IconButton,
  Popover,
  Stack,
  Typography,
} from '@mui/material';
import vars from '../../../../../assets/styles/variables';
import { makeStyles } from '@mui/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { COMPOSITION_DTO } from '../Sidebar';
import { PNLClasses } from '../../../../../constants';


export const GRAPH_SOURCE = 'GRAPH';
export const TREE_SOURCE = 'TREE';
const { COMPOSITION, MECHANISM, PROJECTION } = PNLClasses;

const {
  popperBG,
  listSelectedTextColor,
  cardBG,
  nodeSecLabelColor,
  dropdownBorderColor,
  dropdownTextColor,
  functionTextColor,
  functionCodeColor,
} = vars;

const useStyles = makeStyles(() => ({
  popperHeader: {
    padding: '0.5rem',
    display: 'flex',
    marginBottom: '0.5rem',
    justifyContent: 'space-between',
    alignItems: 'center',

    '& .MuiBox-root': {
      display: 'flex',
      alignItems: 'center',

      '& strong': {
        display: 'block',
        fontWeight: 500,
        fontSize: '0.875rem',
        lineHeight: '1.25rem',
        color: listSelectedTextColor,
        paddingLeft: '0.5rem',
      },

      '& span': {
        display: 'block',
        fontWeight: 500,
        fontSize: '0.8125rem',
        lineHeight: '1rem',
        letterSpacing: '-0.005rem',
        color: dropdownTextColor,
      },
    },
  },
  block: {
    flex: 1,
    background: cardBG,
    borderRadius: '0.5rem',

    '& label': {
      display: 'block',
      fontWeight: '400',
      fontSize: '0.625rem',
      lineHeight: '0.875rem',
      color: nodeSecLabelColor,
    },
    '& .text': {
      maxWidth: 'calc(16.25rem - 3rem)',
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: '1rem',
      letterSpacing: '0.005em',
      whiteSpace: 'nowrap',
    },
    '& .function': {
      maxWidth: 'calc(16.25rem - 2rem)',
      whiteSpace: 'nowrap',
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: '1rem',
      letterSpacing: '0.005em',

      '& .MuiTypography-root': {
        marginTop: '0.25rem',
        fontSize: '0.875rem',
        lineHeight: '1rem',
        letterSpacing: '0.005em',
        wordBreak: 'break-all',
        '& strong': {
          fontWeight: 400,
        },
      },
    },
  },

  textColor: {
    color: functionTextColor,
  },
  codeColor: {
    color: functionCodeColor,
  },
  seperator: {
    width: '0.125rem',
    height: '1rem',
    borderRadius: '1.25rem',
    margin: '0.25rem auto',
  },
  accordion: {
    background: cardBG,
    boxShadow: 'none',
    borderRadius: '0.5rem !important',
  },
  paddingXS: {
    padding: '0.5rem',
  },
}));

const popperPaperProps = {
  style: {
    width: '16.25rem',
    height: '17.5rem',
    padding: '0.5rem',
    background: popperBG,
    boxShadow:
      '0 0.5rem 0.5rem -0.25rem rgba(24, 24, 24, 0.03), 0 1.25rem 1.5rem -0.25rem rgba(24, 24, 24, 0.08',
    borderRadius: '0.75rem',
    inset: '1rem auto auto 0 !important',
    borderWidth: '1px',
    borderColor: dropdownBorderColor,
    borderStyle: 'solid',
  },
};

const initialRightClickStateCreator = () => ({
  mouseX: null,
  mouseY: null,
});


const InstancesTreeView = (props) => {
  const { datasets } = props;
  const classes = useStyles();

  const [right, setRight] = useState(() => initialRightClickStateCreator());
  const open = Boolean(right.mouseY);

  const [selectedNodes, setSelectedNodes] = useState([]);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [nodes, setNodes] = useState([]);
  const [items, setItems] = useState(datasets);

  const onNodeSelect = (e, nodeId) => {
    setSelectedNodeId(nodeId);
  };

  const onNodeToggle = (e, nodeIds) => {
    //  TODO uncommented after proper test
    // if (nodeIds.length === 0) {
    //   return;
    // }

    if (nodes.length !== nodeIds.length && nodes[0] === nodeIds[0]) {
      var original = [...nodes];
      var newPath = [...nodeIds];
      while (original[0] === newPath[0]) {
        original.shift();
        newPath.shift();
      }
      nodeIds = original;
    }

    setNodes(nodeIds);
  };


  function handleClick(e, nodes_ids) {
    if (e.target.className == 'MuiTreeItem-label') setSelectedNodes(nodes_ids);
  }

  function onRightClick(event, node) {
    event.preventDefault();
    event.stopPropagation();
    if (node.type === COMPOSITION) {
      setRight({
        mouseX: event.clientX - 360,
        mouseY: event.clientY - 8,
      });
    }
  }

  function onClose() {
    setRight(initialRightClickStateCreator());
  }

  // Initialize state in this hook
  useEffect(() => {
    // Populate tree items state with datasets
    if (items.length === 0 && datasets.length > 0) {
      setItems(datasets);
    } else if (datasets.length > 0 && items.length !== datasets.length) {
      // Update datasets, after adding a new dataset
      setItems(datasets);
    }
  }, [datasets, items.length]);

  const getTreeItemsFromData = (treeItems) => {
    if (Array.isArray(treeItems) && treeItems.length <= 0) return;

    return treeItems?.map((treeItemData) => {
      let items = undefined;
      if (treeItemData.items && treeItemData.items.length > 0) {
        items = getTreeItemsFromData(treeItemData.items);
      }

      const hidden =
        !nodes.includes(treeItemData?.id) &&
        selectedNodeId !== treeItemData?.id &&
        treeItemData?.type === COMPOSITION;

      const labelIcon =
        treeItemData?.type === MECHANISM ? (
          <CircleIcon />
        ) : treeItemData?.type === COMPOSITION ? (
          <FileIcon />
        ) : (
          <ShapeArrowToolIcon />
        );

      return (
        <StyledTreeItem
          dataset={treeItemData?.id}
          nodeId={treeItemData?.id}
          labelText={treeItemData?.label}
          labelIcon={labelIcon}
          children={items}
          key={treeItemData?.id}
          selected={treeItemData?.id === selectedNodeId}
          onNodeSelect={onNodeSelect}
          onShowPanel={onRightClick}
          hidden={hidden}
          type={treeItemData?.type}
        />
      );
    });
  };

  const functionValues = (label, value) => (
    <Box className={[classes.block, classes.paddingXS]}>
      <Typography component="label">{label}</Typography>
      <Typography className="function" noWrap>
        {value}
      </Typography>
    </Box>
  );

  const treeRef = React.createRef();

  const id = open ? 'simple-popper' : undefined;

  return (
    <>
      <TreeView
        className="scrollbar treeViewer"
        defaultExpanded={nodes}
        defaultCollapseIcon={
          <ArrowDropDownIcon fontSize="small" color="disabled" />
        }
        defaultExpandIcon={<ArrowRightIcon fontSize="small" color="disabled" />}
        defaultEndIcon={false}
        ref={treeRef}
        expanded={nodes}
        onNodeToggle={onNodeToggle}
        selected={[selectedNodeId]}
        onNodeSelect={(e, node_ids) => {
          handleClick(e, node_ids);
        }}
      >
        {getTreeItemsFromData(items)}
      </TreeView>
      <Popover
        id={id}
        open={open}
        anchorReference="anchorPosition"
        anchorPosition={
          right.mouseY !== null && right.mouseX !== null
            ? { top: right.mouseY, left: right.mouseX }
            : undefined
        }
        onClose={onClose}
        componentsProps={{
          backdrop: {
            invisible: true,
            onContextMenu: (event) => {
              event.preventDefault();
              event.stopPropagation();

              // close popover
              onClose();
            },
          },
        }}
        PaperProps={popperPaperProps}
      >
        <Box className={classes.popperHeader}>
          <Box>
            <FileIcon color="black" />
            <Typography component="strong" noWrap>
            {COMPOSITION_DTO.label}
            </Typography>
          </Box>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Stack spacing={1}>
          <Accordion className={classes.accordion}>
            <AccordionSummary
              expandIcon={
                <ExpandMoreIcon sx={{ width: '1rem', height: '1rem' }} />
              }
              aria-controls="panel1a-content"
              id={'panel1a-header' + id}
              sx={{
                paddingLeft: '0.5rem',
                paddingRight: '0.75rem',
                '& .MuiAccordionSummary-content': {
                  marginY: '0.5rem',
                },
              }}
            >
              <Box className={classes.block}>
                <Typography component="label">Function type</Typography>
                <Typography className="text" noWrap>
                  {COMPOSITION_DTO.type}
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography fontSize="0.875rem">
                {COMPOSITION_DTO.detail}
              </Typography>
            </AccordionDetails>
          </Accordion>

          {functionValues('ID', COMPOSITION_DTO.label)}

          <Box className={[classes.block, classes.paddingXS]}>
            <Typography component="label">Function</Typography>
            <Typography className="function" noWrap>
              <Typography component="strong" className={classes?.textColor}>
                {COMPOSITION_DTO.info.title}
              </Typography>
               {COMPOSITION_DTO.info.pnl}
              <Typography className={classes?.codeColor} component="strong">
                {COMPOSITION_DTO.info.sub}
              </Typography>
              {COMPOSITION_DTO.info.calc}
            </Typography>
          </Box>
          <Stack direction="row" spacing={1}>
            {COMPOSITION_DTO.stats.map(stats => functionValues(stats.label, stats.value))}
          </Stack>
        </Stack>
      </Popover>
    </>
  );
};

export default InstancesTreeView;
