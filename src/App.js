import React from "react";
import "./App.css";
import ReactTable from "react-table";
import "react-table/react-table.css";

class FetchGitHub extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
      data: [] //As repositories are returned as JSON arrays in response.
    };
  }

  //Adding change listener to input field to be able to save the input value to the state, called keyword.
  handleChange = event => {
    this.setState({ keyword: event.target.value });
  };
  //The function does REST API call when  it it invoked by pressing button.
  fetchData = () => {
    const url = `https://api.github.com/search/repositories?q=${this.state.keyword}`;
    fetch(url)
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          data: responseData.items
        });
      });
  };

  render() {
    const columns = [
      {
        Header: "Name", //Header of the column
        accessor: "full_name" // Value accessor
      },
      {
        Header: "URL", //Header of the column
        accessor: "html_url" // Value accessor
      },
      {
        Header: "Owner", //Header of the column
        accessor: "owner.login" // Value accessor
      },
      // Implementing cell renders
      {
        id: "button",
        sortable: false,
        filterable: false,
        width: 100,
        accessor: "full_name",
        Cell: ({ value }) => (
          <button
            className="btn btn-default btn-link"
            onClick={() => {
              this.btnClick(value);
            }}
          >
            Press me
          </button>
        )
      }
    ];
    return (
      <div className="App">
        <h1>Search Repositorie</h1>
        <input type="text" onChange={this.handleChange} />
        <button onClick={this.fetchData} value={this.state.keyword}>
          Fetch
        </button>
        <ReactTable
          data={this.state.data}
          columns={columns}
          filterable={true}
          defaultPageSize={10}
        />
      </div>
    );
  }
}

export default FetchGitHub;
