import React from 'react';
import { Route } from "react-router-dom" ;
import Aux from '../../hoc/Auxilliary';
import Dashboard from '../Dashboard-components/Dashboard';
import LoginSide from "../LoginSide/LoginSide" ;

const layout = (props) => (
    <Aux>
        <Route path="/login" exact><LoginSide /></Route>
        <Route path="/dashboard"><Dashboard /></Route>
    </Aux>
);

export default layout;