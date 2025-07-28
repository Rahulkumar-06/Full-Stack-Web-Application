package com.example.NoSql_Demo.Repo;
import com.example.NoSql_Demo.Model.Users;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends MongoRepository<Users,String>{
   Optional<Users> findByUsername(String username);
}
