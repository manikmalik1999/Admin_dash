import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import PendingProducts from '../PendingProducts/PendingProducts';
import { Grid } from "@material-ui/core";
import Aux from '../../hoc/Auxilliary';

const colors = [
  //   'red',
  //   'orange',
  //   'yellow',
  //   'olive',
  //   'green',
  //   'teal',
  'blue'
  //   'violet',
  //   'purple',
  //   'pink',
  //   'brown',
  //   'grey',
  //   'black',
]

class ExampleMenu extends Component {
  static propTypes = {
    color: PropTypes.string,
  }

  state = { activeItem: 'Approved Products' }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });

  }

  render() {
    const { color } = this.props
    const { activeItem } = this.state

    return (
      <Menu color={color} inverted widths={3}>
        <Menu.Item
          name='Approved Products'
          active={activeItem === 'Approved Products'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name='Pending Products'
          active={activeItem === 'Pending Products'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name='Rejected Products'
          active={activeItem === 'Rejected Products'}
          onClick={this.handleItemClick}
        />
      </Menu>
    )
  }
}

const AllProducts = () => {
  const menus = colors.map((color) => <ExampleMenu color={color} key={color} />)

  return (
    <Aux>
      {menus}
      <Grid container spacing={3} >
        <PendingProducts />
      </Grid>
    </Aux>
  )
}

export default AllProducts;