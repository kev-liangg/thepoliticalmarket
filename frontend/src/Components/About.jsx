import React, { Component } from 'react';
import axios from 'axios';
import '../App.css';
import Button from 'react-bootstrap/Button'
// import blank_profile from "./blank-profile.png"
import vaishnav from "./Vaishnav.png"
import kevinl from "./kevin.png"
import kevinc from "./kevinchen.jpeg" 
import anisha from "./anisha.png"
import diyuan from "./diyuan.png" 
const cardStyle = {
    'backgroundColor': '#82b3c9', 
    'width': '16.5rem', 
    'margin':'0.20rem',
}

class About extends Component {

    state = {
        commitVals: [0, 0, 0, 0, 0, 0],
        issueVals: [0, 0, 0, 0, 0, 0],
        unitTests : [7, 7, 14, 13, 0, 41]
    }

    // API calls are asynchronous. use await for the GET, returns a Promise.
    async getCommits() {
        let url = 'https://gitlab.com/api/v4/projects/24709028/repository/commits?per_page=40';
        let commits = [];
        let i = 1;
        while (true) {
            let response = await axios.get(url + "&page=" + i);
            if (!response.data.length) {
                break;
            }
            else {
                commits = commits.concat(response.data);
                ++i;
            }
        }
        return commits;
    }

    async getIssues() {
        let url = 'https://gitlab.com/api/v4/projects/24709028/issues?per_page=40';
        let issues = [];
        let i = 1;
        while (true) {
            let response = await axios.get(url + "&page=" + i);
            if (!response.data.length) {
                break;
            }
            else {
                issues = issues.concat(response.data);
                ++i;
            }
        }
        return issues;
    }

    // Updates the Component if any changes occur; that is to say, when the Promises from above fulfill.
    // The state will change to reflect the actual number of commits and issues when computed, which will render.
    componentDidMount() {
        const commits = this.getCommits();
        const issues = this.getIssues();
        // then() statements for issues and commits Promises evaluate when Promise fulfilled.
        commits.then((commits) => {
            this.setState({ commitVals: this.parseCommits(commits) });
        });
        issues.then((issues) => {
            this.setState({ issueVals: this.parseIssues(issues) });
        });
    }

    // Parsing functions operate on unwrapped data, and returns the proper value to update the state.
    parseCommits(commits) {
        let newVals = [0, 0, 0, 0, 0, 0];
        // console.log(commits);
        for (const i in commits) {
            // todo: update this switch statement once all commit identities are known
            switch (commits[i]["author_name"]) {
                case "Kevin Liang":
                    ++newVals[0];
                    ++newVals[5];
                    break;
                case "Kevin Chen":
                    ++newVals[1];
                    ++newVals[5];
                    break;
                case "kevinchenftw":
                    ++newVals[1];
                    ++newVals[5];
                    break;
                case "RedWhite KIAMI Dai":
                    ++newVals[2];
                    ++newVals[5];
                    break;
                case "Diyuan Dai":
                    //I changed my profile name to my real name
                    ++newVals[2];
                    ++newVals[5];
                    break;
                case "root":
                    //I am using SSH to push, which will be shown as root. Sorry to add complexity.
                    ++newVals[2];
                    ++newVals[5];
                    break;
                case "Vaishnav Bipin":
                    ++newVals[3];
                    ++newVals[5];
                    break;
                case "Anisha Kollareddy":
                    ++newVals[4];
                    ++newVals[5];
                    break;
                case "Anisha":
                    ++newVals[4];
                    ++newVals[5];
                    break;
                default:
                    break;
            }

        }
        return newVals;
    }

