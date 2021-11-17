package com.yethi.identity.apis.demo;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.yethi.identity.apis.demo.models.ResponseDTO;

import lombok.extern.slf4j.Slf4j;

@RestController
@CrossOrigin("*")
@RequestMapping("/auth0")
@Slf4j
public class DemoApi {
    
    @GetMapping(value = "/public")
    public ResponseEntity<ResponseDTO> publicEndpoint() {
        return ResponseEntity.ok(new ResponseDTO("Public Endpoint Working fine !", null, null));
    }

    @GetMapping(value = "/private")
    public ResponseEntity<ResponseDTO> privateEndpoint() {
    	Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    	Jwt jwtPrincipal = (Jwt) auth.getPrincipal();
    	return ResponseEntity.ok(new ResponseDTO("Private Endpoint Working fine!", null, jwtPrincipal.getClaims()));
    
    
    }
}