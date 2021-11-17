package com.yethi.identity.apis.demo.models;

import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResponseDTO {

	private String message;
	
	private String claimsJson;
	
	private Map<String, Object> claims;

}
