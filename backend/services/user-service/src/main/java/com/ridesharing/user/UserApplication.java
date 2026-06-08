package com.ridesharing.user;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages = {"com.ridesharing.user", "com.ridesharing.commons"})
@EntityScan(basePackages = {"com.ridesharing.user.model"})
@EnableJpaRepositories(basePackages = {"com.ridesharing.user.repository"})
public class UserApplication {
    public static void main(String[] args) {
        SpringApplication.run(UserApplication.class, args);
    }
}
