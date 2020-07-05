import React, { Component } from 'react';
import Aux from "../../../../hoc/Auxilliary" ;
import classes from "./IndividualProdReview.css" ;
import { Container,Row,Col,Button } from "react-bootstrap" ;
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Redirect } from "react-router-dom" ;
import ReviewContainer from './ReviewContainer/ReviewContainer';
import { Typography } from '@material-ui/core';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class IndividualProdReview extends Component {
    state = {
        product : {},
        reviews : [],
        redirectToPendingProducts : false
    }

    reviewDeleteHandler = (id) => {
        console.log(id);
        const token = cookies.get("Token");
        console.log(token);
        axios.delete('https://limitless-lowlands-36879.herokuapp.com/reviews/' + id,{
        headers: {
            "Authorization": "Bearer " + token
          },
          data : {
            source : null
        }
        })
        .then(response => {
            console.log(response);
        })
        .catch(err => {
            console.log(err);
        })
    }

    componentDidMount(){
        // console.log("indidef : " + this.props.id);
        // console.log(this.props) ;
        if(this.props.match.params.id){
            axios.get('https://limitless-lowlands-36879.herokuapp.com/products/' + this.props.match.params.id)
            .then(response => {
                console.log(response.data.product) ;
                this.setState({product : response.data.product});
                axios.get('https://limitless-lowlands-36879.herokuapp.com/reviews/' + this.props.match.params.id)
                .then(res => {
                    console.log(res.data);
                    this.setState({reviews : res.data.reviews});
                })
                .catch(err => console.log(err));
            })
            .catch(err => {
                console.log(err);
            });
        };
    };
    render(){
        let redir = null ;
        if( this.state.redirectToPendingProducts ){
            redir = <Redirect to="/dashboard/pending-products" /> ;
        }
        let reviews = null;
        if(this.state.reviews.length>0){
            reviews = this.state.reviews.map(review => {
                return <ReviewContainer
                    key = {review._id}
                    id = {review._id}
                    message = {review.comments}
                    value = {review.value}
                    name = {review.user.name}
                    avatar = {review.user.name[0]}
                    clicked = {() => this.reviewDeleteHandler(review._id)}
                />
            })
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
                                    {/* <Col>
                                    <Button vaiant="success" onClick={this.acceptHandler} className={classes.Btn}>Accept Request</Button>
                                    <Button variant="danger" onClick={this.denyHandler} className={classes.Btn}>Deny Request</Button>
                                    </Col> */}
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                    </Paper>
                </Grid>
                <Typography variant="h6">All Reviews</Typography>
                {reviews}
        </Aux>
    )};
};

export default IndividualProdReview;