package com.example.NoSql_Demo.Controller;
import com.example.NoSql_Demo.Model.Products;
import com.example.NoSql_Demo.Model.Users;
import com.example.NoSql_Demo.Service.ProductService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class ProductController {
    @Autowired
    AuthenticationManager authenticationManager;


    private ProductService service;
    @Autowired
    public void setService(ProductService service) {
        this.service = service;
    }
    @PostMapping("/add")
    public ResponseEntity<String> add(
            @RequestPart("product") String productJson,
            @RequestPart("file") MultipartFile file
    ) {
        try {
            // Convert JSON string to Products object
            ObjectMapper mapper = new ObjectMapper();
            Products product = mapper.readValue(productJson, Products.class);

            // Pass it to service
            service.Add(product, file);

            return ResponseEntity.ok("Product is Added Successfully");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid JSON or File");
        }
    }
    @GetMapping("/getall")
    public ResponseEntity<List<Products>> GetAll(){
        List<Products> prod = service.GetAll();
        return ResponseEntity.ok(prod);
    }
    @GetMapping("/prod/{id}")
    public ResponseEntity<Products> GetprodById(@PathVariable String id){
        Products prod = service.GetProdById(id);
        return ResponseEntity.ok(prod);
    }
    @PutMapping("/Update/{id}")
    public ResponseEntity<Products> update(@PathVariable String id,@RequestPart("product") String updatedprod, @RequestPart("file") MultipartFile file) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        Products products = mapper.readValue(updatedprod,Products.class);
        Products pro = service.update(id,products,file);
        return ResponseEntity.ok().body(pro);
    }
    @DeleteMapping("/del/{id}")
    public ResponseEntity<?> delete(@PathVariable String id){
        service.delete(id);
        return ResponseEntity.ok("Product is Deleted Successfully");
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Users user, HttpServletRequest request) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword())
            );
            // Set the authentication in SecurityContext
            SecurityContextHolder.getContext().setAuthentication(authentication);
            // Create session and attach the authentication to it
            HttpSession session = request.getSession(true);
            session.setAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY,
                    SecurityContextHolder.getContext());
            return ResponseEntity.ok("Login Successful");
        } catch (Exception e) {
            return new ResponseEntity<>("Invalid credentials", HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Users user){
        service.Register(user);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
    @GetMapping("/image/{id}")
    public ResponseEntity<byte[]> findImages(@PathVariable String id)
    {
        byte [] image = service.GetImage(id);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_JPEG);
        return new ResponseEntity<>(image, headers, HttpStatus.OK);
    }
}
