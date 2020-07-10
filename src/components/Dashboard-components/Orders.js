import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';


const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(4n+3)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:nth-of-type(4n+4)': {
      backgroundColor: theme.palette.action.hover,
    }
  },
}))(TableRow);

function setDate(date) {
  let year = date.slice(0, 4);
  let month = date.slice(5, 7);
  let _date = date.slice(8, 10);
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  return (parseInt(_date) + " " + monthNames[parseInt(month) - 1].slice(0, 3) + " , " + year);
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));



const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function createData(id, date, product, customer, category, quantity, price, amount, email, pId, cId, oId) {
  return {
    id,
    date,
    product,
    customer,
    quantity,
    amount,
    history: [
      { id: id + "xyzz", email: email, price: price, category: category, pId: pId, cId: cId, oId: oId }
    ]
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <StyledTableRow className={classes.root}>
        <TableCell component="th" scope="row">
          {row.date}
        </TableCell>
        <TableCell>{row.product}</TableCell>
        <TableCell>{row.customer}</TableCell>
        <TableCell>{row.quantity}</TableCell>
        <TableCell>{row.amount}</TableCell>
        <TableCell style={{ float: "right" }}>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </StyledTableRow>
      <StyledTableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <p style={{fontWeight:"600",textAlign:"center",fontSize:"16px"}} >Details</p>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Price/item</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Customer Email</TableCell>
                    <TableCell align="right">Product ID</TableCell>
                    <TableCell align="right">Customer ID</TableCell>
                    <TableCell align="right">Order ID</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.id}>
                      <TableCell component="th" scope="row">
                        {historyRow.price}
                      </TableCell>
                      <TableCell>{historyRow.category}</TableCell>
                      <TableCell>{historyRow.email}</TableCell>
                      <TableCell align="right">{historyRow.pId}</TableCell>
                      <TableCell align="right">{historyRow.cId}</TableCell>
                      <TableCell align="right">{historyRow.oId}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </StyledTableRow>
    </React.Fragment>
  );
}



export default function Orders(props) {
  // console.log(props.orders) ;

  const classes = useStyles();
  const [orders, setOrders] = useState({
    orders: "Loading..."
  })
  // console.log(lastDates) ;
  let ordersOnly = false;
  useEffect(() => {
    if (props.orders && orders.orders === "Loading...") {
      setOrders({
        orders: props.orders
      })
    }
  }, [props.orders])
  let data = [createData("abcd", "Loading...", "Loading...", "Loading...", "Loading...", "Loading...", "Loading...", "Loading...", "Loading...", "Loading...", "Loading...", "Loading...")];
  let seeMore = false;
  if (orders.orders !== "Loading...") {
    data = orders.orders.map((order, index) => {
      return createData(index, setDate(order.date.split("T")[0]), order.product.name, order.userId.name, order.product.category, order.quantity, order.product.price, order.quantity * order.product.price,
        order.userId.email, order.product._id, order.userId._id, order._id)
    })
    data.reverse();
    if (props.onlyOrders) {
      ordersOnly = props.onlyOrders
    }
    if (data.length > 6 && !ordersOnly) {
      data = data.slice(0, 6);
      seeMore = true;
    }
  }
  // console.log(data) ;
  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Sale Amount</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
      {seeMore && !ordersOnly &&
        <div className={classes.seeMore}>
          <Link style={{ color: "#3f51b5" }} to="/dashboard/orders">
            See more Orders / Details
          </Link>
        </div>
      }
    </React.Fragment>
  );
}