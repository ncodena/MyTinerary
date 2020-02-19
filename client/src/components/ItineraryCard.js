import React from 'react';
import {Fragment} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import '../style/Itineraries.css';

import ActivitiesCarousel from './Carousel';
// import EuroIcon from '@material-ui/icons/Euro';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function ItineraryCard(props) {

  const classes = useStyles();

  const {itinerary} = props

  console.log(itinerary)


  const [isOpen, setOpen] = React.useState(false);

  const handleExpandClick = () => {
    setOpen(!isOpen);
  };

  const displayActivities = (props) => {


    const {itinerary} = props

    console.log(itinerary)

    if(setOpen) {
          return (
            <Fragment>
              <h3 className="activitiesBanner">Available activities</h3>
              <ActivitiesCarousel itinerary={itinerary} key={itinerary._id}/>
            </Fragment>
          )}
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
        }
        title={itinerary.title}
        subheader={itinerary.duration}
      />
      <CardMedia
        className={classes.media}
        image={itinerary.img}
        title="itinerary_image"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {itinerary.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>

      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <CardContent>
          {displayActivities(props)} 
        </CardContent>
      </Collapse>

      <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: isOpen,
          })}
          onClick={handleExpandClick}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>

    </Card>
  );
}
