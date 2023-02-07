import { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate  } from 'react-router-dom';
import { login } from "../actions/auth";

const Login = () => {

    let navigate = useNavigate();
    const { isLoggedIn } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

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
            setLoading(true);

            dispatch(login(values.email, values.password))
            .then(() => {
              navigate("/profile");
              window.location.reload();
            })
            .catch((e) => {
                console.log(e);
                setLoading(false);
            });
        }
    });

 
    if (isLoggedIn) {
        return <Navigate to="/profile" />;
    }

    return (
        <Container>
            <h1>Login Now</h1>
            <Form onSubmit={formik.handleSubmit}>
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
                  {formik.touched.password && formik.errors.password ? 
                 (<div type="invalid">{formik.errors.password}</div>) : null}
            </Form.Group>
            </Form>
        </Container>
    )
}

export default Login;