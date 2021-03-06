import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class About extends Component {

    state = {
        test: NaN
    }

    async getCommits() {
        let response = await axios.get('https://gitlab.com/api/v4/projects/24709028/repository/commits');
        return response.data;
    }
    
    parseCommits(commits) {
        console.log(commits);
        commits.then((value) => console.log(value));
        let commitVals = [0, 0, 0, 0, 0];
        for (const c in commits) {
            console.log(c);
        }
    }

    componentDidMount() {
        let commits = this.getCommits();
        console.log(commits);
        commits.then(this.setState({ test: 69 }));
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
                        <td>{this.state.test}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Kevin Chen</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Diyuan Dai</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Vaishnav Bipin</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Anisah Kollareddy</td>
                        <td></td>
                        <td></td>
                    </tr>
                    </table>  
              </header>  
            </div>
          );
    }
}



export default About;