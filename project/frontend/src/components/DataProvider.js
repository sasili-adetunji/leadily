import React, { Component } from "react";
import PropTypes from "prop-types";
import Table from './Table';


class DataProvider extends Component {
  static propTypes = {
    loaded: PropTypes.bool.isRequired,
    placeholder: PropTypes.string.isRequired,
    deleteLeads: PropTypes.func.isRequired,
    editLeads: PropTypes.func.isRequired

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
    return loaded ? <Table data={this.state.data} 
                            deleteLead={this.props.deleteLeads}
                            editLead={this.props.editLeads}
                             /> : <p>{placeholder}</p>;
  }
}
export default DataProvider;