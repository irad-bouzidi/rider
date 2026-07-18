package com.ridesharing.auth;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages = {"com.ridesharing.auth", "com.ridesharing.commons"})
@EntityScan(basePackages = {"com.ridesharing.auth.model"})
@EnableJpaRepositories(basePackages = {"com.ridesharing.auth.repository"})
public class AuthApplication {
    public static void main(String[] args) {
        SpringApplication.run(AuthApplication.class, args);
    }
}
