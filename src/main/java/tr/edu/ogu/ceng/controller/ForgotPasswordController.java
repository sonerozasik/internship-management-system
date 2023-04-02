package tr.edu.ogu.ceng.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import tr.edu.ogu.ceng.dto.EmailReceiverDto;
import tr.edu.ogu.ceng.service.ForgotPasswordService;

@RestController
@RequestMapping("/forgot-password")
public class ForgotPasswordController {
	@Autowired
	ForgotPasswordService forgotPasswordService; 
	
	 @PostMapping()
	 public ResponseEntity<String> sendPasswordResetEmail(@RequestBody EmailReceiverDto email) throws Exception{
			 forgotPasswordService.sendResetPasswordEmail(email);
			 return ResponseEntity.ok("Reset password e-mail sent successfully!");
	 } 
}