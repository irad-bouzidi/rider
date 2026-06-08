package com.ridesharing.ride;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages = {"com.ridesharing.ride", "com.ridesharing.commons"})
@EntityScan(basePackages = {"com.ridesharing.ride.model"})
@EnableJpaRepositories(basePackages = {"com.ridesharing.ride.repository"})
public class RideApplication {
    public static void main(String[] args) {
        SpringApplication.run(RideApplication.class, args);
    }
}
