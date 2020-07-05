import React,{ useState, useEffect } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';

// Generate Sales Data
function createData(time, amount) {
  return { time:time, amount:amount };
}
// function createData(id, date, name, shipTo, paymentMethod, amount) {
//   return { id, date, name, shipTo, paymentMethod, amount };
// }

const rows = [

  createData('00:00', 0),
  // createData('03:00', 300),
  // createData('06:00', 600),
  // createData('09:00', 800),
  // createData('12:00', 1500),
  // createData('15:00', 2000),
  // createData('18:00', 2400),
  // createData('21:00', 2400),
  // createData('16 June', 350),
];

function setDate(date){
  let year = date.slice(0,4);
  let month = date.slice(5,7) ;
  let _date = date.slice(8,10) ;
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  return ( parseInt(_date) + " " + monthNames[parseInt(month)-1].slice(0,3)  + " , " + year ).toString() ;
}


export default function Chart(props) {
  const theme = useTheme();
  const [orders, setOrders] = useState({
    orders: "Loading..."
  })
  console.log(orders.orders) ;
  useEffect(() => {
    if (props.orders && orders.orders === "Loading...") {
      setOrders({
        orders: props.orders
      })
      console.log(props.orders) ;
    }
  },[props.orders]) ;
  let data = rows ;
  if( orders.orders !== "Loading..." ){
    data = []
    console.log(orders.orders) ;
    for(let i=0;i<orders.orders.length;i = i+1){
      if( !data[orders.orders[i]] ){
        let val = createData( setDate(orders.orders[i].date.split("T")[0]),orders.orders[i].product.price ) ;
        data.push({ val })
      } else {
        data[orders.orders[i].amount] = data[orders.orders[i].amount] + orders.orders[i].product.price ;
      }
    }
    console.log(data) ;
    // data = orders.orders.map((order,index) => {
    //   return createData(setDate(order.date.split("T")[0]),order.product.price)
    // })
    // data.push(createData("djfh",100)) ;
  }
  return (
    <React.Fragment>
      <Title>Sales per Day</Title>
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
              Sales ($)
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}