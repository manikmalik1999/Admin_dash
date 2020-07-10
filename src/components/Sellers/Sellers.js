import React, { useState, useEffect } from 'react';

import Seller from "./Seller/Seller";
import { Grid } from "@material-ui/core" ;
// import GridContainer from "components/Grid/GridContainer";
// import GridItem from "components/Grid/GridItem.js";

function Sellers(props) {
    const [loading, SetLoading] = useState({
        show: true
    });
    const [sellers, setSellers] = useState({
        sellers: []
    })
    useEffect(() => {
        if (props.sellers && loading.show) {
            SetLoading({
                show: false
            });
            setSellers({
                sellers: props.sellers
            })
        }
    }, [props.sellers])
    let data = [];
    if (sellers.sellers !== []) {
        data = sellers.sellers;
    }
    console.log(data);
    return (
        <div>
            <p style={{ textAlign: "center" }}>Sellers</p>
            {data !== [] ?
                <Grid container spacing={3}  justify='center' >
                    {data.map(seller => (
                            <Grid item xs={12} sm={4} lg={3}  >
                            <Seller seller={seller} />
                        </Grid>
                    ))}
                </Grid>
                :
                <p>No Seller Available</p>
            }
        </div>
    )
}

export default Sellers;