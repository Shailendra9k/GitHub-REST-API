import React from "react";
import "./App.css";

const FetchGitHub = () => {
  const [repos, setRepo] = React.useState([]);
  const [keyword, setKeyword] = React.useState("");

  const inputChanged = event => {
    setKeyword(event.target.value);
  };

  const fetchData = () => {
    fetch(`https://api.github.com/search/repositories?q=${keyword}`)
      .then(response => response.json())
      .then(data => {
        setRepo(data.items);
      });
  };

  const repoRows = repos.map((repo, index) => (
    <tr key={index}>
      <td>{repo.full_name}</td>
      <td>
        <a href={repo.html_url}>{repo.html_url}</a>
      </td>
    </tr>
  ));

  return (
    <div className="App">
      <h1>Repositories</h1>
      <input type="text" onChange={inputChanged} />
      <button onClick={fetchData}>Fetch</button>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>URL</th>
          </tr>
          {repoRows}
        </tbody>
      </table>
    </div>
  );
};

export default FetchGitHub;
