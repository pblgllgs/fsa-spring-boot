package com.pblgllgs.customer;

import com.pblgllgs.AbstractTestcontainers;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;


class CustomerJDBCDataAccessServiceTest extends AbstractTestcontainers {

    private CustomerJDBCDataAccessService underTest;
    private final CustomerRowMapper customerRowMapper = new CustomerRowMapper();

    @BeforeEach
    void setUp() {
        underTest = new CustomerJDBCDataAccessService(
                getJdbcTemplate(),
                customerRowMapper
        );
    }

    @Test
    void selectAllCustomers() {
        Customer customer = new Customer(
            FAKER.name().fullName(),
                FAKER.internet().safeEmailAddress() +"_"+ UUID.randomUUID(),
                "password", 20,
                Gender.MALE);

        underTest.insertCustomer(customer);

        List<Customer> actual = underTest.selectAllCustomers();

        assertThat(actual).isNotEmpty();
    }

    @Test
    void getCustomerById() {

        String email = FAKER.internet().safeEmailAddress() +"_"+ UUID.randomUUID();
        Customer customer = new Customer(
                FAKER.name().fullName(),
                email,
                "password", 20,
                Gender.MALE);

        underTest.insertCustomer(customer);

        int id = underTest.selectAllCustomers()
                        .stream().filter(c -> c.getEmail().equals(email))
                        .map(Customer::getId)
                                .findFirst()
                                        .orElseThrow();

        Optional<Customer> actual = underTest.getCustomerById(id);

        assertThat(actual).isPresent().hasValueSatisfying( c -> {
            assertThat(c.getId()).isEqualTo(id);
            assertThat(c.getName()).isEqualTo(customer.getName());
            assertThat(c.getEmail()).isEqualTo(customer.getEmail());
            assertThat(c.getAge()).isEqualTo(customer.getAge());
        });
    }

    @Test
    void willReturnEmptyWhenSelectCustomerById(){
        int id = 0;

        Optional<Customer> actual = underTest.getCustomerById(id);

        assertThat(actual).isEmpty();
    }

    @Test
    void insertCustomer() {
        String email = FAKER.internet().safeEmailAddress() +"_"+ UUID.randomUUID();
        Customer customer = new Customer(
                FAKER.name().fullName(),
                email,
                "password", 20,
                Gender.MALE);

        underTest.insertCustomer(customer);

        int id = underTest.selectAllCustomers()
                .stream().filter(c -> c.getEmail().equals(email))
                .map(Customer::getId)
                .findFirst()
                .orElseThrow();

        Optional<Customer> actual = underTest.getCustomerById(id);

        assertThat(actual).isNotNull();
    }

    @Test
    void existsCustomerWithEmail() {
        String email = FAKER.internet().safeEmailAddress() +"_"+ UUID.randomUUID();
        String name = FAKER.name().fullName();
        Customer customer = new Customer(
                name,
                email,
                "password", 20,
                Gender.MALE);

        underTest.insertCustomer(customer);

        boolean actual = underTest.existsPersonWithEmail(email);

        assertThat(actual).isTrue();
    }

    @Test
    void existCustomerWithEmailReturnFalseWhenDoesNotExists(){
        String email = FAKER.internet().safeEmailAddress() +"_"+ UUID.randomUUID();

        boolean actual = underTest.existsPersonWithEmail(email);

        assertThat(actual).isFalse();
    }

    @Test
    void deleteCustomerById() {

        String email = FAKER.internet().safeEmailAddress() +"_"+ UUID.randomUUID();
        String name = FAKER.name().fullName();
        Customer customer = new Customer(
                name,
                email,
                "password", 20,
                Gender.MALE);

        underTest.insertCustomer(customer);

        int id = underTest.selectAllCustomers()
                .stream().filter(c -> c.getEmail().equals(email))
                .map(Customer::getId)
                .findFirst()
                .orElseThrow();

        underTest.deleteCustomerById(id);

        Optional<Customer> actual = underTest.getCustomerById(id);

        assertThat(actual).isNotPresent();
    }

    @Test
    void existsCustomerWithId() {
        String email = FAKER.internet().safeEmailAddress() +"_"+ UUID.randomUUID();
        String name = FAKER.name().fullName();
        Customer customer = new Customer(
                name,
                email,
                "password", 20,
                Gender.MALE);

        underTest.insertCustomer(customer);

        int id = underTest.selectAllCustomers()
                .stream().filter(c -> c.getEmail().equals(email))
                .map(Customer::getId)
                .findFirst()
                .orElseThrow();

        boolean actual = underTest.existsPersonWithId(id);

        assertThat(actual).isTrue();
    }

    @Test
    void existCustomerWithIdReturnFalseWhenIdNotPresent(){
        int id = -1;

        boolean actual = underTest.existsPersonWithId(id);

        assertThat(actual).isFalse();
    }

