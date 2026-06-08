package com.ridesharing.payment;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages = {"com.ridesharing.payment", "com.ridesharing.commons"})
@EntityScan(basePackages = {"com.ridesharing.payment.model"})
@EnableJpaRepositories(basePackages = {"com.ridesharing.payment.repository"})
public class PaymentApplication {
    public static void main(String[] args) {
        SpringApplication.run(PaymentApplication.class, args);
    }
}
