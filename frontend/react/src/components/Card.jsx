import {
    Heading,
    Avatar,
    Box,
    Center,
    Image,
    Flex,
    Text,
    Stack,
    useColorModeValue,
    Tag,
    Button,
    useDisclosure,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
} from "@chakra-ui/react";

import {useRef} from 'react';
import {deleteCustomer} from "../services/client.js";
import {errorNotification, successNotification} from "../services/notification.js";
import UpdateCustomerDrawer from "./UpdateCustomerDrawer.jsx";

// eslint-disable-next-line react/prop-types
export default function CardWithImage({id, name, email, age, gender, imageNumber, fetchCustomers}) {
    const randomUserGender = gender === "MALE" ? "men" : "women";
    const {isOpen, onOpen, onClose} = useDisclosure()
    const cancelRef = useRef()
    return (
        <Center py={6}>
            <Box
                maxW={"300px"}
                w={"full"}
                bg={useColorModeValue("white", "gray.800")}
                boxShadow={"2xl"}
                rounded={"md"}
                overflow={"hidden"}
            >
                <Image
                    h={"120px"}
                    w={"full"}
                    src={
                        "https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
                    }
                    objectFit={"cover"}
                />
                <Flex justify={"center"} mt={-12}>
                    <Avatar
                        size={"xl"}
                        src={
                            `https://randomuser.me/api/portraits/${randomUserGender}/${imageNumber}.jpg`
                        }
                        alt={"Author"}
                        css={{
                            border: "2px solid white",
                        }}
                    />
                </Flex>

                <Box p={6}>
                    <Stack spacing={0} align={"center"} mb={5}>
                        <Tag colorScheme="green" borderRadius="full" spacing={2}>
                            {id}
                        </Tag>
                        <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
                            {name}
                        </Heading>
                        <Text color={"gray.500"}>{email}</Text>
                        <Text color={"gray.500"}>Age {age} | {gender}</Text>
                    </Stack>
                </Box>
                <Stack direction={'row'} justify={'center'} spacing={6}>
                    <Stack>
                        <UpdateCustomerDrawer initialValues={{name, email, age}} costumerId={id} fetchCustomers={fetchCustomers} />
                    </Stack>
                    <Stack>
                        <Button
                            bg={'red.400'}
                            color={'white'}
                            rounded={'full'}
                            _hover={{
                                transform: 'translateY(-2px)',
                                boxShadow: 'lg'
                            }}
                            _focus={{
                                bg: 'grey.500'
                            }}
                            onClick={onOpen}
                        >
                            Delete
                        </Button>
                        <AlertDialog
                            isOpen={isOpen}
                            leastDestructiveRef={cancelRef}
                            onClose={onClose}
                        >
                            <AlertDialogOverlay>
                                <AlertDialogContent>
                                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                                        Delete Customer
                                    </AlertDialogHeader>

                                    <AlertDialogBody>
                                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                                        Are you sure? You want to delete {name}? You can't undo this operation.
                                    </AlertDialogBody>

                                    <AlertDialogFooter>
                                        <Button ref={cancelRef} onClick={onClose}>
                                            Cancel
                                        </Button>
                                        <Button colorScheme='red' onClick={ () => {
                                            // eslint-disable-next-line no-unused-vars
                                            deleteCustomer(id).then(res => {
                                                successNotification(
                                                    'Customer deleted',
                                                    `${name} was successfully deleted`
                                                )
                                                fetchCustomers()
                                            }).catch(err => {
                                                console.log(err)
                                                errorNotification(
                                                    err.code,
                                                    err.response.data.message
                                                )
                                            }).finally( () => {
                                                onClose()
                                            })
                                        }} ml={3}>
                                            Delete
                                        </Button>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialogOverlay>
                        </AlertDialog>
                    </Stack>
                </Stack>
            </Box>
        </Center>
    );
}
