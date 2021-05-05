import { Component } from 'react';
import bg from "./assets/1393726.jpg";
import './Home.css'
import { Card, Button, CardDeck } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Contract from './assets/ContractLaw.jpg';
import Stock from './assets/StockIMG.jpg';
import Congress from './assets/Congress.png';
class Home extends Component {

    render() {
        return (
            <div>
            <div className="wrapper"> 
                <img src={bg} className="img-fluid w-100" alt="bg" />
                <div className="centered">
                    <div className="backing"></div>
                </div>
                <div className="centered">
                    The Political Market
                </div>
                <div className="centered-small">
                    Exploring the links between government contracts, stock performance, and campaign finance. See "About" for more details.
                </div>
            </div>
            <section>
                <br></br>
                <br></br>
            <div className="SplashInfo">
                    <h1><span>Contracts, Stocks, and Campaign Finance</span></h1>
                </div>
                <CardDeck>
                        <Card className="text-center" style={{ width: '18rem' }} border="dark">
                            <Card.Img variant="top" src={Contract} height="350" />
                            <Card.Body>
                                <Card.Title>Contracts</Card.Title>
                                <Card.Text>
                                    Find information about government contracts including amount awarded, service provided, and recipient
                                </Card.Text>
                                <Link to="/Contracts"><Button variant="btn btn-outline-success"> Contracts</Button></Link>
                            </Card.Body>
                        </Card>
                        <Card className="text-center" style={{ width: '18rem' }} border="dark">
                            <Card.Img variant="top" src={Stock} height="350" />
                            <Card.Body>
                                <Card.Title>Stocks</Card.Title>
                                <Card.Text>
                                   Track changes in the stock market and find market information about various companies
                                </Card.Text>
                                <Link to="/Stocks"> <Button variant="btn btn-outline-success">Stocks</Button></Link>
                            </Card.Body>
                        </Card>
                        <Card className="text-center" style={{ width: '18rem' }} border="dark">
                            <Card.Img variant="top" src={Congress} height="350" />
                            <Card.Body>
                                <Card.Title>Campaign Finance</Card.Title>
                                <Card.Text>
                                    See the positions of members of the United States Congress and detailed information about their campaign contributors
                                </Card.Text>
                                <Link to="/CampFin"><Button variant="btn btn-outline-success"> Campaign Finance</Button></Link>
                            </Card.Body>
                        </Card>
                    </CardDeck>

            </section>
            </div>
        )
    }

}

export default Home;