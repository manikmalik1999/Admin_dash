import React from 'react';
import { Grid } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import PendingProducts from '../../PendingProducts/PendingProducts';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));
const usStyles = makeStyles((theme) => ({
    root: {
        color:"green",
        '& > *': {
            margin: theme.spacing(1),
        },
    }
}));


function SellerDetails(props) {
    console.log(props);
    const im1 = "https://react.semantic-ui.com/images/avatar/large/elliot.jpg";
    const classes = useStyles() ;
    const active = usStyles() ;
    return (
        <div>
            <p style={{ marginBottom: "18px" }}>Seller Details</p>
            <Grid container spacing={4} alignItems="center" >
                <Grid item lg={1} />
                <Grid item lg={4} >
                    <img src={im1} style={{ maxHeight: "340px" }} />
                </Grid>
                <Grid item lg={2} />
                <Grid item lg={5} style={{ height: "100%" }}>
                    <h2>Salesman</h2>
                    <p style={{ marginBottom: "18px" }}>This is some Description about Seller</p>
                    <h6><i>abc@gmail.com</i></h6>
                </Grid>
                {/* <Grid item lg={12}>
                    <div className={classes.root}>
                        <ButtonGroup style={{background:"#2E3B55",width:"60%",height:"70%"}} aria-label="outlined primary button group">
                            <Button style={{color:"white",width:"240%"}} className={active.root}>Approved</Button>
                            <Button style={{color:"white",width:"240%"}}>Pending</Button>
                            <Button style={{color:"white",width:"240%"}}>Denied</Button>
                        </ButtonGroup>
                    </div>
                </Grid> */}
            </Grid>
            <PendingProducts sellerId = {props.match.params.id}/>
        </div>
    )
}

export default SellerDetails;
