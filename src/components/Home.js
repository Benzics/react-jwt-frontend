import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

const Home = () => {
    return (
        <Container>
        <h2 className="mb-3">Helpful links</h2>
        <ul>
            <li><Link to="/register">Registration Page</Link></li>
            <li><Link to="/login">Login Page</Link></li>
        </ul>
       
        </Container>
    )
}

export default Home;