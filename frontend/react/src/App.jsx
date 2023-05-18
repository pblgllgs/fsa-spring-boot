import SidebarWithHeader from "./components/shared/sideBar";
import { useEffect, useState } from "react";
import { getCustomers } from "./services/client";
import { Spinner, Text, Wrap, WrapItem } from "@chakra-ui/react";
import CardwithImage from "./components/Card";

const App = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCustomers()
      .then((response) => {
        console.log(response.data);
        setCustomers(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []),
    [loading];

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

  if (customers.length <= 0) {
    <SidebarWithHeader>
      <Text>No customers available</Text>
    </SidebarWithHeader>;
  }

  return (
    <>
      <SidebarWithHeader>
        <Wrap justify={"center"} spacing={"30px"}>
          {customers.map((customer, index) => (
              <WrapItem key={index}>
                <CardwithImage  {...customer}/>
              </WrapItem>
            ))}
        </Wrap>
      </SidebarWithHeader>
    </>
  );
};

export default App;
