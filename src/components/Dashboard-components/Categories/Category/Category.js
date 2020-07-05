import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import classes from './Category.css';


export default function Category(props){

  return (
      <Card className={classes.root} style={{width:"280px",display:"inline-block",margin: "16px"}}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image="https://don16obqbay2c.cloudfront.net/wp-content/uploads/Storefront_Images_C-1481632060.png"
            title={props.category}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {props.category}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Sale is extremely good in this section
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Sales
          </Button>
          <Button size="small" color="primary">
            Details
          </Button>
        </CardActions>
      </Card>
  );
}
