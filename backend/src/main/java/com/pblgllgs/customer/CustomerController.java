package com.pblgllgs.customer;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/customers")
public class CustomerController {

    private final CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }


    @GetMapping
    public List<Customer> getCustomers(){
        return customerService.getAllCustomers();
    }

    @GetMapping("/{customerId}")
    public Customer getCustomerById(@PathVariable("customerId") Integer customerId){
        return customerService.getCustomer(customerId);
    }

    @PostMapping
    public void addCustomer(@RequestBody CustomerRegistrationRequest customerRegistrationRequest){
        customerService.addCustomer(customerRegistrationRequest);
    }

    @DeleteMapping("/{customerId}")
    public void deleteCustomer(@PathVariable("customerId") Integer customerId){
        customerService.deleteCustomer(customerId);
    }

    @PutMapping("/{customerId}")
    public void updateCustomer(
            @PathVariable("customerId") Integer customerId,
            @RequestBody CustomerUpdateRequest customerUpdateRequest){
        customerService.updateCustomer(customerId,customerUpdateRequest);
    }
}

