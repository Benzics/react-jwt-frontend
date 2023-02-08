import { useEffect, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../actions/auth";
import { Container, Carousel, Navbar, Row, Col, Card } from "react-bootstrap";

import UserService from "../services/user.service";

const Profile = () => {

    const [content, setContent] = useState({});
    const [photos, setPhotos] = useState([]);
    const [avatar, setAvatar] = useState('/images/avatar.jpg');

    useEffect(() => {
        UserService.userDetails().then(
          (response) => {
            setContent(response);

            
             // if we have photos, we show in a carousel
   
            let images = response.photos.map((photo) => 
                <Carousel.Item key={photo.id}>
                    <img
                    className="d-block w-100"
                    src={photo.url}
                    alt={photo.name}
                    />
                    <Carousel.Caption>
                    <h3>{photo.name}</h3>
                    </Carousel.Caption>
                </Carousel.Item> 
            );
            setPhotos(images);

            const userAvatar = response.avatar.replace('public/', '/');
            setAvatar(userAvatar)
          },
          (error) => {
             
            const _content =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
    
            setContent(_content);
          }
        );
    }, []);

    const dispatch = useDispatch();

    const logOut = useCallback(() => {
        dispatch(logout());
      }, [dispatch]);
    
    return (
      <>
      <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>My Profile</Navbar.Brand>

        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
          <a href="/login" className="nav-link" onClick={logOut}>
            LogOut
          </a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
      </Navbar>
        <Container className="mt-5">
           <Row>
            <Col md={4}>
            <Card>
              <Card.Img variant="top" src={avatar} />
              <Card.Body>
                <Card.Title>{content.fullName}</Card.Title>
              </Card.Body>
            </Card>
            </Col>

            <Col md={8}>
            {/* if we have photos we show them in a carousel */}
            {photos && (
                <Carousel variant="dark">
                    {photos}
                </Carousel>
            )}
            </Col>
           </Row>
           </Container>
           
        </>
    )
}

export default Profile;