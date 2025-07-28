package com.example.NoSql_Demo.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;



@Document(collection ="users")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Users {
    @Id
    private String id;
    private String username;
    private String password;
}
