package com.example.NoSql_Demo.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection ="products")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Products {
    @Id
    private String id;
    private String productName;
    private Double price;
    private byte[] productImage;
}
