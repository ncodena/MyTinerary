import React from 'react';
import { createStyles, makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

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
      <TextField id="standard-basic" label="Search by city or country" onChange={filterData} />
    </form>
  );
}