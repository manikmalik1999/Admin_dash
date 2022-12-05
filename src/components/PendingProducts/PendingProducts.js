// import React, { Component } from 'react'
// import { Snackbar, SnackbarContent, IconButton } from "@material-ui/core"
// import Grid from '@material-ui/core/Grid'
// import Paper from '@material-ui/core/Paper'
// import { makeStyles } from '@material-ui/core/styles'
// import Product from '../Products/Product/Product'
// import axios from 'axios'
// import PendingProductDetail from '../PendingProducts/PendingProductDetail/PendingProductDetail'
// import PropTypes from 'prop-types'
// import { Menu, Modal } from 'semantic-ui-react'
// import Aux from '../../hoc/Auxilliary'
// import Menubar from '../AllProducts/AllProducts';


// class PendingProducts extends Component {
//     state = {
//         // products: [],
//         pendingProducts: [],
//         approvedProducts: [],
//         rejectedProducts: [],
//         activeItem: 'Approved Products',
//         curr: "approved",
//         individualProductId: null,
//         loading: true,
//         snack: {
//             show: false,
//             message: "",
//             color: ""
//         }
//     };

//     snackbarClose = (event) => {
//         this.setState({
//             snack: {
//                 show: false,
//                 message: "",
//                 color: ""
//             }
//         })
//     };


//     componentDidMount() {
//         let categoryFilter;
//         if (this.props.sellerId) {
//             axios
//                 .get('http://localhost:5000/products')
//                 .then(response => {
//                     const products = response.data.products;
//                     const pendingProducts = products.filter(i => {
//                         return i.approved === "pending" && i.sellerId === this.props.sellerId;
//                     });
//                     const approvedProducts = products.filter(i => {
//                         return i.approved === "true" && i.sellerId === this.props.sellerId;
//                     });
//                     const rejectedProducts = products.filter(i => {
//                         return i.approved === "false" && i.sellerId === this.props.sellerId;
//                     });
//                     this.setState({
//                         pendingProducts: pendingProducts,
//                         approvedProducts: approvedProducts,
//                         rejectedProducts: rejectedProducts,
//                         loading: false,
//                         snack: {
//                             show: this.props && this.props.location && this.props.location.state && true,
//                             message: this.props && this.props.location && this.props.location.state && this.props.location.state.value ? "Product Accepted" : "Product Denied",
//                             color: this.props && this.props.location && this.props.location.state && this.props.location.state.value ? "green" : "red"
//                         }
//                     })
//                 })
//                 .catch(err => {
//                     console.log(err);
//                 });
//         }
//         else if (this.props.match.params.category) {
//             axios
//                 .get('http://localhost:5000/products')
//                 .then(response => {
//                     const products = response.data.products;
//                     const pendingProducts = products.filter(i => {
//                         return i.approved === "pending" && i.category === this.props.match.params.category;
//                     });
//                     const approvedProducts = products.filter(i => {
//                         return i.approved === "true" && i.category === this.props.match.params.category;
//                     });
//                     const rejectedProducts = products.filter(i => {
//                         return i.approved === "false" && i.category === this.props.match.params.category;
//                     });
//                     this.setState({
//                         pendingProducts: pendingProducts,
//                         approvedProducts: approvedProducts,
//                         rejectedProducts: rejectedProducts,
//                         loading: false,
//                         snack: {
//                             show: this.props && this.props.location && this.props.location.state && true,
//                             message: this.props && this.props.location && this.props.location.state && this.props.location.state.value ? "Product Accepted" : "Product Denied",
//                             color: this.props && this.props.location && this.props.location.state && this.props.location.state.value ? "green" : "red"
//                         }
//                     })
//                 })
//                 .catch(err => {
//                     console.log(err);
//                 });
//         }
//         else {
//             axios
//                 .get('http://localhost:5000/products')
//                 .then(response => {
//                     const products = response.data.products;
//                     const pendingProducts = products.filter(i => {
//                         return i.approved === "pending";
//                     });
//                     const approvedProducts = products.filter(i => {
//                         return i.approved === "true";
//                     });
//                     const rejectedProducts = products.filter(i => {
//                         return i.approved === "false";
//                     });
//                     this.setState({
//                         pendingProducts: pendingProducts,
//                         approvedProducts: approvedProducts,
//                         rejectedProducts: rejectedProducts,
//                         loading: false,
//                         snack: {
//                             show: this.props && this.props.location && this.props.location.state && true,
//                             message: this.props && this.props.location && this.props.location.state && this.props.location.state.value ? "Product Accepted" : "Product Denied",
//                             color: this.props && this.props.location && this.props.location.state && this.props.location.state.value ? "green" : "red"
//                         }
//                     })
//                 })
//                 .catch(err => {
//                     console.log(err);
//                 });
//         }
//     };

//     individualProductHandler = (id) => {
//         this.setState({ individualProductId: id });
//     };

//     menubarHandler = (event, { name, value }) => {
//         console.log(value);
//         this.setState({ activeItem: name, curr: value })
//     }

//     render() {
//         //snackHandler

