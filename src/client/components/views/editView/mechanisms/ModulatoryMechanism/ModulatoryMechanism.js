import * as React from 'react';
import MechSimple from '../shared/MechSimple';
import MechMetadata from './MechMetadata';
import { withStyles } from '@mui/styles';
import vars from '../../../../../assets/styles/variables';

const {
  draggableBg,
  listItemActiveBg,
  textWhite,
  chipTextColor,
  chipBorderColor,
} = vars;

const commonStyles = {
  background: `${textWhite} !important`,
  border: `0.0975rem solid ${listItemActiveBg} !important`,
  borderRadius: '0.125rem !important',
};

const styles = () => ({
  root: {
    '& .react-draggable': {
      background: draggableBg,
      border: `0.125rem solid ${chipBorderColor}`,
      borderRadius: '0.75rem',
      display: 'flex !important',
      alignItems: 'center',
      justifyContent: 'center',

      '&:hover': {
        borderColor: listItemActiveBg,
      },
    },

    '& .MuiChip-root': {
      background: chipBorderColor,
      borderRadius: '0.75rem',
      padding: '0 0.5rem',
      display: 'flex',
      left: 0,
      position: 'absolute',
      color: chipTextColor,
      top: '-1.75rem',
      alignItems: 'center',
      height: '1.5rem',
      letterSpacing: '-0.005rem',
      fontWeight: 510,
      fontSize: '0.8125rem',
      lineHeight: '1.25rem',
      flexDirection: 'row-reverse',

      '& .MuiChip-label': {
        padding: 0,
      },

      '& .MuiChip-icon': {
        margin: '0 0 0 0.25rem',
      },
    },
  },

  selected: {
    '&:before': {
      left: 0,
      ...commonStyles,
    },

    '&:after': {
      right: 0,
      ...commonStyles,
    },

    '& .MuiChip-root': {
      background: listItemActiveBg,
    },

    '& .react-draggable': {
      borderColor: listItemActiveBg,
    },
  },
});

class ModulatoryMechanism extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      width: 442,
      height: 192,
      x: 0,
      y: 0,
    };
    this.changeVisibility = this.changeVisibility.bind(this);
  }

  changeVisibility() {
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    const { expanded } = this.state;

    return (
      <>
        {expanded ? (
          <MechMetadata
            changeVisibility={this.changeVisibility}
            {...this.props}
          />
        ) : (
          <MechSimple
            changeVisibility={this.changeVisibility}
            {...this.props}
          />
        )}
      </>
    );
  }
}

export default withStyles(styles)(ModulatoryMechanism);
