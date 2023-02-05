import { Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import AuthService from "../services/auth.service";

const Register = () => {

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        },
        onSubmit: (values) => {
            if(AuthService.register(values)) {
                console.log('registered');
            } else {
                console.log('not registered');
            }
        },
    });


    return (
        <Form onSubmit={formik.handleSubmit}>
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
            </Form.Group>

            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    id="password"
                    name="password"
                />
            </Form.Group>

            <Button variant="primary" type="submit">Register</Button>
        </Form>
    )
}

export default Register;