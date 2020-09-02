import React from 'react';
import {Fragment} from 'react';
import { Link } from 'react-router-dom';

import ActivitiesCarousel from './ActivitiesCarousel';
import CommentForm from './CommentForm';
import Comments from './Comments';

import { makeStyles } from '@material-ui/core/styles';
// import grey from '@material-ui/core/colors/grey';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import ExploreIcon from '@material-ui/icons/Explore';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import '../style/Itineraries.css';


// import EuroIcon from '@material-ui/icons/Euro';

const useStyles = makeStyles(theme => ({
  
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
              <h3 className="activitiesBanner">Activities</h3>
              {/* <ActivitiesCarousel itinerary={itinerary} key={itinerary._id}/> */}
              <ActivitiesCarousel itinerary={itinerary} key={itinerary._id}/>
            </Fragment>
          )}
  };

  const displayComentForm = (props) => {
    const {itinerary} = props
    if (setOpen) {
        return (
            <CommentForm itinerary={itinerary} key={itinerary._id}/>
            )
        }
  };

  const displayComments = (props) => {
    const {itinerary} = props
    if (setOpen) {
        return (
            <Comments itinerary={itinerary} key={itinerary._id}/>
            )
        }
  };

  
  return (
    <div className="unit">
    <Card className="ItineraryCard">
      <CardHeader
        action={
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
        }
        title={itinerary.title}
      />
      <CardMedia className="imageContainer" title="itinerary_image">
        <img src={itinerary.img} alt='itinerary' className="itineraryImage"></img>
      </CardMedia>
      <CardContent>
        <Typography variant="body2" className="description" color="textSecondary" component="p">
          {itinerary.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Typography variant="subtitle2" color="textSecondary" component="h6" className="plusInfo">
        <strong>Rating:</strong>{' ' + itinerary.rating}
        </Typography>
        <Typography variant="subtitle2" color="textSecondary" component="h6" className="plusInfo">
        <strong>Duration:</strong>{' ' + itinerary.duration}
        </Typography>
        <Typography variant="subtitle2" color="textSecondary" component="h6" className="plusInfo">
        <strong>Price:</strong>{' ' + itinerary.price}
        </Typography>
      </CardActions>
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <CardContent>
          {displayActivities(props)} 
          {displayComentForm(props)}
          {displayComments(props)}
        </CardContent>
      </Collapse>
      <div className="links">
        <Link to={'/'}>Back to Cities</Link>
        <div onClick={handleExpandClick} aria-label="show more"> 
          {isOpen ?  '  Read Less':  '  Read More'}
          </div>
      </div>
    </Card>
    </div>
  );
}
