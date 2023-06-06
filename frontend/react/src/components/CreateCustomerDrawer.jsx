import {
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent, DrawerFooter,
    DrawerHeader,
    DrawerOverlay, useDisclosure
} from "@chakra-ui/react";
import CreateCustomerForm from "./CreateCustomerForm.jsx";

const AddIcon = () => "+";
const CloseIcon = () => "X";

// eslint-disable-next-line react/prop-types
const CreateCustomerDrawer = ({fetchCustomers}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <Button
            leftIcon={<AddIcon/>}
            onClick={onOpen}
            colorScheme={"blue"}
            >Create Customer</Button>
            <Drawer isOpen={isOpen} onClose={onClose} size={"xl"}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Create new customer</DrawerHeader>

                    <DrawerBody>
                        <CreateCustomerForm fetchCustomers={fetchCustomers} onClose={onClose}/>
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

export default CreateCustomerDrawer;