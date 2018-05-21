import React, { Component } from "react";
import PropTypes from "prop-types";
import shortid from "shortid";
import TableRow from './TableRow';
const uuid = shortid.generate;


class Table extends Component {
  constructor(){
    super()
  this.handleDelete = this.handleDelete.bind(this);
  }
  static propTypes = {
    deleteLead: PropTypes.func.isRequired,
    editLead: PropTypes.func.isRequired,
    reloadData: PropTypes.func.isRequired

  };
  
  
  handleDelete = (key) => {
    this.props.deleteLead(key);
  }

  handleEdit = (key, name, email, message ) => {
    this.props.editLead(key, name, email, message)
  }
  render() {
    let data = this.props.data;
    let table = null;
    if (!data.length) {
      table = (<p> Nothing to show </p>)
    } else {
    table = (
      <div className="column">
        <h2 className="subtitle">
          Showing <strong>{data.length} items</strong>
        </h2>
        <table className="table is-striped">
          <thead>
            <tr>{Object.entries(data[0]).map(el => <th key={uuid()}>{el[0]}</th>)}<th> Actions </th>
            </tr>
          </thead>
          <tbody>
            {data.map(el => (
              <TableRow
                key={el.id}
                el={el}
                handleDelete={this.handleDelete}
                reloadData={this.props.reloadData}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
    }

    return(
      <div>{table}</div>
    )

  }
}
Table.propTypes = {
  data: PropTypes.array.isRequired
};
export default Table;