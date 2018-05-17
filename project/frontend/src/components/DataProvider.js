import React, { Component } from "react";
import PropTypes from "prop-types";
import Table from './Table';


class DataProvider extends Component {
  static propTypes = {
    loaded: PropTypes.bool.isRequired,
    placeholder: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      loaded: this.props.loaded,
      placeholder: this.props.placeholder
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.data,
      loaded: nextProps.loaded,
      placeholder: nextProps.placeholder
    });
  }

  render() {
    const { data, loaded, placeholder } = this.state;
    return loaded ? <Table data={this.state.data} /> : <p>{placeholder}</p>;
  }
}
export default DataProvider;