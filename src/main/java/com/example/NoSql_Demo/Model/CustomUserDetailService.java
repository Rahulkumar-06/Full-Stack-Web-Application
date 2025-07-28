package com.example.NoSql_Demo.Model;

import com.example.NoSql_Demo.Repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailService implements UserDetailsService {
    private UserRepo repo;
    @Autowired
    public void setRepo(UserRepo repo) {
        this.repo = repo;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Users user = repo.findByUsername(username)
                .orElseThrow(()->new UsernameNotFoundException("User Name Was not found"));

        return new UserDetail(user);
    }
}
