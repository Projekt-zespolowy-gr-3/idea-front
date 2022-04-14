import './css/App.css';
import { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import NavigationBar from './components/NavigationBar';
import { RestrictedRoute } from './utils/RestrictedRoute';
import { PrivateRoute } from './utils/PrivateRoute';
import Login from './components/Login';
import PageNotFound from './components/PageNotFound';
import AccessDenied from './components/AccessDenied';
import { useStyles } from './css/Styles';
import Register from './components/Register';
import Confirm from './components/Confirm';
import ListUsers from './components/ListUsers';
import UserDetails from './components/UserDetails';
import AddFurniture from './components/AddFurniture';
import ListFurnitures from './components/ListFurnitures';
import Cart from './components/Cart';
import ListOrders from './components/ListOrders';
import ListUserOrders from './components/ListUserOrders';
import ResetPassword from './components/ResetPassword';
import ChangeResetPassword from './components/ChangeResetPassword';


function App() {
  const classes = useStyles();

  return (
    <Fragment>
      <Router>
          <ReactNotification />
          <NavigationBar />
          <div className={classes.root}>
          <Switch>
            <Route exact path="/" component={ListFurnitures} />
            <RestrictedRoute path="/login" component={Login} />
            <RestrictedRoute path="/register" component={Register} />
            <RestrictedRoute path="/confirm" component={Confirm} />
            <RestrictedRoute path="/reset" component={ResetPassword} />
            <RestrictedRoute path="/changeResetPassword" component={ChangeResetPassword} />

            <PrivateRoute path="/users" component={ListUsers} roles={["ADMIN"]} />
            <PrivateRoute path="/user" component={UserDetails} roles={["CLIENT"]} />
            <PrivateRoute path="/cart" component={Cart} roles={["CLIENT"]} />
            <PrivateRoute path="/furniture" component={AddFurniture} roles={["ADMIN"]} />
            <PrivateRoute path="/orders" component={ListOrders} roles={["ADMIN"]} />
            <PrivateRoute path="/myorders" component={ListUserOrders} roles={["CLIENT"]} />

            <Route path="/accessDenied" component={AccessDenied} />
            <Route component={PageNotFound} />
          </Switch>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
