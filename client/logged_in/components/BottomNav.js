import * as React from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import classNames from "classnames";
import PropTypes from "prop-types";
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import QuizIcon from '@mui/icons-material/Quiz';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import {withStyles} from '@mui/styles'
import { Link } from 'react-router-dom';

const styles = (theme) => ({
  paper: {
    boxShadow: theme.shadows[6],
    backgroundColor: theme.palette.common.white,
    color: theme.palette.secondary.light

  },
  bottomNav: {
    boxShadow: theme.shadows[6],
    backgroundColor: theme.palette.common.white,
    color: theme.palette.secondary.light

  },
  root: {
    boxShadow: theme.shadows[6],
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.secondary.contrastText

  }


})

function BottomNav(props) {
  const { classes } = props
  const pathname = useLocation()
  const [value, setValue] = React.useState(pathname);


  return (
    <Box sx={{ width: 700 }}>
      <Paper className={classes.paper} sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: "#FBAb5f"}} display="flex" elevation={6} justifycontent="flex-start">
      <BottomNavigation
        sx={{ color: 'secondary'}}
        className={classes.root}
        showLabels={true}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);

        }}

      >
        <BottomNavigationAction component={Link} to="/home" label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction component={Link} to="/account" label="Settings" icon={<SettingsIcon />} />
        <BottomNavigationAction component={Link} to="/quiz" label="Mentor Match" icon={<QuizIcon />} />
      </BottomNavigation>
      </Paper>
    </Box>
  );
}

BottomNav.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })((BottomNav));