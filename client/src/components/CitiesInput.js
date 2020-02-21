import React from 'react';
import { createStyles, makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import '../style/Cities.css'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      '& > *': {
        width: 200,
      },
    },
  }),
);

export default function CitiesInput(props) {
  const classes = useStyles();

  console.log("props: ",props)

  const {filterData} = props


  return (
    <form className={classes.root} noValidate autoComplete="off">
        <p className="previousMessage">Find your favourite city</p>
        <div className="inputContainer">
            <TextField id="standard-basic" label="Search by city or country" onChange={filterData} />
        </div>
    </form>
  );
}