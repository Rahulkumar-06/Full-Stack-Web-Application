package com.example.NoSql_Demo.Service;

import com.example.NoSql_Demo.Model.Products;
import com.example.NoSql_Demo.Model.Users;
import com.example.NoSql_Demo.Repo.ProductRepo;
import com.example.NoSql_Demo.Repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class ProductService {
    private ProductRepo repo;
    private UserRepo userrepo;
    @Autowired
    public void setUserRepo(UserRepo userrepo) {
        this.userrepo = userrepo;
    }

    @Autowired
    public void setRepo(ProductRepo repo) {
        this.repo = repo;
    }

    public void Add(Products product, MultipartFile file){

        try {
        Products products = new Products();
        products.setId(product.getId());
        products.setProductName(product.getProductName());
        products.setPrice(product.getPrice());
        products.setProductImage(file.getBytes());
        repo.save(products);}catch (IOException e){
            throw new RuntimeException("Failed to store image ",e);
        }
    }
    public List<Products> GetAll() {
        return repo.findAll();
    }
    public Products update(String id, Products datedprod, MultipartFile file) throws IOException {
        Products prod = repo.findById(id).orElse(new Products());
        prod.setProductName(datedprod.getProductName());
        prod.setPrice(datedprod.getPrice());
        prod.setProductImage(file.getBytes());
        return repo.save(prod);
    }
    public void delete(String id) {
        repo.deleteById(id);
    }

    public Products GetProdById(String id) {
        return repo.findById(id).orElse(new Products());
    }

    BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder(12);
    public void Register(Users user) {

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        System.out.println("password is Recorded");
        userrepo.save(user);
    }

    public byte[] GetImage(String id) {
        Products product = repo.findById(id).orElse(new Products());
        return product.getProductImage();

    }
}
