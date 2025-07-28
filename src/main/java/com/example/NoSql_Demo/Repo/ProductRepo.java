package com.example.NoSql_Demo.Repo;

import com.example.NoSql_Demo.Model.Products;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepo extends MongoRepository<Products,String> {
}
