import React, { Component } from 'react'
// import { Menu } from 'semantic-ui-react'
// import PendingProducts from '../PendingProducts/PendingProducts';
// import { Grid } from "@material-ui/core";
// import Aux from '../../hoc/Auxilliary';
import { Button, Header, Image, Modal } from 'semantic-ui-react'


// const colors = [
//   //   'red',
//   //   'orange',
//   //   'yellow',
//   //   'olive',
//   //   'green',
//   //   'teal',
//   'blue'
//   //   'violet',
//   //   'purple',
//   //   'pink',
//   //   'brown',
//   //   'grey',
//   //   'black',
// ]

// class ExampleMenu extends Component {
//   static propTypes = {
//     color: PropTypes.string,
//   }

//   state = { activeItem: 'Approved Products' }

//   handleItemClick = (e, { name }) => {
//     this.setState({ activeItem: name });

//   }

class ModalExampleDimmer extends Component {
  state = { open: false }

  show = (dimmer) => () => this.setState({ dimmer, open: true })
  close = () => this.setState({ open: false })

  render() {
    const { open, dimmer } = this.state

    return (
      <div>
        <Button onClick={this.show(true)}>Default</Button>
        <Button onClick={this.show('inverted')}>Inverted</Button>
        <Button onClick={this.show('blurring')}>Blurring</Button>

        <Modal dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header>Select a Photo</Modal.Header>
          <Modal.Content image>
            <Image
              wrapped
              size='medium'
              src='/images/avatar/large/rachel.png'
            />
            <Modal.Description>
              <Header>Default Profile Image</Header>
              <p>
                We've found the following gravatar image associated with your
                e-mail address.
              </p>
              <p>Is it okay to use this photo?</p>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button color='black' onClick={this.close}>
              Nope
            </Button>
            <Button
              positive
              icon='checkmark'
              labelPosition='right'
              content="Yep, that's me"
              onClick={this.close}
            />
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

// const AllProducts = () => {
//   const menus = colors.map((color) => <ExampleMenu color={color} key={color} />)

//   return (
//     <Aux>
//       {menus}
//       <Grid container spacing={3} >
//         <PendingProducts />
//       </Grid>
//     </Aux>
//   )
// }

// export default AllProducts;
export default ModalExampleDimmer
