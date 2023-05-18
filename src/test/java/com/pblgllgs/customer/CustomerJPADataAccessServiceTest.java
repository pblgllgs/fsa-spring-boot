package com.pblgllgs.customer;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;

import static org.mockito.Mockito.*;

class CustomerJPADataAccessServiceTest {

    @Autowired
    private CustomerJPADataAccessService underTest;

    @Mock
    private CustomerRepository customerRepository;

    private AutoCloseable autoCloseable;
    @BeforeEach
    void setUp() {
        autoCloseable = MockitoAnnotations.openMocks(this);
        underTest = new CustomerJPADataAccessService(customerRepository);
    }

    @AfterEach
    void tearDown() throws Exception {
        autoCloseable.close();
    }

    @Test
    void selectAllCustomers() {
        underTest.selectAllCustomers();

        verify(customerRepository)
                .findAll();
    }

    @Test
    void getCustomerById() {
        int id =1;
        underTest.getCustomerById(id);
        verify(customerRepository)
                .findById(id);
    }

    @Test
    void insertCustomer() {
        Customer customer = new Customer(
                1,
                "pblgllgs",
                "pblgllgs@gmail.com",
                20,
                Gender.MALE);
        underTest.insertCustomer(customer);
        verify(customerRepository)
                .save(customer);
    }

    @Test
    void existsPersonWithEmail() {

        String email ="pblgllgs@gmail.com";
        underTest.existsPersonWithEmail(email);

        verify(customerRepository)
                .existsCustomerByEmail(email);
    }

    @Test
    void deleteCustomerById() {
        int id =1;

        underTest.deleteCustomerById(id);
        verify(customerRepository)
                .deleteById(id);
    }

    @Test
    void existsPersonWithId() {
        int id =1;

        underTest.existsPersonWithId(id);
        verify(customerRepository)
                .existsCustomerById(id);
    }

    @Test
    void updateCustomer() {
        Customer customer = new Customer(
                1,
                "pblgllgs",
                "pblgllgs@gmail.com",
                20,
                Gender.MALE);
        underTest.updateCustomer(customer);
        verify(customerRepository)
                .save(customer);
    }
}