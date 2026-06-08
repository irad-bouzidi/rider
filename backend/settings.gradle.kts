rootProject.name = "ride-hailing"

include(
    "commons",
    "api-gateway",
    "services:auth-service",
    "services:user-service",
    "services:driver-service",
    "services:vehicle-service",
    "services:ride-service",
    "services:matching-service",
    "services:pricing-service",
    "services:payment-service",
    "services:notification-service",
    "services:analytics-service"
)
