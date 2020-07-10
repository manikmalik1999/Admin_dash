import React, { Component } from 'react';

import { Snackbar, SnackbarContent, IconButton } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';



import Product from '../Products/Product/Product';
import axios from 'axios';
import PendingProductDetail from '../PendingProducts/PendingProductDetail/PendingProductDetail';
// import PendingProduct from '../PendingProducts/PendingProductDetail/PendingProductDetail';



class PendingProducts extends Component {
    state = {
        products: [],
        individualProductId: null,
        snack: {
            show: false,
            message: "",
            color: ""
        }
    };

    snackbarClose = (event) => {
        this.setState({
            snack: {
                show: false,
                message: "",
                color: ""
            }
        })
    }

    componentDidMount() {
        axios
            .get('https://limitless-lowlands-36879.herokuapp.com/products')
            .then(response => {
                console.log("---> hre") ;
                console.log(response) ; 
                this.setState({
                    products: response.data.products,
                    snack: {
                        show: this.props.location.state && true,
                        message: this.props.location.state && this.props.location.state.value ? "Product Accepted" : "Product Denied",
                        color: this.props.location.state && this.props.location.state.value ? "green" : "red"
                    }
                })
            })
            .catch(err => {
                console.log(err);
            });
    };

    individualProductHandler = (id) => {
        this.setState({ individualProductId: id });
    };

    render() {
        //snackHandler
        
        // console.log(this.props);
        let products = null;
        if (!this.state.individualProductId) {
            products = this.state.products.map(product => {
                return <Product
                    key={product._id}
                    id={product._id}
                    title={product.name}
                    description={product.description}
                    price={product.price}
                    image={product.image}
                    clicked={() => this.individualProductHandler(product._id)}
                />
            });
        }
        else {
            products = <PendingProductDetail id={this.state.individualProductId} />
        }

        return (
            <Grid item xs={12}>
                <Paper >
                    <Snackbar
                        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                        open={this.state.snack.show}
                        autoHideDuration={4000}
                        onClose={this.snackbarClose}
                        bodystyle={{ backgroundColor: 'teal', color: 'coral' }}
                        message={<span id="message-id">{this.state.snack.message}</span>}

                    >
                        <SnackbarContent style={{
                            backgroundColor: this.state.snack.color
                        }}
                            action={[
                                <button key={"close"} onClick={this.snackbarClose} style={{ background: "none", border: "none", color: "white" }}>x</button>
                            ]}
                            message={<span id="client-snackbar">{this.state.snack.message}</span>}
                        />
                    </Snackbar>
                    {products}
                </Paper>
            </Grid>
        )
        // return <PendingProductDetail id = {this.state.individualProductId}/>
    }
};

export default PendingProducts;