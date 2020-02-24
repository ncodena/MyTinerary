import React from 'react';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import SearchIcon from '@material-ui/icons/Search';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import "../style/Landing.css";




const Footer = () => {


    return (
        
        <div className="footer">
            
                <BottomNavigationAction label="Search by city" value="search" icon={<SearchIcon />} />
                <BottomNavigationAction label="Your favorites" value="favorites" icon={<FavoriteIcon fontSize="small" />} />
                <BottomNavigationAction label="Log out" value="logout" icon={<ExitToAppIcon />} />
            
        </div>
        

    )
}

export default Footer