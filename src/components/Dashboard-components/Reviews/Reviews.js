import React,{Component} from 'react';
import Axios from 'axios';
import Aux from '../../../hoc/Auxilliary';

class Reviews extends Component {
    state = {
        reviews : []
    };

    componentDidMount(){
        Axios.get('https://limitless-lowlands-36879.herokuapp.com/reviews')
        .then(response => {
            this.setState({reviews : response.data.reviews});
            console.log(response);
        })
        .catch(err => console.log(err));
    }

    render(){
        // const reviews = this.state.reviews.map(review => {
        //     return <Review key={review._id} category={review.review}/>;
        // });

        let reviews = null;

        return (
        <Aux>
            {reviews}
        </Aux>
        );
    }
};

export default Reviews;