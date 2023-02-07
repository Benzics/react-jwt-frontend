import { useEffect, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../actions/auth";
import { Container, Carousel } from "react-bootstrap";

import UserService from "../services/user.service";

const Profile = () => {

    const [content, setContent] = useState({});
    const [photos, setPhotos] = useState([]);

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
        <Container>
            <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
            </a>
            {content && (
                <ul>
                    <li key="fullname">Full Name: {content.fullName}</li>
                    <li key="avatar">Avatar: <img src={content.avatar} alt='avatar'/></li>
                </ul>
            )}

            {/* if we have photos we show them in a carousel */}
            {photos && (
                <Carousel style={{maxWidth: "500px"}}>
                    {photos}
                </Carousel>
            )}
           
        </Container>
    )
}

export default Profile;