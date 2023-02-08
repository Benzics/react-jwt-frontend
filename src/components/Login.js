import { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate  } from 'react-router-dom';
import { login } from "../actions/auth";

const Login = () => {

    let navigate = useNavigate();
    const { isLoggedIn } = useSelector(state => state.auth);
    const { message } = useSelector(state => state.message);
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },

        validationSchema: Yup.object({
            email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
            password: Yup.string()
            .required('Required'),
        }),
        onSubmit: (values) => {
            setErr(false);
            setLoading(true);

            dispatch(login(values.email, values.password))
            .then(() => {
              
              navigate("/profile");
              window.location.reload();
            })
            .catch(() => {
                setLoading(false);
                setErr(true);
            });
        }
    });

 
    if (isLoggedIn) {
        return <Navigate to="/profile" />;
    }

    return (
        <Container>

            <h1>Login Now</h1>
            <p>Don't have an account yet? <Link to="/register">Register Now</Link> </p>

            <Form onSubmit={formik.handleSubmit}>
                {message && err && (
                    <Alert variant="danger">{ message }</Alert>
                )}
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
                 (<Alert variant="danger">{formik.errors.email}</Alert>) : null}
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
                  {formik.touched.password && formik.errors.password ? 
                 (<Alert variant="danger">{formik.errors.password}</Alert>) : null}
            </Form.Group>

            <Button variant="primary" className="my-2" type="submit" disabled={loading}>Login</Button>
            </Form>
        </Container>
    )
}

export default Login;