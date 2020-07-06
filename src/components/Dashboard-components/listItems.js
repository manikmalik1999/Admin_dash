import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from '@material-ui/core/Tooltip';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CategoryIcon from '@material-ui/icons/Category';
import { Link, Redirect } from 'react-router-dom';
import Cookies from "universal-cookie";

const cookies = new Cookies();


export const mainListItems = (
  <div>
    <Link to="/dashboard">
      <ListItem style={{ color: "white", fontWeight: "bold" }} button>
        <Tooltip title="Dashboard" placement="right-start">
          <ListItemIcon>
            <DashboardIcon style={{ color: "white" }} />
          </ListItemIcon>
        </Tooltip>
        <ListItemText primary="Dashboard" />
      </ListItem>
    </Link>
    <Link to="/dashboard/pending-products">
      <ListItem style={{ color: "white", fontWeight: "bold" }} button>
        <Tooltip title="Pending-Products" placement="right-start">
          <ListItemIcon>
            <ShoppingCartIcon style={{ color: "white" }} />
          </ListItemIcon>
        </Tooltip>
        <ListItemText primary="Pending-Products" />
      </ListItem>
    </Link>
    <Link to="/dashboard/categories">
      <ListItem style={{ color: "white", fontWeight: "bold" }} button>
        <Tooltip title="Categories" placement="right-start">
          <ListItemIcon>
            <CategoryIcon style={{ color: "white" }} />
          </ListItemIcon>
        </Tooltip>
        <ListItemText primary="Categories" />
      </ListItem>
    </Link>
    <Link to="/dashboard/reviews">
      <ListItem style={{ color: "white", fontWeight: "bold" }} button>
        <Tooltip title="reviw=ews" placement="right-start">
          <ListItemIcon>
            <PeopleIcon style={{ color: "white" }} />
          </ListItemIcon>
        </Tooltip>
        <ListItemText primary="Reviews" />
      </ListItem>
    </Link>
    {/* <ListItem style={{ color: "white", fontWeight: "bold" }} button>
        <Tooltip title="integrations" placement="right-start">
          <ListItemIcon>
            <LayersIcon style={{ color: "white" }} />
          </ListItemIcon>
        </Tooltip>
        <ListItemText primary="Integrations" />
      </ListItem> */}
  </div>

);

export const secondaryListItems = (
  <div>
    <ListItem style={{ color: "white", fontWeight: "bold" }} button >
      <Tooltip title="Logout" placement="right-start">
        <ListItemIcon>
          <ExitToAppIcon style={{ color: "white" }} />
        </ListItemIcon>
      </Tooltip>
      <ListItemText primary="Logout" />
    </ListItem>
  </div>
)