//         let products = null;
//         if (!this.state.individualProductId) {
//             if (this.state.curr === 'approved') {
//                 products = this.state.approvedProducts.map(product => {
//                     return <Product
//                         key={product._id}
//                         id={product._id}
//                         title={product.name}
//                         description={product.description}
//                         price={product.price}
//                         image={product.image}
//                         clicked={() => this.individualProductHandler(product._id)}
//                     />
//                 });
//             }
//             else if (this.state.curr === 'pending') {
//                 products = this.state.pendingProducts.map(product => {
//                     return <Product
//                         key={product._id}
//                         id={product._id}
//                         title={product.name}
//                         description={product.description}
//                         price={product.price}
//                         image={product.image}
//                         clicked={() => this.individualProductHandler(product._id)}
//                     />
//                 });
//             }
//             else {
//                 products = this.state.rejectedProducts.map(product => {
//                     return <Product
//                         id={product._id}
//                         title={product.name}
//                         description={product.description}
//                         price={product.price}
//                         image={product.image}
//                         clicked={() => this.individualProductHandler(product._id)}
//                     />
//                 });
//             }
//         }
//         else {
//             products = <PendingProductDetail id={this.state.individualProductId} />
//         }
//         // console.log(products);
//         if (products.length === 0) {
//             if (!this.state.loading) {
//                 // console.log("hereeeee");
//                 products = (<Grid item lg={12} xs={12} style={{ textAlign: "center", height: "210px", marginTop: "130px" }} >
//                     <h5>No Particulars Present Here</h5>
//                 </Grid>)
//             } else {
//                 products = (<Grid item lg={12} xs={12} style={{ textAlign: "center", height: "210px", marginTop: "130px" }} >
//                     <p>Loading...</p>
//                 </Grid>)
//             }
//         }
//         return (
//             <div>
//                 <Snackbar
//                     anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//                     open={this.state.snack.show}
//                     autoHideDuration={4000}
//                     onClose={this.snackbarClose}
//                     bodystyle={{ backgroundColor: 'teal', color: 'coral' }}
//                     message={<span id="message-id">{this.state.snack.message}</span>}

//                 >
//                     <SnackbarContent style={{
//                         backgroundColor: this.state.snack.color
//                     }}
//                         action={[
//                             <button key={"close"} onClick={this.snackbarClose} style={{ background: "none", border: "none", color: "white" }}>x</button>
//                         ]}
//                         message={<span id="client-snackbar">{this.state.snack.message}</span>}
//                     />
//                 </Snackbar>
//                 <Grid container style={{ borderRadius: "6px", boxShadow: "2px 4px 14px lightgrey" }} justify='space-around' alignContent="space-around">
//                     <Grid item xs={12} lg={12}>
//                         <Menu color='teal' inverted widths={3} tabular attached='top'>
//                             <Menu.Item
//                                 name='Approved Products'
//                                 value='approved'
//                                 active={this.state.activeItem === 'Approved Products'}
//                                 onClick={this.menubarHandler}
//                             />
//                             <Menu.Item
//                                 name='Pending Products'
//                                 value='pending'
//                                 active={this.state.activeItem === 'Pending Products'}
//                                 onClick={this.menubarHandler}
//                             />
//                             <Menu.Item
//                                 name='Rejected Products'
//                                 value='rejected'
//                                 active={this.state.activeItem === 'Rejected Products'}
//                                 onClick={this.menubarHandler}
//                             />
//                         </Menu>
//                     </Grid>
//                     {products}
//                 </Grid>
//             </div>

//         )
//         // return <PendingProductDetail id = {this.state.individualProductId}/>
//     }
// };

// export default PendingProducts;


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


import React, { Component } from 'react'
import { Snackbar, SnackbarContent, IconButton } from "@material-ui/core"
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import Product from '../Products/Product/Product'
import axios from 'axios'
import PendingProductDetail from '../PendingProducts/PendingProductDetail/PendingProductDetail'
import PropTypes from 'prop-types'
import { Menu, Modal } from 'semantic-ui-react'
import Aux from '../../hoc/Auxilliary'
import Menubar from '../AllProducts/AllProducts';


import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { Dimmer, Loader } from "semantic-ui-react";

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});


