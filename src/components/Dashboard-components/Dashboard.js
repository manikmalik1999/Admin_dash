import React, { useState, useEffect } from 'react';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


import { mainListItems, secondaryListItems } from './listItems';
import Chart from './Chart';
import Deposits from './Deposits';
import Orders from './Orders';
import PendingProducts from "../PendingProducts/PendingProducts";
import PendingProductDetail from "../PendingProducts/PendingProductDetail/PendingProductDetail";
import { Route } from "react-router-dom";
import { default as LLink } from "react-router-dom/Link";
import Categories from './Categories/categories';
import AddCategory from './Categories/Add-Category/AddCategory';
import Reviews from './Reviews/Reviews';
import Axios from 'axios';
import Cookies from "universal-cookie";
import { Redirect } from "react-router-dom";
import { Snackbar, SnackbarContent } from "@material-ui/core";
import Sellers from "../Sellers/Sellers";
import IndividualProdReview from '../Dashboard-components/Reviews/IndividualProdReview/IndividualProdReview';
import SellerDetails from "../Sellers/Seller/SellerDetails";
// import AllProducts from '../AllProducts/AllProducts';
const cookies = new Cookies();


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" style={{ margin: "auto 24px", position: "absolute", right: "12px", bottom: "6px" }}>
      {'Copyright © '}
      <Link color="inherit" href="https://engagenreap.com/">
        Enr
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    backgroundSize: "cover",
    background: 'linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.7)) , url("https://wallpaperaccess.com/full/256531.jpg") no-repeat center center',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    boxShadow: "2px 3px 8px lightgrey",
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

