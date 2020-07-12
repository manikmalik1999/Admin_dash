import React, { Component } from 'react'
import { Snackbar, SnackbarContent, IconButton } from "@material-ui/core"
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import Product from '../Products/Product/Product'
import axios from 'axios'
import PendingProductDetail from '../PendingProducts/PendingProductDetail/PendingProductDetail'
import PropTypes from 'prop-types'
import { Menu } from 'semantic-ui-react'
import Aux from '../../hoc/Auxilliary'
import Menubar from '../AllProducts/AllProducts';

class PendingProducts extends Component {
    state = {
        // products: [],
        pendingProducts : [],
        approvedProducts : [],
        rejectedProducts : [],
        activeItem : 'Approved Products',
        curr : "approved",
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
    };

    componentDidMount() {
        let categoryFilter;
        if(this.props.sellerId){
            axios
            .get('https://limitless-lowlands-36879.herokuapp.com/products')
            .then(response => {
                console.log("---> hre") ;
                console.log(response) ; 
                const products = response.data.products;
                const pendingProducts = products.filter( i=> {
                    return i.approved === "pending" && i.sellerId === this.props.sellerId;
                });
                const approvedProducts = products.filter( i=> {
                    return i.approved === "true" && i.sellerId === this.props.sellerId;
                });
                const rejectedProducts = products.filter( i=> {
                    return i.approved === "false" && i.sellerId === this.props.sellerId;
                });
                this.setState({
                    pendingProducts: pendingProducts,
                    approvedProducts: approvedProducts,
                    rejectedProducts: rejectedProducts,
                    snack: {
                        show: this.props && this.props.location && this.props.location.state && true,
                        message: this.props && this.props.location && this.props.location.state && this.props.location.state.value ? "Product Accepted" : "Product Denied",
                        color: this.props && this.props.location && this.props.location.state && this.props.location.state.value ? "green" : "red"
                    }
                })
            })
            .catch(err => {
                console.log(err);
            });
        }
        else if(this.props.match.params.category){
            axios
            .get('https://limitless-lowlands-36879.herokuapp.com/products')
            .then(response => {
                console.log("---> hre") ;
                console.log(response) ; 
                const products = response.data.products;
                const pendingProducts = products.filter( i=> {
                    return i.approved === "pending" && i.category === this.props.match.params.category;
                });
                const approvedProducts = products.filter( i=> {
                    return i.approved === "true" && i.category === this.props.match.params.category;
                });
                const rejectedProducts = products.filter( i=> {
                    return i.approved === "false" && i.category === this.props.match.params.category;
                });
                this.setState({
                    pendingProducts: pendingProducts,
                    approvedProducts: approvedProducts,
                    rejectedProducts: rejectedProducts,
                    snack: {
                        show: this.props && this.props.location && this.props.location.state && true,
                        message: this.props && this.props.location && this.props.location.state && this.props.location.state.value ? "Product Accepted" : "Product Denied",
                        color: this.props && this.props.location && this.props.location.state && this.props.location.state.value ? "green" : "red"
                    }
                })
            })
            .catch(err => {
                console.log(err);
            });   
        }
        else{
            axios
            .get('https://limitless-lowlands-36879.herokuapp.com/products')
            .then(response => {
                console.log("---> hre") ;
                console.log(response) ; 
                const products = response.data.products;
                const pendingProducts = products.filter( i=> {
                    return i.approved === "pending";
                });
                const approvedProducts = products.filter( i=> {
                    return i.approved === "true";
                });
                const rejectedProducts = products.filter( i=> {
                    return i.approved === "false";
                });
                this.setState({
                    pendingProducts: pendingProducts,
                    approvedProducts: approvedProducts,
                    rejectedProducts: rejectedProducts,
                    snack: {
                        show: this.props && this.props.location && this.props.location.state && true,
                        message: this.props && this.props.location && this.props.location.state && this.props.location.state.value ? "Product Accepted" : "Product Denied",
                        color: this.props && this.props.location && this.props.location.state && this.props.location.state.value ? "green" : "red"
                    }
                })
            })
            .catch(err => {
                console.log(err);
            });
        }
    };

    individualProductHandler = (id) => {
        this.setState({ individualProductId: id });
    };

    menubarHandler = (event,{name,value}) => {
        console.log(value);
        this.setState({activeItem : name,curr : value})
    }
    
    render() {
        //snackHandler
        
        // console.log(this.state.curr);
        let products = null;

        if (!this.state.individualProductId) {
            if(this.state.curr === 'approved'){
                products = this.state.approvedProducts.map(product => {
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
            else if(this.state.curr === 'pending'){
                products = this.state.pendingProducts.map(product => {
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
            else{
                products = this.state.rejectedProducts.map(product => {
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
        }
        else {
            products = <PendingProductDetail id={this.state.individualProductId} />
        }

        return (
            <Grid item xs={16}>
                <Menu color='blue' inverted widths={3} tabular attached='top'>
                    <Menu.Item
                    name='Approved Products'
                    value='approved'
                    active={this.state.activeItem === 'Approved Products'}
                    onClick={this.menubarHandler}
                    />
                    <Menu.Item
                    name='Pending Products'
                    value='pending'
                    active={this.state.activeItem === 'Pending Products'}
                    onClick={this.menubarHandler}
                    />
                    <Menu.Item
                    name='Rejected Products'
                    value='rejected'
                    active={this.state.activeItem === 'Rejected Products'}
                    onClick={this.menubarHandler}
                    />
                </Menu>
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