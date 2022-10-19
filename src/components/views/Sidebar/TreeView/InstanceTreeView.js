import React, { useCallback, useEffect, useState } from 'react';
import TreeView from '@mui/lab/TreeView';
import StyledTreeItem from './TreeViewItem';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { FileIcon, ShapeArrowToolIcon, CircleIcon, CloseIcon } from './Icons';
import { Box, IconButton, Popover, Typography } from '@mui/material';
import vars from '../../../../assets/styles/variables';
import { makeStyles } from '@mui/styles';

export const GRAPH_SOURCE = 'GRAPH';
export const TREE_SOURCE = 'TREE';
const {
  textWhite,
  popperBG,
  listSelectedTextColor,
  dropdownBg,
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
        fontWeight: 600,
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
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    background: cardBG,
    padding: '0.5rem',
    borderRadius: '0.5rem',
    // width: 'calc((100% - 0.125rem) / 3)',

    '& label': {
      display: 'block',
      fontWeight: '400',
      fontSize: '0.625rem',
      lineHeight: '0.625rem',
      letterSpacing: '-0.005rem',
      color: nodeSecLabelColor,
      textTransform: 'uppercase',
    },
  },
  blockWrapper: {
    display: 'flex',
    gap: '0 0.0625rem',
    flexWrap: 'wrap',

    '& .block': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      background: cardBG,
      padding: '0.5rem',

      // width: 'calc((100% - 0.125rem) / 3)',
    },
  },
  function: {
    '& .MuiTypography-root': {
      marginTop: '0.25rem',
      wordBreak: 'break-all',
      fontWeight: 600,
      '& strong': {},
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
    // background: ${nodeGreenBorderColor}
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
    if (nodeIds.length === 0) {
      return;
    }

    // if (nodes.length !== nodeIds.length && nodes[0] === nodeIds[0]) {
    //   var original = [...nodes];
    //   var newPath = [...nodeIds];
    //   while (original[0] === newPath[0]) {
    //     original.shift();
    //     newPath.shift();
    //   }
    //   nodeIds = original;
    // }

    // const node = window.datasets[dataset_id].splinter.tree_map.get(nodeIds[0]);
    // if (node && node.path !== undefined && node.path[0] !== nodes[0]) {
    //   setNodes(node.path);
    // }

    // console.log(nodeIds, 'nodeIds', e);

    setNodes(nodeIds);
  };

  function handleClick(e, nodes_ids) {
    if (e.target.className == 'MuiTreeItem-label') setSelectedNodes(nodes_ids);
  }

  function onRightClick(event, nodeId) {
    event.preventDefault();
    event.stopPropagation();

    setRight({
      mouseX: event.clientX - 360,
      mouseY: event.clientY - 8,
    });

    console.log(nodeId, event, 'rightClick');
  }

  function onClose() {
    setRight(initialRightClickStateCreator());
  }

  console.log(selectedNodeId, nodes, datasets, 'selectedNodes');

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
        treeItemData?.type === 'COMPOSITION';

      const labelIcon =
        treeItemData?.type === 'MECHANISM' ? (
          <CircleIcon />
        ) : treeItemData?.type === 'COMPOSITION' ? (
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
        />
      );
    });
  };

  const functionValues = (label, value) => (
    <Box className={classes.block}>
      <Typography component="label">{label}</Typography>
      <Typography>{value}</Typography>
    </Box>
  );

  const treeRef = React.createRef();

  const id = open ? 'simple-popper' : undefined;

  return (
    <>
      <TreeView
        className="scrollbar treeViewer"
        defaultExpanded={nodes}
        defaultCollapseIcon={<ArrowDropDownIcon color="disabled" />}
        defaultExpandIcon={<ArrowRightIcon color="disabled" />}
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
        // placement="left"
        anchorReference="anchorPosition"
        // anchorOrigin={{ horizontal: 'left' }}
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
              Composition 2
            </Typography>
          </Box>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box className={classes.blockWrapper}>
          {functionValues('Context', '12')}
          {functionValues('Size', '8.90')}
          {functionValues('Prefs', '44')}
          <Box className={classes.block}>
            <Typography component="label">Function</Typography>
            <Typography className="function">
              <Typography component="strong" className={classes?.textColor}>
                function
              </Typography>
              =pnl.
              <Typography className={classes?.codeColor} component="strong">
                Logistic
              </Typography>
              (gain=1.0, bias=-4)
            </Typography>
          </Box>
        </Box>
      </Popover>
    </>
  );
};

export default InstancesTreeView;
