import {
  Flex,
  Text,
  Stack,
  Image,
  Link,
  Box,
  FormLabel,
  Input,
  Alert,
  AlertIcon,
  Button,
  Heading,
} from "@chakra-ui/react";
import { Form, Formik, useField } from "formik";
import * as Yup from "yup";
import { useAuth } from "../context/AuthContext";
import { errorNotification } from "../../services/notification";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Swal from 'sweetalert2'

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

const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  return (
    <Formik
      validateOnMount={true}
      validationSchema={Yup.object({
        username: Yup.string()
          .email("Must be a valid email")
          .required("Email is required"),
        password: Yup.string()
          .max(20, "Password can not be less than 20 characters")
          .required("Password is required"),
      })}
      initialValues={{ username: "pblgllgs@gmail.com", password: "password" }}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        login(values)
          .then((res) => {
            Swal.fire("Welcome","Ingreso exitoso","success")
            navigate("/dashboard");
            console.log("Success login", res);
          })
          .catch((err) => {
            errorNotification(err.code, err.response.data.message);
          })
          .finally(() => {
            setSubmitting(false);
          });
      }}
    >
      {({ isValid, isSubmitting }) => {
        return (
          <Form>
            <Stack spacing={15}>
              <MyTextInput label={"Email"} name={"username"} type={"email"} />
              <MyTextInput
                label={"Password"}
                name={"password"}
                type={"password"}
                placeholder={"Type your password"}
              />
              <Button disabled={!isValid || isSubmitting} type="submit">
                Login
              </Button>
            </Stack>
          </Form>
        );
      }}
    </Formik>
  );
};

const Login = () => {
  const { customer } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (customer) {
      navigate("/dashboard");
    }
  });

  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Image
            size={"100px"}
            alt={"LOGO"}
            src={
              "https://cdn1.iconfinder.com/data/icons/logos-and-brands-3/512/84_Dev_logo_logos-512.png"
            }
          />
          <Heading fontSize={"2xl"} mb={15}>
            Sign in to your account
          </Heading>
          <LoginForm />
        </Stack>
      </Flex>
      <Flex
        flex={1}
        p={10}
        flexDirection={"column"}
        alignItems={"center"}
        justifyItems={"center"}
        bgGradient={{ sm: "linear(to-r, blue.600, purple.600)" }}
      >
        <Text fontSize={"6xl"} color={"white"} fontWeight={"bold"} mb={5}>
          <Link href={"https://pblgllgs.com"}>Lets go!!!</Link>
        </Text>
        <Image
          alt={"Login Image"}
          objectFit={"cover"}
          src={
            "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
          }
        />
      </Flex>
    </Stack>
  );
};

export default Login;
