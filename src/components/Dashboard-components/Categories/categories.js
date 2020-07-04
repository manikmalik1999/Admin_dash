import React,{ Component } from 'react';
import Axios from 'axios';
import Aux from '../../../hoc/Auxilliary';
import Category from './Category/Category';

class Categories extends Component {

    state = {
        categories : []
    }

    componentDidMount(){
        Axios.get('https://limitless-lowlands-36879.herokuapp.com/categories')
        .then(response => {
            this.setState({categories : response.data.categories});
            console.log(response);
        })
        .catch(err => console.log(err));
    }

    render(){
        const categories = this.state.categories.map(category => {
            return <Category key={category._id} category={category.category}/>;
        });

        return (
        <Aux>
            {categories}
        </Aux>
        );
    }
};

export default Categories;