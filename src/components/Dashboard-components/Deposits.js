import React, { useState, useEffect } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import Axios from 'axios';
import Cookies from "universal-cookie";

const cookies = new Cookies();

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});


export default function Deposits(props) {
  const classes = useStyles();
  const [deposit, setDeposit] = useState({
    revenue: "Loading..."
  })
  useEffect(() => {
    if (props.revenue && deposit.revenue === "Loading...") {
      setDeposit({
        revenue: props.revenue
      })
    }
  })
  let tempDate = new Date();
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  let date = monthNames[tempDate.getMonth()] + " " + tempDate.getDate() + "," + tempDate.getFullYear();

  return (
    <React.Fragment>
      <Title>Recent Revenue Annual</Title>
      <Typography component="p" variant="h4">
        {deposit.revenue}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        updated on {date}
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
}