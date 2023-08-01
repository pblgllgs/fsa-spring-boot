import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import { updateCustomer } from "../../services/client.js";
import {
  errorNotification,
  successNotification,
} from "../../services/notification.js";

// eslint-disable-next-line react/prop-types
const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <Box>
      {/* eslint-disable-next-line react/prop-types */}
      <FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>
      <Input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <Alert className="error" status={"error"} mt={2}>
          <AlertIcon />
          {meta.error}
        </Alert>
      ) : null}
    </Box>
  );
};

// And now we can use these
// eslint-disable-next-line react/prop-types
const UpdateCustomerForm = ({ fetchCustomers, initialValues, costumerId , onClose}) => {
  return (
    <>
      <Formik
        validationSchema={Yup.object({
          name: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required"),
          email: Yup.string()
            .email("Must be 20 characters or less")
            .required("Required"),
          age: Yup.number()
            .min(16, "Must be a least 16 years pf age")
            .max(100, "Must be a less than 100 years of age")
            .required("Required"),
        })}
        initialValues={initialValues}
        onSubmit={(updatedCostumer, { setSubmitting }) => {
          setSubmitting(true);
          updateCustomer(costumerId, updatedCostumer)
            .then((res) => {
              console.log(res);
              successNotification(
                "Customer updated",
                "Customer successfully updated"
              );
              fetchCustomers();
            })
            .catch((err) => {
              console.log(err);
              errorNotification(err.code, err.response.data.message);
            })
            .finally(() => {
              setSubmitting(false);
              onClose()
            });
        }}
      >
        {({ isValid, isSubmitting, dirty }) => (
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

              <Button
                disabled={!(isValid && dirty) || isSubmitting}
                type="submit"
              >
                Submit
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default UpdateCustomerForm;