class PendingProducts extends Component {
    state = {
        // products: [],
        pendingProducts: [],
        approvedProducts: [],
        rejectedProducts: [],
        activeItem: 'Approved Products',
        curr: "approved",
        viaNotification:false,
        individualProductId: null,
        productType : null ,
        loading: true,
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
        if (this.props.sellerId) {
            axios
                .get('http://localhost:5000/products')
                .then(response => {
                    const products = response.data.products;
                    const pendingProducts = products.filter(i => {
                        return i.approved === "pending" && i.sellerId === this.props.sellerId;
                    });
                    const approvedProducts = products.filter(i => {
                        return i.approved === "true" && i.sellerId === this.props.sellerId;
                    });
                    const rejectedProducts = products.filter(i => {
                        return i.approved === "false" && i.sellerId === this.props.sellerId;
                    });
                    this.setState({
                        pendingProducts: pendingProducts,
                        approvedProducts: approvedProducts,
                        rejectedProducts: rejectedProducts,
                        loading: false,
                        snack: {
                            show: this.props && this.props.location && this.props.location.state && this.props.location.state.value !== "back" && true,
                            message: this.props && this.props.location && this.props.location.state && this.props.location.state.value ? "Product Accepted" : "Product Denied",
                            color: this.props && this.props.location && this.props.location.state && this.props.location.state.value ? "green" : "red"
                        }
                    })
                })
                .catch(err => {
                    console.log(err);
                });
        }
        else if (this.props.match.params.category) {
            console.log(this.props.match.params.category);
            axios
                .get('http://localhost:5000/products')
                .then(response => {
                    const products = response.data.products;
                    const pendingProducts = products.filter(i => {
                        console.log(i.category.toLowerCase());
                        return i.approved === "pending" && i.category.toLowerCase() === this.props.match.params.category;
                    });
                    const approvedProducts = products.filter(i => {
                        return i.approved === "true" && i.category.toLowerCase() === this.props.match.params.category;
                    });
                    const rejectedProducts = products.filter(i => {
                        return i.approved === "false" && i.category.toLowerCase() === this.props.match.params.category;
                    });
                    this.setState({
                        pendingProducts: pendingProducts,
                        approvedProducts: approvedProducts,
                        rejectedProducts: rejectedProducts,
                        loading: false,
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
        else {
            axios
                .get('http://localhost:5000/products')
                .then(response => {
                    const products = response.data.products;
                    const pendingProducts = products.filter(i => {
                        return i.approved === "pending";
                    });
                    const approvedProducts = products.filter(i => {
                        return i.approved === "true";
                    });
                    const rejectedProducts = products.filter(i => {
                        return i.approved === "false";
                    });
                    this.setState({
                        pendingProducts: pendingProducts,
                        approvedProducts: approvedProducts,
                        rejectedProducts: rejectedProducts,
                        loading: false,
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

    individualProductHandler = (id,type) => {
        this.setState({ individualProductId: id, productType : type });
    };

    menubarHandler = (event, { name, value }) => {
        // console.log(value);
        this.setState({ activeItem: name, curr: value })
    }

    render() {
        //snackHandler
        // if (this.props.location.toPending && this.state.curr !== "pending" && !this.state.viaNotification) {
        //     this.setState({
        //         activeItem: 'Pending Products',
        //         curr: "pending",
        //         viaNotification : true
        //     })
        // }
        let products = null;
        if (!this.state.individualProductId) {
            if (this.state.curr === 'approved') {
                products = this.state.approvedProducts.map(product => {
                    return <Product
                        key={product._id}
                        id={product._id}
                        title={product.name}
                        description={product.description}
                        price={product.price}
                        image={product.image}
                        sellerId={product.sellerId}
                        clicked={() => this.individualProductHandler(product._id,"approved")}
                    />
                });
            }
            else if (this.state.curr === 'pending') {
                products = this.state.pendingProducts.map(product => {
                    return <Product
                        key={product._id}
                        id={product._id}
                        title={product.name}
                        description={product.description}
                        price={product.price}
                        image={product.image}
                        sellerId={product.sellerId}
                        clicked={() => this.individualProductHandler(product._id,"pending")}
                    />
                });
            }
            else {
                products = this.state.rejectedProducts.map(product => {
                    return <Product
                        id={product._id}
                        title={product.name}
                        description={product.description}
                        price={product.price}
                        image={product.image}
                        sellerId={product.sellerId}
                        clicked={() => this.individualProductHandler(product._id,"rejected")}
                    />
                });
            }
        }
        else {
            products = <PendingProductDetail id={this.state.individualProductId} type={this.state.productType} />
        }
        // console.log(products);
        if (products.length === 0) {
            if (!this.state.loading) {
                // console.log("hereeeee");
                products = (<Grid item lg={12} xs={12} style={{ textAlign: "center", height: "210px", marginTop: "130px" }} >
                    <h5>No Particulars Present Here</h5>
                </Grid>)
            } else {
                products = (<Grid item lg={12} xs={12} style={{ textAlign: "center", height: "210px", marginTop: "130px" }} >
                    <Dimmer active inverted style={{ marginLeft: "150px", width: "100%" }}>
                        <Loader size='medium'>Loading</Loader>
                    </Dimmer>
                </Grid>)
            }
        }
        let categoryShow = null;
        if (this.props && this.props.match && this.props.match.params && this.props.match.params.category) {
            categoryShow = (
                <h4 style={{ textAlign: "center", padding: "12px" }}>{this.props.match.params.category.toString().toUpperCase()}</h4>
            );
        }
        return (
            <div>
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
                {categoryShow}
                <Grid container style={{ borderRadius: "6px", boxShadow: "2px 4px 14px lightgrey" }} justify='space-around' alignContent="space-around">
                    <Grid item xs={12} lg={12}>
                        <Menu color='teal' inverted widths={3} tabular attached='top'>
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
                    </Grid>
                    {products}
                </Grid>
            </div>

        )
        // return <PendingProductDetail id = {this.state.individualProductId}/>
    }
};

export default PendingProducts;