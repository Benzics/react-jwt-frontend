import { Button, Form, Container } from "react-bootstrap";
import { useFormik } from "formik";
import {useState} from "react";
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/auth";
import { Link } from "react-router-dom";

const Register = () => {

    const [successful, setSuccessful] = useState(false);
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            photos: [],
        },
        // our form validation
        validationSchema: Yup.object({
            firstName: Yup.string()
            .min(2, 'Minimum of 2 characters expected')
            .max(25, 'Must be 25 characters or less')
            .required('Required'),
            lastName: Yup.string()
            .min(2, 'Minimum of 2 characters expected')
            .max(25, 'Must be 25 characters or less')
            .required('Required'),
            email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
            password: Yup.string()
            .min(6, 'Must be at least 6 characters')
            .max(50, 'Must be at most 50 characters')
        }),
        onSubmit: (values) => {
            let formData = new FormData();
            formData.append('email', values.email);
            formData.append('password', values.password);
            formData.append('firstName', values.firstName);
            formData.append('lastName', values.lastName);

            // our multiple files
            values.photos.forEach((photo, index) => {
                formData.append('photos[]', values.photos[index]);
            })
            dispatch(register(formData))
                .then(() => {
                    console.log('registered');
                    setSuccessful(true);
                })
                .catch((e) => {
                setSuccessful(false);
                console.log('something wrong', e)
            });
        },
    });


    return (
        <Container>
        <Form onSubmit={formik.handleSubmit} encType='multipart/form-data'>
            <Form.Group>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.firstName}
                    id="firstName"
                    name="firstName"
                />
                {formik.touched.firstName && formik.errors.firstName ? 
                 (<div type="invalid">{formik.errors.firstName}</div>) : null}
            </Form.Group>

            <Form.Group>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.lastName}
                    id="lastName"
                    name="lastName"
                />
                 {formik.touched.lastName && formik.errors.lastName ? 
                 (<div>{formik.errors.lastName}</div>) : null}
            </Form.Group>

            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    id="email"
                    name="email"
                />
                {formik.touched.email && formik.errors.email ? 
                 (<div type="invalid">{formik.errors.email}</div>) : null}
            </Form.Group>

            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    id="password"
                    name="password"
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>Photos</Form.Label>
                <Form.Control
                    type="file"
                    name="photos"
                    multiple
                    onChange={(e) => {
                        const files = e.target.files;
                        let photos = Array.from(files);
                        formik.setFieldValue('photos', photos)
                    }}
                    />
            </Form.Group>

            <Button variant="primary" className="mt-2 mb-2" type="submit">Register</Button>
        </Form>
        {successful && (
         <div className="alert alert-success">Registration successful 
         <Link to="/login">Login now</Link>
         </div>
        )}
        </Container>
    )
}

export default Register;