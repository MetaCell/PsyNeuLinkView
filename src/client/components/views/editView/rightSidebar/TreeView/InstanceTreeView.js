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
import { makeStyles } from '@mui/styles';
import { COMPOSITION_DTO } from '../dataset';
import { PNLClasses } from '../../../../../../constants';
import vars from '../../../../../assets/styles/variables';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ModelSingleton from '../../../../../model/ModelSingleton';
import { MetaDataInput } from '../../mechanisms/shared/FunctionInput';

import { useDispatch } from 'react-redux';
import { setModelTree } from '../../../../../redux/actions/general';
import { CallbackTypes } from '@metacell/meta-diagram';
import AddToVisualMenu from '../../shared/AddToVisualMenu';

export const GRAPH_SOURCE = 'GRAPH';
export const TREE_SOURCE = 'TREE';
const { COMPOSITION, MECHANISM } = PNLClasses;

const {
  cardBG,
  popperBG,
  nodeSecLabelColor,
  dropdownTextColor,
  functionTextColor,
  functionCodeColor,
  dropdownBorderColor,
  listSelectedTextColor,
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
    height: '7.5rem',
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

  // eslint-disable-next-line no-unused-vars
  const dispatch = useDispatch();
  const [nodes, setNodes] = useState([]);
  const [items, setItems] = useState(datasets);
  const [panelNode, setPanelNode] = useState(null);
  const [selectedNodes, setSelectedNodes] = useState([]);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [panelNodeName, setPanelNodeName] = useState(panelNode?.getOption('name') || '');

  const modelHandler = ModelSingleton.getInstance();

  const onNodeSelect = (e, nodeId) => {
    setSelectedNodeId(nodeId);
  };

  const onNodeToggle = (e, nodeIds) => {
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
    if (e.target.className === 'MuiTreeItem-label') setSelectedNodes(nodes_ids);
  }

  function onRightClick(event, node) {
    event.preventDefault();
    event.stopPropagation();
    if (node.type === COMPOSITION) {
      const _nodes = ModelSingleton.getInstance().getMetaGraph().getNodes();
      _nodes.forEach((nestedNode) => {
        if (nestedNode.getID() === node.id) {
          setPanelNode(nestedNode);
        }
      });
      setRight({
        mouseX: event.clientX - 360,
        mouseY: event.clientY - 8,
      });
    }
  }

  function onClose() {
    setRight(initialRightClickStateCreator());
  }

  useEffect(() => {
      setItems(datasets);
  }, [datasets]);

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
    <Box key={value} className={[classes.block, classes.paddingXS]}>
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
            <MetaDataInput
              style={{ left: '10px' }}
              textAlign="left"
              value={panelNode?.getOption('name') || panelNodeName}
              onChange={(e) => {
                panelNode.setOption('id', e.target.value)
                panelNode.setOption('name', e.target.value)
                modelHandler.updateTreeModel();
                dispatch(setModelTree(modelHandler.getTreeModel()));
                setPanelNodeName(e.target.value);
                panelNode.flagUpdate(CallbackTypes.OPTIONS_UPDATED);
              }}
            />
          </Box>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Stack spacing={1}>
          <AddToVisualMenu
            onChange={(loggable) => {
              panelNode?.setLoggable(loggable.key, loggable.value, true)
            }}
            options={panelNode ? panelNode.getOption('Loggables') : []}/>
        </Stack>
      </Popover>
    </>
  );
};

export default InstancesTreeView;
