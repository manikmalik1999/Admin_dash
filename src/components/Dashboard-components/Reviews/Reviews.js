import React,{Component} from 'react';
import Axios from 'axios';
import Aux from '../../../hoc/Auxilliary';
import IndividualProdReview from './IndividualProdReview/IndividualProdReview';
import ProductReviews from './ProductReviews/ProductReviews';

class Reviews extends Component {
    state = {
        products : [],
        individualProductId : null
    };

    componentDidMount(){
        Axios.get('https://limitless-lowlands-36879.herokuapp.com/products')
        .then(response => {
            this.setState({products : response.data.products});
            console.log(response);
        })
        .catch(err => {
            console.log(err);
        });
    };

    individualReviewHandler = (id) => {
        this.setState({individualProductId : id});
    }

    render() {
        let products = null;
        if(!this.state.individualProductId){
            products =  this.state.products.map( product => {
                return <ProductReviews
                            key={product._id}
                            id={product._id}
                            title={product.name}
                            description={product.description}
                            price={product.price}
                            image={product.image} 
                            clicked = {() => this.individualReviewHandler(product._id)}
                        />
            });
        }
        else{
            products = <IndividualProdReview id = {this.state.individualProductId} />
        }

        return(
            <div>
                {products}
            </div>
        );
    }
};

export default Reviews;