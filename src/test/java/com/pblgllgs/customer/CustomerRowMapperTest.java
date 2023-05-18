package com.pblgllgs.customer;

import org.junit.jupiter.api.Test;

import java.sql.ResultSet;
import java.sql.SQLException;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;


class CustomerRowMapperTest {


    @Test
    void mapRow() throws SQLException {
        CustomerRowMapper customerRowMapper = new CustomerRowMapper();

        ResultSet resultSet = mock(ResultSet.class);
        when(resultSet.getInt("id")).thenReturn(1);
        when(resultSet.getInt("age")).thenReturn(19);
        when(resultSet.getString("name")).thenReturn("Jamila");
        when(resultSet.getString("email")).thenReturn("jamila@gmail.com");
        when(resultSet.getString("gender")).thenReturn("MALE");

        Customer actual = customerRowMapper.mapRow(resultSet, 1);

        Customer expected = new Customer(
                1, "Jamila", "jamila@gmail.com", 19,
                Gender.MALE);
        assertThat(actual).isEqualTo(expected);

    }
}