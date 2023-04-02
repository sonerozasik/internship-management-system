package tr.edu.ogu.ceng.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import tr.edu.ogu.ceng.model.Internship;
import tr.edu.ogu.ceng.service.InternshipService;


@RestController
@RequestMapping("/api/internship")
public class InternshipController {
	@Autowired
	InternshipService internshipService;
	
	@PutMapping
	public ResponseEntity<Internship> updateInternship(@RequestBody Internship internship) {
		
		Internship updatedInternship = internshipService.updateInternship(internship);
		return ResponseEntity.ok(updatedInternship);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Optional<Internship>> getInternship(@PathVariable(name="id") long id){
		return ResponseEntity.ok(internshipService.getInternship(id));
	}
	

}