    @Test
    void updateCustomerName() {
        String email = FAKER.internet().safeEmailAddress() +"_"+ UUID.randomUUID();
        String name = FAKER.name().fullName();
        Customer customer = new Customer(
                name,
                email,
                "password", 20,
                Gender.MALE);

        underTest.insertCustomer(customer);

        int id = underTest.selectAllCustomers()
                .stream().filter(c -> c.getEmail().equals(email))
                .map(Customer::getId)
                .findFirst()
                .orElseThrow();

        var newName = "foo";

        Customer updatedCustomer = new Customer();
        updatedCustomer.setId(id);
        updatedCustomer.setName(newName);

        underTest.updateCustomer(updatedCustomer);

        Optional<Customer> actual = underTest.getCustomerById(id);

        assertThat(actual).isPresent().hasValueSatisfying( c -> {
            assertThat(c.getId()).isEqualTo(id);
            assertThat(c.getName()).isEqualTo(newName);
            assertThat(c.getEmail()).isEqualTo(customer.getEmail());
            assertThat(c.getAge()).isEqualTo(customer.getAge());
        });
    }

    @Test
    void updateCustomerEmail() {
        String email = FAKER.internet().safeEmailAddress() +"_"+ UUID.randomUUID();
        String name = FAKER.name().fullName();
        Customer customer = new Customer(
                name,
                email,
                "password", 20,
                Gender.MALE);

        underTest.insertCustomer(customer);

        int id = underTest.selectAllCustomers()
                .stream().filter(c -> c.getEmail().equals(email))
                .map(Customer::getId)
                .findFirst()
                .orElseThrow();

        var newEmail = "newEmail@gmail.com";

        Customer updatedCustomer = new Customer();
        updatedCustomer.setId(id);
        updatedCustomer.setEmail(newEmail);

        underTest.updateCustomer(updatedCustomer);

        Optional<Customer> actual = underTest.getCustomerById(id);

        assertThat(actual).isPresent().hasValueSatisfying( c -> {
            assertThat(c.getId()).isEqualTo(id);
            assertThat(c.getName()).isEqualTo(customer.getName());
            assertThat(c.getEmail()).isEqualTo(newEmail);
            assertThat(c.getAge()).isEqualTo(customer.getAge());
        });
    }

    @Test
    void updateCustomerAge() {
        String email = FAKER.internet().safeEmailAddress() +"_"+ UUID.randomUUID();
        String name = FAKER.name().fullName();
        Customer customer = new Customer(
                name,
                email,
                "password", 20,
                Gender.MALE);

        underTest.insertCustomer(customer);

        int id = underTest.selectAllCustomers()
                .stream().filter(c -> c.getEmail().equals(email))
                .map(Customer::getId)
                .findFirst()
                .orElseThrow();

        var newAge = 25;

        Customer updatedCustomer = new Customer();
        updatedCustomer.setId(id);
        updatedCustomer.setAge(newAge);

        underTest.updateCustomer(updatedCustomer);

        Optional<Customer> actual = underTest.getCustomerById(id);

        assertThat(actual).isPresent().hasValueSatisfying( c -> {
            assertThat(c.getId()).isEqualTo((id));
            assertThat(c.getName()).isEqualTo(customer.getName());
            assertThat(c.getEmail()).isEqualTo(customer.getEmail());
            assertThat(c.getAge()).isEqualTo(newAge);
        });
    }

    @Test
    void willUpdateAllPropertiesCustomer() {
        String email = FAKER.internet().safeEmailAddress() +"_"+ UUID.randomUUID();
        String name = FAKER.name().fullName();
        Customer customer = new Customer(
                name,
                email,
                "password", 20,
                Gender.MALE);

        underTest.insertCustomer(customer);

        int id = underTest.selectAllCustomers()
                .stream().filter(c -> c.getEmail().equals(email))
                .map(Customer::getId)
                .findFirst()
                .orElseThrow();

        var newAge = 25;
        var newEmail = "admin@gmail.com";
        var newName = "john";

        Customer updatedCustomer = new Customer();
        updatedCustomer.setId(id);
        updatedCustomer.setName(newName);
        updatedCustomer.setEmail(newEmail);
        updatedCustomer.setAge(newAge);

        underTest.updateCustomer(updatedCustomer);

        Optional<Customer> actual = underTest.getCustomerById(id);

        assertThat(actual).isPresent().hasValueSatisfying(updated -> {
            assertThat(updated.getId()).isEqualTo((id));
            assertThat(updated.getName()).isEqualTo("john");
            assertThat(updated.getEmail()).isEqualTo(newEmail);
            assertThat(updated.getAge()).isEqualTo(25);
            assertThat(updated.getGender()).isEqualTo(Gender.MALE);
        });
    }

    @Test
    void willNotUpdateWhenNothingToUpdate() {
        String email = FAKER.internet().safeEmailAddress() +"_"+ UUID.randomUUID();
        String name = FAKER.name().fullName();
        Customer customer = new Customer(
                name,
                email,
                "password", 20,
                Gender.MALE);

        underTest.insertCustomer(customer);

        int id = underTest.selectAllCustomers()
                .stream().filter(c -> c.getEmail().equals(email))
                .map(Customer::getId)
                .findFirst()
                .orElseThrow();

        Customer updatedCustomer = new Customer();
        updatedCustomer.setId(id);

        underTest.updateCustomer(updatedCustomer);

        Optional<Customer> actual = underTest.getCustomerById(id);

        assertThat(actual).isPresent().hasValueSatisfying( c -> {
            assertThat(c.getId()).isEqualTo((id));
            assertThat(c.getName()).isEqualTo(customer.getName());
            assertThat(c.getEmail()).isEqualTo(customer.getEmail());
            assertThat(c.getAge()).isEqualTo(customer.getAge());
        });
    }
}