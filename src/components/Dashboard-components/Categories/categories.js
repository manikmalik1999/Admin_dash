import React,{ Component } from 'react';
import Axios from 'axios';
import Aux from '../../../hoc/Auxilliary';
import Category from './Category/Category';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

class Categories extends Component {

    state = {
        categories : []
    }

    componentDidMount(){
        Axios.get('https://limitless-lowlands-36879.herokuapp.com/categories')
        .then(response => {
            console.log(response) ;
            this.setState({categories : response.data.categories});
        })
        .catch(err => console.log(err));
    }

    render(){
        const categories = this.state.categories.map(category => {
            return <Grid item xs key={category._id}><Category  category={category.category}/></Grid> ;
        });

        return (
        <Aux>
            <Grid container spacing={3} style={{textAlign: "center"}}>
                {categories}
            </Grid>
        </Aux>
        );
    }
};

export default Categories;