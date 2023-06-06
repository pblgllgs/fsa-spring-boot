import {
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent, DrawerFooter,
    DrawerHeader,
    DrawerOverlay, useDisclosure
} from "@chakra-ui/react";
import UpdateCustomerForm from "./UpdateCustomerForm.jsx";

const AddIcon = () => "+";
const CloseIcon = () => "X";

// eslint-disable-next-line react/prop-types
const UpdateCustomerDrawer = ({fetchCustomers, initialValues, costumerId}) => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    return (
        <>
            <Button
                bg={'gray.200'}
                color={'black'}
                rounded={'full'}
                _hover={{
                    transform: 'translateY(-2px)',
                    boxShadow: 'lg'
                }}
                _focus={{
                    bg: 'grey.500'
                }}
                leftIcon={<AddIcon/>}
                onClick={onOpen}
                colorScheme={"blue"}
            >Update Customer</Button>
            <Drawer isOpen={isOpen} onClose={onClose} size={"xl"}>
                <DrawerOverlay/>
                <DrawerContent>
                    <DrawerCloseButton/>
                    <DrawerHeader>Update customer</DrawerHeader>

                    <DrawerBody>
                        <UpdateCustomerForm
                            fetchCustomers={fetchCustomers}
                            initialValues={initialValues}
                            costumerId={costumerId}
                            onClose={onClose}
                        />
                    </DrawerBody>

                    <DrawerFooter>
                        <Button
                            leftIcon={<CloseIcon/>}
                            onClick={onClose}
                            colorScheme={"blue"}
                        >Close</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>

    )
}

export default UpdateCustomerDrawer;