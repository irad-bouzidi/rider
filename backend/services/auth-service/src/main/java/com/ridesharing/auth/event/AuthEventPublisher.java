package com.ridesharing.auth.event;

import com.ridesharing.commons.event.BaseEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Slf4j
@Component
@RequiredArgsConstructor
public class AuthEventPublisher {

    private final RabbitTemplate rabbitTemplate;

    @Value("${rabbitmq.exchange.auth:auth.exchange}")
    private String authExchange;

    public void publishUserRegistered(UUID userId, String email, String role) {
        var event = BaseEvent.builder()
                .eventType("UserRegistered")
                .build();
        rabbitTemplate.convertAndSend(authExchange, "user.registered", event);
        log.info("Published UserRegistered event for userId={}", userId);
    }

    public void publishUserLoggedIn(UUID userId) {
        var event = BaseEvent.builder()
                .eventType("UserLoggedIn")
                .build();
        rabbitTemplate.convertAndSend(authExchange, "user.logged_in", event);
    }
}
