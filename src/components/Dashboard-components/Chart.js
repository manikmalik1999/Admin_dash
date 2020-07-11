import React, { useState, useEffect } from 'react';
// import "../../../node_modules/semantic-ui-css/semantic.min.css"

import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Grid } from "@material-ui/core";
import Title from './Title';
import { Dropdown } from 'semantic-ui-react';


function createData(time, amount) {
  return { time: time, amount: amount };
}

const categoryOptions = [
  { key: 'af', value: 'all', text: 'All' },
  { key: 'ax', value: 'sports', text: 'Sports' },
  { key: 'al', value: 'fashion', text: 'Fashion' },
  { key: 'dz', value: 'electronics', text: 'Electronics' },
]

const getLastDates = (back) => {
  let date = new Date();
  date.setDate(date.getDate() - back);
  let yyyy = date.getFullYear();
  let mm = (date.getMonth() + 1);
  if (mm <= 9)
    mm = "0" + mm;
  let dd = date.getDate();
  if (dd <= 9)
    dd = "0" + dd;

  let finalDate = yyyy + "-" + mm + '-' + dd;
  return finalDate;
}

function setDate(date) {
  let year = date.slice(0, 4);
  let month = date.slice(5, 7);
  let _date = date.slice(8, 10);
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  return (parseInt(_date) + " " + monthNames[parseInt(month) - 1].slice(0, 3));
  // + " , " + year ).toString() ;
}


export default function Chart(props) {
  const theme = useTheme();
  const [orders, setOrders] = useState({
    orders: "Loading..."
  })
  const [category,setCategory] = useState({
    category : "all" 
  })
  // console.log(orders.orders) ;
  const lastDates = [];
  for (let back = 6; back >= 0; --back) {
    lastDates.push(getLastDates(back));
  }
  const handleChange = (event, { name, value }) => {
    // console.log(value) ;
    setCategory({
      category : value
    })
  }

  // console.log(lastDates) ;
  useEffect(() => {
    if (props.orders && orders.orders === "Loading...") {
      setOrders({
        orders: props.orders
      })
      // console.log(props.orders);
    }
  }, [props.orders]);
  let data = lastDates.map(date => {
    return createData(date, 0);
  })
  if (orders.orders !== "Loading...") {
    // console.log(data);
    // console.log(orders.orders);
    for (let i = 0; i < orders.orders.length; ++i) {
      for (let j = 0; j < 7; j = j + 1) {
        if (orders.orders[i].date.split("T")[0] === data[j].time && ( category.category === 'all' || orders.orders[i].product.category === category.category) ) {
          data[j].amount += orders.orders[i].product.price * orders.orders[i].quantity;
        }
      }
    }
  }
  for (let i = 0; i < 7; ++i) {
    data[i] = createData(setDate(data[i].time), data[i].amount)
  }
  return (
    <React.Fragment>
      <Grid container spacing={3} >
        <Grid item lg={4} sm={4}>
          <Title>Sales per Day</Title>
        </Grid>
        <Grid item lg={5} >
        </Grid>
        <Grid item lg={3} sm={3}>
          <Dropdown
            placeholder='Select Category'
            fluid
            search
            selection
            defaultValue={category.category}
            onChange={handleChange}
            options={categoryOptions}
          />
        </Grid>
      </Grid>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              Sales (£)
            </Label>
          </YAxis>
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Line type="monotone" dataKey="amount" stroke="#82ca9d" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}