import React from 'react';
import PropTypes from 'prop-types';

class EditFishForm extends React.Component {
  static propTypes = {
    updateFish: PropTypes.func.isRequired,
    fish: PropTypes.shape({
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      desc: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      status: PropTypes.string.isRequired
    }),
    index: PropTypes.string.isRequired
  };

  handleChange = event => {
    // Take a copy of the current fish
    const updatedFish = {
      ...this.props.fish,
      [event.currentTarget.name]: event.currentTarget.value
    };
    // Update fish in state
    this.props.updateFish(this.props.index, updatedFish);
  };

  render() {
    const fish = this.props.fish;
    return (
      <div className="fish-edit">
        <input
          name="name"
          type="text"
          placeholder="Name"
          value={fish.name}
          onChange={this.handleChange}
        />
        <input
          name="price"
          type="text"
          placeholder="Price"
          value={fish.price}
          onChange={this.handleChange}
        />
        <select name="status" value={fish.status} onChange={this.handleChange}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea
          name="desc"
          placeholder="Desc"
          value={fish.desc}
          onChange={this.handleChange}
        />
        <input
          name="image"
          type="text"
          placeholder="Image"
          value={fish.image}
          onChange={this.handleChange}
        />
        <button onClick={() => this.props.deleteFish(this.props.index)}>
          Remove Fish
        </button>
      </div>
    );
  }
}

export default EditFishForm;
