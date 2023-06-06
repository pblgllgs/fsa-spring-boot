import SidebarWithHeader from "./components/shared/sideBar";
import { useEffect, useState } from "react";
import { getCustomers } from "./services/client";
import { Spinner, Text, Wrap, WrapItem } from "@chakra-ui/react";
import CardwithImage from "./components/Card";
import CreateCustomerDrawer from "./components/CreateCustomerDrawer.jsx";
import { errorNotification } from "./services/notification.js";

const App = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setError] = useState("");

  const fetchCustomers = () => {
    setLoading(true);
    getCustomers()
      .then((response) => {
        console.log(response.data);
        setCustomers(response.data);
      })
      .catch((err) => {
        setError(err.response.data.message);
        errorNotification(err.code, err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  if (loading) {
    return (
      <SidebarWithHeader>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </SidebarWithHeader>
    );
  }

  if (err) {
    return (
      <SidebarWithHeader>
        <CreateCustomerDrawer fetchCustomers={fetchCustomers} />
        <Text mt={5}>Oooops there was an error</Text>
      </SidebarWithHeader>
    );
  }

  if (customers.length <= 0) {
    return (
      <SidebarWithHeader>
        <CreateCustomerDrawer fetchCustomers={fetchCustomers} />
        <Text mt={5}>No customers available</Text>
      </SidebarWithHeader>
    );
  }

  return (
    <>
      <SidebarWithHeader>
        <CreateCustomerDrawer fetchCustomers={fetchCustomers} />
        <Wrap justify={"center"} spacing={"30px"}>
          {customers.map((customer, index) => (
            <WrapItem key={index}>
              <CardwithImage
                {...customer}
                imageNumber={index}
                fetchCustomers={fetchCustomers}
              />
            </WrapItem>
          ))}
        </Wrap>
      </SidebarWithHeader>
    </>
  );
};

export default App;
