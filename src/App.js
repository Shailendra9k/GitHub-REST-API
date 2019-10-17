import React from "react";
import "./App.css";

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
    const itemRows = this.state.data.map((item, index) => (
      <tr key={index}>
        <td>{item.full_name}</td>
        <td>
          <a href={item.html_url}>{item.html_url}</a>
        </td>
      </tr>
    ));
    return (
      <div className="App">
        <h1>Repositories</h1>
        <input type="text" onChange={this.handleChange} />
        <button onClick={this.fetchData} value={this.state.keyword}>
          Fetch
        </button>
        <table>
          <tbody>
            <thead>
              <tr>
                <th>Name</th>
                <th>URL</th>
              </tr>
            </thead>
            {itemRows}
          </tbody>
        </table>
      </div>
    );
  }
}

export default FetchGitHub;
