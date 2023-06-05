import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import {Alert, AlertIcon, Box, Button, FormLabel, Input, Select, Stack} from "@chakra-ui/react";
import {saveCustomer} from "../services/client.js";
import {errorNotification, successNotification} from "../services/notification.js";

// eslint-disable-next-line react/prop-types
const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <Box>
            {/* eslint-disable-next-line react/prop-types */}
            <FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>
            <Input className="text-input" {...field} {...props} />
            {meta.touched && meta.error ? (
                <Alert
                    className="error" status={"error"} mt={2}
                >
                    <AlertIcon/>
                    {meta.error}
                </Alert>
            ) : null}
        </Box>
    );
};


// eslint-disable-next-line react/prop-types
const MySelect = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <Box>
            {/* eslint-disable-next-line react/prop-types */}
            <FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>
            <Select {...field} {...props} />
            {meta.touched && meta.error ? (
                <Alert
                    className="error" status={"error"} mt={2}
                >
                    <AlertIcon/>
                    {meta.error}
                </Alert>
            ) : null}
        </Box>
    );
};

// And now we can use these
// eslint-disable-next-line react/prop-types
const CreateCustomerForm = ({fetchCustomers}) => {
    return (
        <>
            <Formik
                validationSchema={Yup.object({
                    name: Yup.string()
                        .max(15, 'Must be 15 characters or less')
                        .required('Required'),
                    email: Yup.string()
                        .email( 'Must be 20 characters or less')
                        .required('Required'),
                    age: Yup.number()
                        .min(16,'Must be a least 16 years pf age')
                        .max(100,'Must be a less than 100 years of age')
                        .required('Required'),
                    gender: Yup.string()
                        .oneOf(
                            ['MALE', 'FEMALE'],
                            'Invalid gender'
                        )
                        .required('Required'),
                })}
                initialValues={{
                    name: '',
                    email: '',
                    age: 0,
                    gender: '',
                }}
                onSubmit={(costumer, { setSubmitting }) => {
                    setSubmitting(true);
                    alert(JSON.stringify(costumer, null, 2));
                    saveCustomer(costumer)
                        .then( res => {
                            console.log(res);
                            successNotification("Customer saved", "customer added successfully")
                            fetchCustomers()
                        }).catch( err => {
                            console.log(err);
                            errorNotification(
                                err.code,
                                err.response.data.message
                            )
                        }).finally( () => {
                            setSubmitting(false);
                    })
                }}
            >
                {({isValid, isSubmitting}) => (
                    <Form>
                        <Stack spacing={"24px"}>
                            <MyTextInput
                                label="Name"
                                name="name"
                                type="text"
                                placeholder="Jane"
                            />

                            <MyTextInput
                                label="Email"
                                name="email"
                                type="email"
                                placeholder="jane@formik.com"
                            />

                            <MyTextInput
                                label="Age"
                                name="age"
                                type="text"
                                placeholder="20"
                            />

                            <MySelect label="Gender" name="gender">
                                <option value="">Select a gender type</option>
                                <option value="MALE">Male</option>
                                <option value="FEMALE">Female</option>
                            </MySelect>

                            <Button disabled={!isValid|| isSubmitting} type="submit">Submit</Button>
                        </Stack>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default CreateCustomerForm;