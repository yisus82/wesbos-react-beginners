import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  };

  static propTypes = {
    match: PropTypes.object.isRequired
  };

  componentDidMount() {
    const storeId = this.props.match.params.storeId;
    const localStorageRef = localStorage.getItem(storeId);
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    } else {
      this.setState({
        order: {}
      });
    }
    this.ref = base.syncState(`${storeId}/fishes`, {
      context: this,
      state: 'fishes'
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  componentDidUpdate() {
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    );
  }

  addFish = fish => {
    // Take a copy of the existing state
    const fishes = { ...this.state.fishes };
    // Add the new fish to the fishes variable
    fishes[`fish${Date.now()}`] = fish;
    // Update state
    this.setState({ fishes });
  };

  updateFish = (key, updatedFish) => {
    // Take a copy of the existing state
    const fishes = { ...this.state.fishes };
    // Update the fish in the fishes variable
    fishes[key] = updatedFish;
    // Update state
    this.setState({ fishes });
  };

  deleteFish = key => {
    // Take a copy of the existing state
    const fishes = { ...this.state.fishes };
    // Delete the fish from the fishes variable
    fishes[key] = null;
    // Update state
    this.setState({ fishes });
  };

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes });
  };

  addToOrder = key => {
    // Take a copy of the existing state
    const order = { ...this.state.order };
    // Add to order or increase number in order
    order[key] = order[key] + 1 || 1;
    // Update state
    this.setState({ order });
  };

  removeFromOrder = key => {
    // Take a copy of the existing state
    const order = { ...this.state.order };
    // Delete fish from order
    delete order[key];
    // Update state
    this.setState({ order });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => (
              <Fish
                key={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
                index={key}
              />
            ))}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
          storeId={this.props.match.params.storeId}
        />
      </div>
    );
  }
}

export default App;