    parseIssues(issues) {
        let newVals = [0, 0, 0, 0, 0, 0];
        for (const i in issues) {
            if (issues[i]["closed_by"] != null) {
                switch (issues[i]["closed_by"]["username"]) {
                    case "kev-liangg":
                        ++newVals[0];
                        ++newVals[5];
                        break;
                    case "kevinchenftw":
                        ++newVals[1];
                        ++newVals[5];
                        break;
                    case "beastblackga":
                        ++newVals[2];
                        ++newVals[5];
                        break;
                    case "VaishnavBipin":
                        ++newVals[3];
                        ++newVals[5];
                        break;
                    case "anishakollareddy":
                        ++newVals[4];
                        ++newVals[5];
                        break;
                    case "anisha":
                        ++newVals[4];
                        ++newVals[5];
                        break;
                    default:
                        break;
                }
            }            
        }
        return newVals;
    }


    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <div className="container" style={{ marginTop: '0vh', marginBottom: '20vh' }}>
                    <br></br>
                    <h1>About The Political Market</h1>
                        <div className="row">
                            <p>
                                This website allows its users, the general public, to view the stock positions of Congress members and compare
                                them to aggregated market data, government contracts, and campaign financing history.
                                <br></br>
                                <br></br>
                                Our disparate data is definitely interesting because the most obvious integration is through state. Members of congress
                                have jobs to represent their state, which includes corporations and the people working for them. Corporation headquarters
                                likely hold more influence, and contracts awarded through government are very beneficial for companies. Company performance
                                and influence can also be tracked through stock market performance if they are publicly listed, so there is much potential
                                to uncover connections and correlations.
                                <br></br>
                                <br></br>
                                From the data we worked with so far, we anticipate the trend will be that large companies, indicated by their market share or
                                trading volume, will be the the most frequent contract recipients. The headquarters and operational states of those companies 
                                might see increased contribution to candidates in that state. If we are able to get candidate portfolios as a reliable attribute,
                                we feel we might see a correlation between the richest candidates and campaign contributions, scaled up if they are in a major
                                state of operations for large companies as well or if they themselves are major shareholders.
                                <br></br>
                                <br></br>
                            </p>
                            </div>

                            </div>
                        
                        <div className="section" style={{ marginTop: '-20vh', marginBottom: '0vh' }}>
                        <h1>Team Members</h1>
                        <div className="row justify-content-center">
                            
                            <div className='card' style={cardStyle}>
                            <img className="card-img-top" src={vaishnav} alt=""></img>
                                <div className='card-body'>
                                    <h4 className="card-title" style={{"font-size":"24px"}}>Vaishnav Bipin</h4>
                                    <p className="card-text" style={{"font-size":"18px"}}>- Full Stack Developer</p>
                                    <p className="card-text" style={{"font-size":"18px"}}>
                                        Hi, I'm Vaishnav, and I am a sophomore CS major from Austin, TX. In my free time I like to play and listen to music. I'm responsible
                                        for our major frontend decisions as well as the data model for Politicians.
                                    </p>
                                </div>
                            </div>

                            <div className='card' style={cardStyle}>
                            <img className="card-img-top" src={kevinl} alt=""></img>
                                <div className='card-body'>
                                    <h4 className="card-title" style={{"font-size":"24px"}}>Kevin Liang</h4>
                                    <p className="card-text" style={{"font-size":"18px"}}>- Team Leader/Full Stack Developer</p>
                                    <p className="card-text" style={{"font-size":"18px"}}>
                                        Hello there, my name is Kevin Liang. I'm a 4th-year CS major at UT, attending all the way from the 100-plus degree summers
                                        of Phoenix, Arizona. An interesting fact about myself is I used to play double bass in both orchesta and jazz. I'm responsible
                                        for managing the team and integrating between the repository, hosting, database, backend, and frontend.
                                    </p>
                                </div>
                            </div>

