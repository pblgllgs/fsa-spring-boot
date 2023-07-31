package com.pblgllgs.auth;

import com.pblgllgs.customer.CustomerDTO;

public record AuthenticationResponse(String token, CustomerDTO customerDTO){
}
