import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class About extends Component {

    state = {
        commitVals: [0, 0, 0, 0, 0],
        issueVals: [0, 0, 0, 0, 0]
    }

    // API calls are asynchronous. use await for the GET, returns a Promise.
    async getCommits() {
        let response = await axios.get('https://gitlab.com/api/v4/projects/24709028/repository/commits');
        return response.data;
    }

    async getIssues() {
        let response = await axios.get('https://gitlab.com/api/v4/projects/24709028/issues');
        return response.data;
    }

    // Updates the Component if any changes occur; that is to say, when the Promises from above fulfill.
    // The state will change to reflect the actual number of commits and issues when computed, which will render.
    componentDidMount() {
        const commits = this.getCommits();
        const issues = this.getIssues();
        // then() statements for issues and commits Promises evaluate when Promise fulfilled.
        commits.then((commits) => {
            this.setState({commitVals: this.parseCommits(commits)});
        });
        issues.then((issues) => {
            this.setState({issueVals: this.parseIssues(issues)});
        });
    }

    // Parsing functions operate on unwrapped data, and returns the proper value to update the state.
    parseCommits(commits) {
        let newVals = [0, 0, 0, 0, 0];
        for (const i in commits) {
            // todo: update this switch statement once all commit identities are known
            switch(commits[i]["author_name"]) {
                case "Kevin Liang":
                    ++newVals[0];
                    break;
                case "Kevin Chen":
                case "kevinchenftw":
                    ++newVals[1];
                    break;
                default:
                    break;
            }
        }
        return newVals;
    }

    parseIssues(issues) {
        let newVals = [0, 0, 0, 0, 0];
        for (const i in issues) {
            switch(issues[i]["author"]["username"]) {
                case "kev-liangg":
                    ++newVals[0];
                    break;
                case "kevinchenftw":
                    ++newVals[1];
                    break;
                case "beastblackga":
                    ++newVals[2];
                    break;
                case "VaishnavBipin":
                    ++newVals[3];
                    break;
                case "anishakollareddy":
                    ++newVals[4];
                    break;
                default:
                    break;
            }
        }
        return newVals;
    }
    
    render() {
        return (
            <div className="App">
              <header className="App-header">
                <table>
                    <tr>
                        <th>Member Name</th>
                        <th># Commits</th>
                        <th># Issues</th>
                    </tr>
                    <tr>
                        <td>Kevin Liang</td>
                        <td>{this.state.commitVals[0]}</td>
                        <td>{this.state.issueVals[0]}</td>
                    </tr>
                    <tr>
                        <td>Kevin Chen</td>
                        <td>{this.state.commitVals[1]}</td>
                        <td>{this.state.issueVals[1]}</td>
                    </tr>
                    <tr>
                        <td>Diyuan Dai</td>
                        <td>{this.state.commitVals[2]}</td>
                        <td>{this.state.issueVals[2]}</td>
                    </tr>
                    <tr>
                        <td>Vaishnav Bipin</td>
                        <td>{this.state.commitVals[3]}</td>
                        <td>{this.state.issueVals[3]}</td>
                    </tr>
                    <tr>
                        <td>Anisha Kollareddy</td>
                        <td>{this.state.commitVals[4]}</td>
                        <td>{this.state.issueVals[4]}</td>
                    </tr>
                    </table>  
              </header>  
            </div>
          );
    }
}



export default About;