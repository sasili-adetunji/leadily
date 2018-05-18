import React, { Component } from "react";
import ReactDOM from "react-dom";
import DataProvider from "./DataProvider";
import Form from "./Form";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      loaded: false,
      placeholder: "Loading..."
    }
    this.submitForm = this.submitForm.bind(this);
    this.deleteLeads = this.deleteLeads.bind(this);
    this.editLeads = this.editLeads.bind(this);
  }

  componentDidMount() {
    fetch("api/lead/")
      .then(response => {
        if (response.status !== 200) {
          this.setState({
            placeholder: "Something went wrong"
          })
        }
        return response.json();
      })
      .then(data => this.setState({ data: data, loaded: true }));
  }

  submitForm(name, email, message) {
    const lead = { name, email, message };
    const conf = {
      method: "post",
      body: JSON.stringify(lead),
      headers: new Headers({ "Content-Type": "application/json" })
    };
    fetch("api/lead/", conf).then(response => {
      fetch("api/lead/")
        .then(response => {
          if (response.status !== 200) {
            this.setState({
              placeholder: "Something went wrong"
            })
          }
          return response.json();
        })
        .then(data => this.setState({ data: data, loaded: true }));
    });

  }


  deleteLeads(lead_id) {
    const conf = {
      method: "delete",
      headers: new Headers({ "Content-Type": "application/json" })
    };
    fetch("api/lead/" + lead_id + "/", conf).then(response => {
        fetch("api/lead/")
          .then(response => {
            if (response.status !== 200) {
              this.setState({
                placeholder: "Something went wrong"
              })
            }
            return response.json();
          })
          .then(data => this.setState({data: data, loaded: true }))
    })
  }


  editLeads(lead_id, name, email, message) {
    const lead = { name, email, message };
    // console.log(lead, lead_id)
  }
  render() {
    return (
      <React.Fragment>
        <DataProvider
          data={this.state.data}
          loaded={this.state.loaded}
          placeholder={this.state.placeholder}
          deleteLeads={this.deleteLeads}
          editLeads={this.editLeads}
        />

        <Form
          submitForm={this.submitForm}
          message="Save Lead"
        />
      </React.Fragment>
    );
  }
}

const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<App />, wrapper) : null;