                            <div className='card' style={cardStyle}>
                            <img className="card-img-top" src={kevinc} alt=""></img>
                                <div className='card-body'>
                                    <h4 className="card-title" style={{"font-size":"24px"}}>Kevin Chen</h4>
                                    <p className="card-text" style={{"font-size":"18px"}}>- Full Stack Developer</p>
                                    <p className="card-text" style={{"font-size":"18px"}}>
                                        I am a Sophomore Computer Science Major at the University of Texas at Austin, and my fun fact is I am trilingual. 
                                        I am responsible for implementing our government contract model, with data from aggregate government spending. 
                                    </p>
                                </div>
                            </div>

                            <div className='card' style={cardStyle}>
                            <img className="card-img-top" src={anisha} alt=""></img>
                                <div className='card-body'>
                                    <h4 className="card-title" style={{"font-size":"24px"}}>Anisha Kollareddy</h4>
                                    <p className="card-text" style={{"font-size":"18px"}}>- Full Stack Developer</p>
                                    <p className="card-text" style={{"font-size":"18px"}}>
                                        Hello! I'm Anisha, a Junior Computer Science major at UT. I'm originally from the Bay Area, California, but 
                                        love exploring all Austin has to offer in my free time. I'm responsible for our maintaining and implementing our API
                                        as per our frontend and customer requirements.
                                    </p>
                                </div>
                            </div>

                            <div className='card' style={cardStyle}>
                            <img className="card-img-top" src={diyuan} alt=""></img>
                                <div className='card-body'>
                                    <h4 className="card-title" style={{"font-size":"24px"}}>Diyuan Dai</h4>
                                    <p className="card-text" style={{"font-size":"18px"}}>- Full Stack Developer</p>
                                    <p className="card-text" style={{"font-size":"18px"}}>
                                        Hi, I am Diyuan. I am a Junior Computer Science major at UT Austin. I play lots of video games in my spare time. 
                                        I am also a drum player in a school band. I am responsible for our company and stock market model, and aggregating
                                        historic performance data to best represent patterns and connections.
                                    </p>
                                </div>
                            </div>
                            
                        </div>
                        </div>
                    
                    <br></br>
                    <br></br>
                    <h1>Contribution Statistics</h1>
                    <table>
                        <tr>
                            <th>Member Name</th>
                            <th># Commits</th>
                            <th># Issues</th>
                            <th># Unit Tests</th>
                        </tr>
                        <tr>
                            <td>Kevin Liang</td>
                            <td>{this.state.commitVals[0]}</td>
                            <td>{this.state.issueVals[0]}</td>
                            <td>{this.state.unitTests[0]}</td>
                        </tr>
                        <tr>
                            <td>Kevin Chen</td>
                            <td>{this.state.commitVals[1]}</td>
                            <td>{this.state.issueVals[1]}</td>
                            <td>{this.state.unitTests[1]}</td>
                        </tr>
                        <tr>
                            <td>Diyuan Dai</td>
                            <td>{this.state.commitVals[2]}</td>
                            <td>{this.state.issueVals[2]}</td>
                            <td>{this.state.unitTests[2]}</td>
                        </tr>
                        <tr>
                            <td>Vaishnav Bipin</td>
                            <td>{this.state.commitVals[3]}</td>
                            <td>{this.state.issueVals[3]}</td>
                            <td>{this.state.unitTests[3]}</td>
                        </tr>
                        <tr>
                            <td>Anisha Kollareddy</td>
                            <td>{this.state.commitVals[4]}</td>
                            <td>{this.state.issueVals[4]}</td>
                            <td>{this.state.unitTests[4]}</td>
                        </tr>
                        <tr style={{"font-weight":"bold"}}>
                            <td>Total</td>
                            <td>{this.state.commitVals[5]}</td>
                            <td>{this.state.issueVals[5]}</td>
                            <td>{this.state.unitTests[5]}</td>
                        </tr>    

