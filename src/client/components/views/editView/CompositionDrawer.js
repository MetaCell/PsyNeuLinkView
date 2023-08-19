import React from 'react';
import {
  Drawer,
  Typography,
  Box,
  List,
  ListItem,
  IconButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import COMP from '../../assets/svg/comp.svg';
import CLOSE from '../../assets/svg/close.svg';
import DETECT from '../../assets/svg/detect.svg';
import AddToVisualMenu from './shared/AddToVisualMenu';

class CompositionDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      value: ['Composition 2'],
    };

    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  toggleDrawer() {
    this.setState({ ...this.state, open: false });
  }

  handleMenuValueChange(id) {
    let newValue = [...this.state.value];

    if (newValue.includes(id)) {
      newValue.splice(newValue.indexOf(id), 1);
    } else {
      newValue.push(id);
    }

    this.setState({
      ...this.state,
      value: newValue,
    });
  }

  compositionElement(index, elementInfo) {
    const { variant, node, nodeDescription } = elementInfo;
    return (
      <ListItem
        secondaryAction={
          <IconButton color="primary" edge="end">
            <img src={DETECT} alt="" />
          </IconButton>
        }
        key={`${index}_${node}`}
      >
        <ListItemIcon>
          <Box className={`icon ${variant}`} />
        </ListItemIcon>
        <ListItemText primary={node} secondary={nodeDescription} />
      </ListItem>
    );
  }

  render() {
    const { open } = this.state;
    return (
      <Drawer
        anchor="right"
        variant="persistent"
        open={open}
        onClose={this.toggleDrawer}
      >
        <img
          onClick={this.toggleDrawer}
          className="close-icon"
          src={CLOSE}
          alt=""
        />
        <Box className="drawer-header">
          <img src={COMP} alt="" />
          <Typography component="h4">Comp1</Typography>
          <Typography>Mechanism Composition</Typography>
        </Box>

        <Box className="drawer-body">
          <List disablePadding className="drawerList">
            {this.compositionElement('1', {
              variant: 'green-integrator',
              node: 'A1',
              nodeDescription: 'Integrator Mechanism',
            })}
            {this.compositionElement('1', {
              variant: 'red',
              node: 'B1',
              nodeDescription: 'Integrator Mechanism',
            })}
          </List>

          <List disablePadding className="drawerList">
            {this.compositionElement('1', {
              variant: 'composition',
              node: 'A1 →	B1',
              nodeDescription: 'Processing projection',
            })}
          </List>

          <AddToVisualMenu
            value={this.state.value}
            onChange={this.handleMenuValueChange}
          />
        </Box>
      </Drawer>
    );
  }
}

export default CompositionDrawer;
