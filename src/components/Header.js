import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => {
  return {
    // Class names (toolbarMargin etc.) are custom
    // Just anything you will refer to later
    toolbarMargin: {
      // Spread operator gets theme.mixins.toolbar things from Theme.js
      marginBottom: '7.5em',
    },
    tabContainer: {
      marginLeft: 'auto',
    },
    tab: {
      minWidth: 10,
      marginLeft: '25px',
      '&:hover': {
        opacity: 1,
      },
    },
  };
});

export default function PrimarySearchAppBar() {
  const classes = useStyles();

  return (
    <>
      <AppBar className={classes.appbar} style={{ background: '#FFF' }}>
        <Toolbar disableGutters style={{ padding: '1.5em' }}></Toolbar>
      </AppBar>
      <div className={classes.toolbarMargin} />
    </>
  );
}
