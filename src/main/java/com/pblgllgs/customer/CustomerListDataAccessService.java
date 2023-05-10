package com.pblgllgs.customer;

import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository("list")
public class CustomerListDataAccessService implements CustomerDao {

    private static List<Customer> customers;

    static {
        customers = new ArrayList<>();
        Customer alex = new Customer(1, "Alex", "alex@gmail.com", 22);
        customers.add(alex);
        Customer jamila = new Customer(2, "jamila", "jamila@gmail.com", 23);
        customers.add(jamila);
    }

    @Override
    public List<Customer> selectAllCustomers() {
        return customers;
    }

    @Override
    public Optional<Customer> getCustomerById(Integer customerId) {
        return customers.stream().filter(c -> c.getId().equals(customerId))
                .findFirst();
    }

    @Override
    public void insertCustomer(Customer customer) {
        customers.add(customer);
    }

    @Override
    public boolean existsPersonWithEmail(String email) {
        return customers.stream().anyMatch(c -> c.getEmail().equals(email));
    }

    @Override
    public void deleteCustomerById(Integer customerId) {
        customers.stream().filter(
                c -> c.getId().equals(customerId))
                .findFirst()
                .ifPresent(
                        o -> customers.remove(o)
                );
    }

    @Override
    public boolean existsPersonWithId(Integer customerId) {
        return customers.stream().anyMatch(c -> c.getId().equals(customerId));
    }

    @Override
    public void updateCustomer(Customer customer) {
        customers.add(customer);
    }
}
