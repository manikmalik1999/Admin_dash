import React, { Component } from 'react';
import Aux from "../../../hoc/Auxilliary";
import classes from "./PendingProductDetail.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Redirect } from "react-router-dom";
import Cookies from "universal-cookie";

// import AllProducts from '../../AllProducts/AllProducts';

const cookies = new Cookies();

class PendingProductDetail extends Component {
    state = {
        product: {},
        redirectToPendingProducts: false,
        value: null
    }

    componentDidMount() {
        if (this.props.match.params.id) {
            axios.get('https://limitless-lowlands-36879.herokuapp.com/products/' + this.props.match.params.id)
                .then(response => {
                    // console.log(response) ;
                    this.setState({ product: response.data.product });
                })
                .catch(err => {
                    console.log(err);
                });
        };
    };
    acceptHandler = () => {
        let token = cookies.get("Token");
        axios.get("https://limitless-lowlands-36879.herokuapp.com/admin/approve/true/" + this.state.product._id, {
            headers: {
                "Authorization": "Bearer " + token
            }
        })
            .then(res => {
                console.log("true") ;
                console.log(res) ;
                this.setState({ redirectToPendingProducts: true, value: true });
            })
            .catch(err => {
                console.log(err);
            })
    }
    denyHandler = () => {
        let token = cookies.get("Token");
        axios.get("https://limitless-lowlands-36879.herokuapp.com/admin/approve/false/" + this.state.product._id, {
            headers: {
                "Authorization": "Bearer " + token
            }
        })
            .then(res => {
                console.log("false") ;
                console.log(this.state.product._id) ;
                console.log(res) ;
                this.setState({ redirectToPendingProducts: true, value: false });
            })
            .catch(err => {
                console.log(err);
            })
    }
    render() {
        let redir = null;
        if (this.state.redirectToPendingProducts) {
            redir = <Redirect to={{
                pathname: "/dashboard/products",
                state: { value: this.state.value }
            }} />
        }
        return (
            <Aux>
                {redir}
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Container>
                            <Row>
                                <Col lg={4}>
                                    <img src={"https://limitless-lowlands-36879.herokuapp.com/" + this.state.product.image} style={{ margin: "12px" }} alt="" className={classes.Image} />
                                </Col>
                                <Col className={classes.VerLine}>
                                </Col>
                                <Col className={classes.Details} lg={6}>
                                    <Row>
                                        <Col>
                                            <h2>{this.state.product.name}</h2>
                                            <p>{this.state.product.description}</p>
                                            <h5>£ {this.state.product.price}</h5>
                                            <h6>{this.state.product.category}</h6>
                                            <h6>{this.state.product.sellerID}</h6>
                                            <p>Quantity : {this.state.product.quantity} pcs</p>
                                        </Col>
                                        <Col>
                                            <Button vaiant="success" onClick={this.acceptHandler} className={classes.Btn}>Accept Request</Button>
                                            <Button variant="danger" onClick={this.denyHandler} className={classes.Btn}>Deny Request</Button>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Container>
                    </Paper>
                </Grid>
                {/* <AllProducts/> */}
            </Aux>
        )
    };
};

export default PendingProductDetail;



// import React from 'react';
// import { withStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
// import Dialog from '@material-ui/core/Dialog';
// import MuiDialogTitle from '@material-ui/core/DialogTitle';
// import MuiDialogContent from '@material-ui/core/DialogContent';
// import MuiDialogActions from '@material-ui/core/DialogActions';
// import IconButton from '@material-ui/core/IconButton';
// import CloseIcon from '@material-ui/icons/Close';
// import Typography from '@material-ui/core/Typography';

// const styles = (theme) => ({
//   root: {
//     margin: 0,
//     padding: theme.spacing(2),
//   },
//   closeButton: {
//     position: 'absolute',
//     right: theme.spacing(1),
//     top: theme.spacing(1),
//     color: theme.palette.grey[500],
//   },
// });

// const DialogTitle = withStyles(styles)((props) => {
//   const { children, classes, onClose, ...other } = props;
//   return (
//     <MuiDialogTitle disableTypography className={classes.root} {...other}>
//       <Typography variant="h6">{children}</Typography>
//       {onClose ? (
//         <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
//           <CloseIcon />
//         </IconButton>
//       ) : null}
//     </MuiDialogTitle>
//   );
// });

// const DialogContent = withStyles((theme) => ({
//   root: {
//     padding: theme.spacing(2),
//   },
// }))(MuiDialogContent);

// const DialogActions = withStyles((theme) => ({
//   root: {
//     margin: 0,
//     padding: theme.spacing(1),
//   },
// }))(MuiDialogActions);

// export default function PendingProductDetail() {
//   const [open, setOpen] = React.useState(false);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };
//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <div>
//       <Button variant="outlined" color="primary" onClick={handleClickOpen}>
//         Open dialog
//       </Button>
//       <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
//         <DialogTitle id="customized-dialog-title" onClose={handleClose}>
//           Modal title
//         </DialogTitle>
//         <DialogContent dividers>
//           <Typography gutterBottom>
//             Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
//             in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
//           </Typography>
//           <Typography gutterBottom>
//             Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
//             lacus vel augue laoreet rutrum faucibus dolor auctor.
//           </Typography>
//           <Typography gutterBottom>
//             Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
//             scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
//             auctor fringilla.
//           </Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button autoFocus onClick={handleClose} color="primary">
//             Save changes
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }
