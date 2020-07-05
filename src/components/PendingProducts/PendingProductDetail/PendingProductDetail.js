import React, { Component } from 'react';
import Aux from "../../../hoc/Auxilliary" ;
import classes from "./PendingProductDetail.css" ;
import { Container,Row,Col,Button } from "react-bootstrap" ;
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Redirect } from "react-router-dom" ;

class PendingProductDetail extends Component {
    state = {
        product : {},
        redirectToPendingProducts : false,
        value : null
    }

    componentDidMount(){
        console.log("indidef : " + this.props.id);
        console.log(this.props) ;
        if(this.props.match.params.id){
            axios.get('https://limitless-lowlands-36879.herokuapp.com/products/' + this.props.match.params.id)
            .then(response => {
                console.log(response.data.product) ;
                this.setState({product : response.data.product});
            })
            .catch(err => {
                console.log(err);
            });
        };
    };
    acceptHandler = () => {
        axios.get("https://limitless-lowlands-36879.herokuapp.com/admin/approve/true/" + this.state.product._id )
            .then(res => {
                this.setState({redirectToPendingProducts : true,value : true}) ;
            })
            .catch( err => {
                console.log(err) ;
            } )
    }
    denyHandler = () => {
        axios.get("https://limitless-lowlands-36879.herokuapp.com/admin/approve/false/" + this.state.product._id )
            .then(res => {
                this.setState({redirectToPendingProducts : true,value: false}) ;
            })
            .catch( err => {
                console.log(err) ;
            } )
    }
    render(){
        let redir = null ;
        if( this.state.redirectToPendingProducts ){
            redir = <Redirect to={{
                pathname: "/dashboard/pending-products",
                state: { value: this.state.value }
            }}/>
        }
        return(
            <Aux>
                {redir}
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                    <Container>
                        <Row>
                            <Col lg={4}>
                                <img src={"https://limitless-lowlands-36879.herokuapp.com/" + this.state.product.image} style={{margin:"12px"}}  alt="" className={classes.Image} />
                            </Col>
                            <Col className={classes.VerLine}>
                            </Col>
                            <Col className={classes.Details} lg={6}>
                                <Row>
                                    <Col>
                                        <h2>{this.state.product.name}</h2>
                                        <p>{this.state.product.description}</p>
                                        <h5>Rs. {this.state.product.price}</h5>
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
        </Aux>
    )};
};

export default PendingProductDetail;