import * as React from 'react';
import TextField from '@mui/material/TextField';
import { withStyles } from '@mui/styles';

const styles = ((theme) => ({
	root: {
	  	overflow: 'hidden',
	  	display: 'flex',
	  	alignItems: 'stretch',
        '& label.Mui-focused': {
          color: 'green',
        },
        '& .MuiInput-underline:after': {
          borderBottomColor: 'green',
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'red',
          },
          '&:hover fieldset': {
            borderColor: 'yellow',
          },
          '&.Mui-focused fieldset': {
            borderColor: 'green',
          },
        },
    input: {
            borderRadius: 4,
            color: '#ffffff',
            position: 'relative',
            backgroundColor: 'white',
            border: '1px solid #ced4da',
            fontSize: 16,
            width: 'auto',
            padding: '10px 12px',
            transition: theme.transitions.create(['border-color', 'box-shadow']),
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
            '&:focus': {
              borderColor: 'white',
            },
        }
	},
}));

class InputNode extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            label: '',
        };
    }

	render() {
    const { classes, top } = this.props;
		return (
			<form className={classes.root} noValidate autoComplete="off" style={{position: 'absolute', top: top + "px", left: '0px', marginLeft: '0px', paddingLeft: '0px'}}>
        <TextField
            className={classes.input}
            id="standard-basic"
            label="Standard"
            onChange={(e) => this.setState({label: e.target.value})}
        />
      </form>
		);
	}
}

export default withStyles(styles)(InputNode);