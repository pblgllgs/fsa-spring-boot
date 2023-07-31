package com.pblgllgs.customer;

import com.pblgllgs.exception.DuplicateResourceException;
import com.pblgllgs.exception.ResourceNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.*;
import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(MockitoExtension.class)
class CustomerServiceTest {

    @Mock
    private CustomerDao customerDao;
    @Mock
    private PasswordEncoder passwordEncoder;


    private CustomerService underTest;

    @BeforeEach
    void setUp() {
        underTest = new CustomerService(customerDao, passwordEncoder);
    }

    @Test
    void getAllCustomers() {
        underTest.getAllCustomers();

        verify(customerDao).selectAllCustomers();
    }

    @Test
    void canGetCustomer() {
        int id = 1;

        Customer customer = new Customer(
                id, "Alex","alex@gmail.com", "password", 22,
                Gender.MALE);
        when(customerDao.getCustomerById(id)).thenReturn(Optional.of(customer));

        Customer actual = underTest.getCustomer(1);

        assertThat(actual).isEqualTo(customer);
    }

    @Test
    void willThrowWhenGetCustomerReturnEmptyOptional() {
        int id = 1;
        when(customerDao.getCustomerById(id)).thenReturn(Optional.empty());
        assertThatThrownBy( () -> underTest.getCustomer(id))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessage("Customer with id [%s] not found".formatted(id));
    }

    @Test
    void addCustomer() {
        int id = 1;
        String email = "alex@gmail.com";
        when(customerDao.existsPersonWithEmail(email)).thenReturn(false);
        CustomerRegistrationRequest request = new CustomerRegistrationRequest(
                "alex",email, "password", 22,
                Gender.MALE);

        String passwordHash = "!alksjdjkahsdkjhaksd";

        when(passwordEncoder.encode(request.password())).thenReturn(passwordHash);

        underTest.addCustomer(request);

        ArgumentCaptor<Customer> customerArgumentCaptor = ArgumentCaptor.forClass(Customer.class);

        verify(customerDao).insertCustomer(customerArgumentCaptor.capture());

        Customer captureCustomer = customerArgumentCaptor.getValue();

        assertThat(captureCustomer.getId()).isNull();
        assertThat(captureCustomer.getName()).isEqualTo(request.name());
        assertThat(captureCustomer.getEmail()).isEqualTo(request.email());
        assertThat(captureCustomer.getAge()).isEqualTo(request.age());
        assertThat(captureCustomer.getPassword()).isEqualTo(passwordHash);
    }

    @Test
    void willThrowWhenEmailExistsWhileAddingACustomer() {
        String email = "alex@gmail.com";
        when(customerDao.existsPersonWithEmail(email)).thenReturn(true);
        CustomerRegistrationRequest request = new CustomerRegistrationRequest(
                "alex",email, "password", 22,
                Gender.MALE);
        assertThatThrownBy( () -> underTest.addCustomer(request))
                .isInstanceOf(DuplicateResourceException.class)
                .hasMessage("The email is in use");
        verify(customerDao,never()).insertCustomer(any());
    }

    @Test
    void deleteCustomer() {
        int id = 1;
        when(customerDao.existsPersonWithId(id)).thenReturn(true);
        Customer customer = new Customer(
                id, "Alex","alex@gmail.com", "password", 22,
                Gender.MALE);
        underTest.deleteCustomer(id);
        verify(customerDao).deleteCustomerById(id);
    }

    @Test
    void willThrowDeleteCustomerWhenNotExists() {
        int id = 1;
        when(customerDao.existsPersonWithId(id)).thenReturn(false);
        assertThatThrownBy( () -> underTest.deleteCustomer(id))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessage("Customer with id [%s] not found".formatted(id));
        verify(customerDao, never()).deleteCustomerById(id);
    }

    @Test
    void updateCustomer() {
    }
}