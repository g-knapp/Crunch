/* 
 * A little navbar action for navigating the website yanno
 */

import React from 'react';
import { useContext } from 'react';
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { PageContext } from '../pages/_app.js';
import LoginStatus from './LoginStatus';

const personalTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: '#FFFFFF'
    },
    secondary: {
      main: '#75A3CD',
    }

  }
})
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  signOut: {
    float: 'right',

  },
}));

export default function NavBar({ handleClick, hotLink, atHome }) {
  const classes = useStyles();
  const { page } = useContext(PageContext);
  const router = useRouter();
  const hot = "What's Hot?"
  const homeButton = (
    <Button href="/">Home</Button>
  );
  const prevButton = (
    <Button disabled={page[0] === 0 && page[1] === 6} onClick={() => handleClick('previous')}>◄</Button>
  );
  const nextButton = (
    <Button onClick={() => handleClick('forward')}>►</Button>
  );
  let whatHot;
  if (atHome) {
    whatHot = (
      <Button onClick={() => router.push(hotLink)}>{hot}</Button>
    );
  } else {
    whatHot = (<></>);
  }
  const crunchTitle = (
    <div align="center">
      <img href="/" width="500" src="/data/CrunchLogo.png" alt="Munch" />
    </div>
  );
  const submitButton = (
    <Button href="/submit">Submit a Post</Button>
  );


  return (
    <div width="1000px" className={classes.root}>
      <ThemeProvider theme={personalTheme}>
        <AppBar position="fixed" color="secondary">
          {crunchTitle}
          <Toolbar >
            {homeButton}
            {prevButton}
            {nextButton}
            {submitButton}
            {whatHot}
            <p className={classes.title} />
            <LoginStatus align="right" />
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </div>
  );
}

NavBar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  hotLink: PropTypes.string,
  atHome: PropTypes.bool,
};