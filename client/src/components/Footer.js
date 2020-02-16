import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import SearchIcon from '@material-ui/icons/Search';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import "../style/Landing.css"

const useStyles = makeStyles({
    root: {
      width: 400,
    },
});

const Footer = () => {

    const classes = useStyles();

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        
        <div className="footer">
            <BottomNavigation value={value} onChange={handleChange} showLabels className={classes.root}>
                <BottomNavigationAction label="Search by city" value="search" icon={<SearchIcon />} />
                <BottomNavigationAction label="Your favorites" value="favorites" icon={<FavoriteIcon fontSize="small" />} />
                <BottomNavigationAction label="Log out" value="logout" icon={<ExitToAppIcon />} />
            </BottomNavigation>
        </div>
        

    )
}

export default Footer