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

  render() {
    return (
      <React.Fragment>
        <DataProvider
          data={this.state.data}
          loaded={this.state.loaded}
          placeholder={this.state.placeholder}
        />

        <Form
          submitForm={this.submitForm}
        />
        <h1>Wassup y'all</h1>
      </React.Fragment>
    );
  }
}

const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<App />, wrapper) : null;