const Dashboard = (props) => {
  //states
  const [loginSnack, setLoginSnack] = useState({
    show: true
  })
  const [snack, setSnack] = useState({
    show: false,
    message: "",
    color: "lightBlue"
  })
  const [open, setOpen] = React.useState(true);
  const [orders, setOrders] = useState({
    orders: null
  })
  const [sellers, setSellers] = useState({
    sellers: null
  })
  const [pending, setPending] = useState({
    pending: "+"
  })
  const [redirect, setRedirect] = useState({
    to: null
  })
  const [http, setHttp] = useState({
    set: false
  })
  const [notification, setNotification] = useState({
    notification: true
  })


  //state Handlers
  const snackbarClose = (event) => {
    setSnack({
      show: false
    })
  }
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };


  //consts
  const classes = useStyles();
  const token = cookies.get("Token");
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  //redirects nullified for now
  // let redirect = null;
  // if (!token && !(props.location.state && props.location.state.justLoggedIn) && false) {
  //   redirect = <Redirect to={{
  //     pathname: '/login',
  //     state: { message: null }
  //   }}
  //   />;
  // }

  //Snacks
  if (loginSnack.show) {
    setLoginSnack({
      show: false
    })
    setSnack({
      show: true,
      message: "Logged In",
      color: "Green"
    })
  }
  //logout handler
  const logoutHandler = () => {
    // console.log("logout");
    cookies.remove('Token', { path: '/' });
    setRedirect({
      to: <Redirect to="/login" />
    })
    setLoginSnack({
      show: true
    })
  }
  const removeNotificationHandler = () => {
    setNotification({
      notification : false 
    })
  }

  //data from orders
  useEffect(() => {
    Axios.get("https://limitless-lowlands-36879.herokuapp.com/orders", {
      headers: {
        "Authorization": "Bearer " + token
      }
    })
      .then(response => {
        setOrders({
          orders: response.data.orders
        })
        // setHttp({
        //   set: true
        // })
      })
      .catch(err => {
        console.log(err);
      });
    Axios.get("https://limitless-lowlands-36879.herokuapp.com/products", {
      headers: {
        "Authorization": "Bearer " + token
      }
    })
      .then(response => {
        const prods = response.data.products.filter(product => {
          if (product.approved === "pending") {
            return true;
          }
          return false;
        })
        setPending({
          pending: prods.length || 0
        })
      })
      .catch(err => {
        console.log(err);
      });
    Axios.get("https://limitless-lowlands-36879.herokuapp.com/sellers", {
      headers: {
        "Authorization": "Bearer " + token
      }
    })
      .then(response => {
        setSellers({
          sellers: response.data.users
        })
      })
      .catch(err => {
        console.log(err);
      })
  }, []);
  return (
    <div className={classes.root} >
      {redirect.to}
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={snack.show}
        autoHideDuration={4000}
        onClose={snackbarClose}
        bodystyle={{ backgroundColor: 'teal', color: 'coral' }}
        message={<span id="message-id">{snack.message}</span>}
      >
        <SnackbarContent style={{
          backgroundColor: snack.color,
        }}
          action={[
            <button key={"close"} onClick={snackbarClose} style={{ background: "none", border: "none", color: "white" }}>x</button>
          ]}
          message={<span id="client-snackbar">{snack.message}</span>}
        />
      </Snackbar>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)} style={{ background: '#2E3B55' }}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            style={{ color: "white" }}
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" display="inline" variant="h6" color="inherit" noWrap className={classes.title}>
            Enr Consultancies
          </Typography>
          <Typography component="h1" align="right" display="inline" variant="h6" color="inherit" noWrap className={classes.title}>
            {/* <Button variant="contained" color="primary">
                Add Category
              </Button> */}
            <AddCategory />
          </Typography>

          <Tooltip title="Pending Products" TransitionComponent={Zoom} >
            <IconButton color="inherit">
              <LLink to="/dashboard/products" >
                {notification.notification ?
                  <Badge badgeContent={pending.pending} color="secondary">
                    <NotificationsIcon style={{ color: "white" }} onClick={removeNotificationHandler} />
                  </Badge> :
                  <Badge color="secondary">
                    <NotificationsIcon style={{ color: "white" }} />
                  </Badge>
                }
              </LLink>
            </IconButton>
          </Tooltip>
          <Tooltip title="Logout" TransitionComponent={Zoom} >
            <IconButton onClick={logoutHandler}>
              <ExitToAppIcon style={{ color: "white" }} />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon style={{ color: "white", outline: "none" }} />
          </IconButton>
        </div>
        <List>{mainListItems}</List>
        <Divider style={{ background: "lightgrey" }} />
        <List onClick={logoutHandler}>{secondaryListItems}</List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>

          {/* main-dashboard */}
          <Route path="/dashboard" exact>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8} lg={9}>
                <Paper className={fixedHeightPaper}>
                  <Chart orders={orders.orders} />
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Paper className={fixedHeightPaper}>
                  <Deposits orders={orders.orders} />
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <Orders orders={orders.orders} onlyOrders={false} />
                </Paper>
              </Grid>
            </Grid>
          </Route>
          <Grid container spacing={3}>
            <Box pt={4}>
              <Copyright />
            </Box>
          </Grid>

          {/* pending-products */}
          <Route path="/dashboard/products" exact component={PendingProducts} />

          {/* All - Products
          <Route path="/dashboard/products" exact component={AllProducts} /> */}


          {/* Pending Product Details */}
          <Route path="/dashboard/pending-product/:id" exact component={PendingProductDetail} />

          {/* Seller Details */}
          <Route path="/dashboard/sellers/:id/:name/:email" component={SellerDetails} />

          {/* categories section */}
          <Route path="/dashboard/sellers" exact>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Sellers sellers={sellers.sellers} />
              </Paper>
            </Grid>
          </Route>

          {/* categories section */}
          <Route path="/dashboard/categories" exact>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Categories />
              </Paper>
            </Grid>
          </Route>

          {/* Individual Category section */}
          <Route path="/dashboard/categories/:category" exact component={PendingProducts} />

          {/* Reviews section */}
          <Route path="/dashboard/reviews" exact>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Reviews />
              </Paper>
            </Grid>
          </Route>
          {/* All Orders */}
          <Route path="/dashboard/orders">
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Orders orders={orders.orders} onlyOrders={true} />
              </Paper>
            </Grid>
          </Route>
          {/* Pending Product Details */}
          <Route path="/dashboard/reviews/:id" exact component={IndividualProdReview}>
          </Route>
        </Container>
      </main>
    </div>
  );
}

export default Dashboard;