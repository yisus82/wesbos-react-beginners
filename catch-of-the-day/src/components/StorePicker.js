import React from 'react';
import PropTypes from 'prop-types';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
  myInput = React.createRef();

  static propTypes = {
    history: PropTypes.object.isRequired
  };

  goToStore = event => {
    // Stop the form from submitting
    event.preventDefault();
    // Get the text from the input
    const storeName = this.myInput.current.value;
    // Change the page to /store/whatever-they-entered
    this.props.history.push(`/store/${storeName}`);
  };

  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please enter a store</h2>
        <input
          ref={this.myInput}
          type="text"
          placeholder="Store Name"
          defaultValue={getFunName()}
          required
        />
        <button type="submit">Visit store →</button>
      </form>
    );
  }
}

export default StorePicker;
