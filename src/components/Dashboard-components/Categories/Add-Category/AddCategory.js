import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Axios from 'axios';
// import Title from '../../Title';


export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  // let category;
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const postCategoryHandler = (event) => {
    // console.log(category.value);

    const category = event.target.category.value; 
    event.preventDefault();
    event.stopPropagation();
    Axios.post('https://limitless-lowlands-36879.herokuapp.com/categories',category)
    .then(response => {
      console.log(response);
    })
    .catch(err => console.log(err));
    // console.log(event.target.category.value);

    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Add Category
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Product Category</DialogTitle>
        <form onSubmit={postCategoryHandler}>
        <DialogContent>
          <DialogContentText>
            To add more category fields to the shop enter the category-name here
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="category"
            label="Name"
            // type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} type="submit" color="primary">
            Save Changes
          </Button>
        </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
