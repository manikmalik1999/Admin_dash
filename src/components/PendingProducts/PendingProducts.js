import React, { Component } from 'react';
import Product from '../Products/Product/Product';
import axios from 'axios';
import PendingProductDetail from '../PendingProducts/PendingProductDetail/PendingProductDetail';
// import PendingProduct from '../PendingProducts/PendingProductDetail/PendingProductDetail';

class PendingProducts extends Component {
    state = { 
        products : [],
        individualProductId : null
    };

    componentDidMount(){
        axios
        .get('https://limitless-lowlands-36879.herokuapp.com/products')
        .then(response => {
            this.setState({products : response.data.products});
        })
        .catch(err => {
            console.log(err);
        });
    };

    individualProductHandler = (id) => {
        this.setState({individualProductId : id});
    };

    render(){
        let products = null;
        if(!this.state.individualProductId){
           products =  this.state.products.map( product => {
                return <Product
                            key={product._id}
                            id={product._id}
                            title={product.name}
                            description={product.description}
                            price={product.price}
                            image={product.image} 
                            clicked = {() => this.individualProductHandler(product._id)}
                        />
            });
        }
        else{
            products = <PendingProductDetail id = {this.state.individualProductId} />
        }

        return(
            <div>
                {products}
            </div>
        )
        // return <PendingProductDetail id = {this.state.individualProductId}/>
    }
};

export default PendingProducts ;