                    </table>
                    <div className="container">
                    <div className="row">
                    <div className="col-sm-6">
                    <Button style={{
                        padding: 2 + 'vh',
                        margin: 5 + 'vh',
                        fontSize: 100 + '%'
                    }} href="https://documenter.getpostman.com/view/14826278/Tz5jfLrU">Postman Documentation</Button>
                    </div>
                    <div className="col-sm-6">
                    <Button style={{
                        padding: 2 + 'vh',
                        margin: 5 + 'vh',
                        fontSize: 100 + '%'
                    }} href="https://gitlab.com/kevinchenftw/thepoliticalmarket">GitLab Repo</Button>
                    </div>
                    </div>
                    </div>
                    <div className="container">
                    <div className="row">
                    <div className="col-sm-12" style={{"text-align":"left"}}> 
                        <h2>Data Sources (APIs)</h2>
                            <a href="https://www.propublica.org/datastore/api/campaign-finance-api">Propublica API</a> - 
                            documentation of how to scrape can be found <a href="https://propublica.github.io/campaign-finance-api-docs/">here</a>
                            <br></br>
                            <a href="https://api.usaspending.gov/">USA Spending API</a> - Includes data on government contracts and contractors
                            <br></br>
                            <a href="https://www.opensecrets.org/open-data/api">OpenSecrets API</a> - Per-politician campaign pinance and portfolio data including specific organizations
                            <br></br>
                            <a href="https://finnhub.io/">Finnhub API</a> - Historic stock market performance and per-company specifics
                            <br></br>
                        <br></br>
                        <h2>Tools Used</h2>
                        <h4>Development</h4>
                        <li> <a href="https://www.postman.com/">Postman</a> - creates and hosts ThePoliticalMarket RESTful API Documentation</li>
                        <li> <a href="https://gitlab.com/">Gitlab</a> - issue tracking, project management, version control, continuous integration</li>
                        <li> <a href="https://docs.gitlab.com/ee/ci/">Gitlab CI</a> - a continuous integration pipeline specifically integrated into our repository</li>
                        <h4>Backend</h4>
                        <li> <a href="https://www.docker.com/">Docker</a> - gives our specific environment for the backend for any user or provider</li>
                        <li> <a href="https://wsgi.readthedocs.io/en/latest/what.html">wsgi</a> - allows our web server to forward requests to a Python web framework</li>
                        <li> <a href="https://flask.palletsprojects.com/en/1.1.x/">Flask</a> - the lightweight Python web framework communicating with through wsgi</li>
                        <li> <a href="https://flask-sqlalchemy.palletsprojects.com/en/2.x/">Flask-SQLAlchemy</a> - provides a powerful coding framework for accessing a SQL database </li>
                        <li> <a href="https://flask-restless.readthedocs.io/en/stable/">Flask-Restless</a> - simplifies generation of backend RESTful API from database calls</li>
                        <li> <a href="https://www.mysql.com/">MySQL</a> - a relational database management system to store all website data</li>
                        <li> <a href="https://docs.pytest.org/en/6.2.x/">Pytest</a> - a unit testing library for all our backend Python code</li>
                        <h4>Frontend</h4>
                        <li> <a href="https://yarnpkg.com/">yarn</a> - a package manager for our modules, allows us to locally compile and develop</li>
                        <li> <a href="https://reactjs.org/">React</a> - a library to develop and render our User Interface and visual components</li>
                        <li> <a href="https://react-bootstrap.github.io/">React-Bootstrap</a> - a library to further construct and stylize our frontend interface</li>
                        <li> <a href="https://jestjs.io/">Jest</a> - a unit testing library for our frontend Javascript code with React integration</li>
                        <li> <a href="https://splinter.readthedocs.io/en/latest/">Splinter</a> - a unit testing library for our frontend GUI and user experience</li>
                        <h2>Hosting Services</h2>
                        <li> <a href="https://aws.amazon.com/">AWS</a> (S3, ECR, EB, EC2, RDS), <a href="https://www.namecheap.com/">Namecheap</a></li>
                        
                    </div>
                    </div>
                    </div>
                </header>
            </div >
        );
    }
}



export default About;