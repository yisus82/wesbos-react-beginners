import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import 'firebase/auth';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import Login from './Login';
import base, { firebaseApp } from '../base';

class Inventory extends React.Component {
  static propTypes = {
    updateFish: PropTypes.func.isRequired,
    deleteFish: PropTypes.func.isRequired,
    addFish: PropTypes.func.isRequired,
    loadSampleFishes: PropTypes.func.isRequired,
    fishes: PropTypes.object.isRequired
  };

  state = {
    uid: null,
    owner: null
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authHandler({ user });
      }
    });
  }

  authHandler = async authData => {
    // Look up the current store in the firebase database
    const store = await base.fetch(this.props.storeId, { context: this });
    // Claim it if there is no owner
    if (!store.owner) {
      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid
      });
    }
    // Set the state of the inventory to reflect the current user
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid
    });
  };

  authenticate = provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  };

  logout = async () => {
    await firebase.auth().signOut();
    this.setState({ uid: null });
  };

  render() {
    const logout = <button onClick={this.logout}>Log Out</button>;
    if (!this.state.uid) {
      return <Login authenticate={this.authenticate} />;
    } else if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry! You are not the owner of the store</p>
          {logout}
        </div>
      );
    } else {
      return (
        <div className="inventory">
          <h2>Inventory</h2>
          {logout}
          {Object.keys(this.props.fishes).map(key => (
            <EditFishForm
              fish={this.props.fishes[key]}
              key={key}
              index={key}
              updateFish={this.props.updateFish}
              deleteFish={this.props.deleteFish}
            />
          ))}
          <AddFishForm addFish={this.props.addFish} />
          <button onClick={this.props.loadSampleFishes}>
            Load Sample Fishes
          </button>
        </div>
      );
    }
  }
}

export default Inventory;
