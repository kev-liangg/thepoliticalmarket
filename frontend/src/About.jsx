import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class About extends Component {

    state = {
        commitVals: [0, 0, 0, 0, 0],
        issueVals: [0, 0, 0, 0, 0]
    }

    async getCommits() {
        let response = await axios.get('https://gitlab.com/api/v4/projects/24709028/repository/commits');
        return response.data;
    }
    
    parseCommits(commits) {
        let newVals = [0, 0, 0, 0, 0];
        for (const i in commits) {
            console.log(commits[i]["author_name"]);
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

    componentDidMount() {
        const commits = this.getCommits();
        commits.then((commits) => {
            console.log(commits);
            this.setState({commitVals: this.parseCommits(commits)});
        });
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