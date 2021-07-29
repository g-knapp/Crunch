import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const personalTheme = createMuiTheme({
  palette: { 
    type: "dark",
    primary: {
      main: '#ffffff',
    },
  }
})

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

function GroupSearch({ searchTerm, setTerm}) {
  const classes = useStyles();

    const searchField = (
      <ThemeProvider theme={personalTheme}>
        <TextField
          className = {classes.root}
          id="search"
          label="Search"
          aria-label="search"
          data-testid="search-sidebar"
          value={searchTerm}
          onChange={(event) => {
            setTerm(event.target.value);
          }}
          color = "primary"
        />
      </ThemeProvider>
      );
      return (
        <div>
          <div>
            {searchField}
          </div>
        </div>
    );
}

GroupSearch.propTypes = {
    searchTerm: PropTypes.string.isRequired,
    setTerm: PropTypes.func.isRequired,
  };
  
  export default GroupSearch;
