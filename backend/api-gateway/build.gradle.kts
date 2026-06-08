plugins {
    id("org.springframework.boot")
}

dependencies {
    implementation(project(":commons"))
    implementation("org.springframework.cloud:spring-cloud-starter-gateway:4.2.0")
    implementation("org.springframework.boot:spring-boot-starter-data-redis-reactive")
    implementation("org.springframework.boot:spring-boot-starter-actuator")
    compileOnly("org.projectlombok:lombok")
    annotationProcessor("org.projectlombok:lombok")
    testImplementation("org.springframework.boot:spring-boot-starter-test")
}
