# System Architecture

## 1. High-Level Architecture Overview

```mermaid
graph TB
    subgraph "Client Layer"
        MP[Passenger Mobile App<br/>React Native]
        MD[Driver Mobile App<br/>React Native]
        AW[Admin Web Dashboard<br/>React.js]
    end

    subgraph "CDN & Edge"
        CDN[CloudFront CDN]
    end

    subgraph "API Gateway Layer"
        AG[API Gateway<br/>Spring Cloud Gateway / Kong]
        RT[Rate Limiter]
        LB[Load Balancer<br/>AWS ALB]
    end

    subgraph "Application Layer"
        AS[Auth Service]
        US[User Service]
        DS[Driver Service]
        VS[Vehicle Service]
        RS[Ride Service]
        MS[Matching Service]
        PS[Pricing Service]
        PM[Payment Service]
        NS[Notification Service]
        AN[Analytics Service]
        WS[WebSocket Service]
    end

    subgraph "Message Layer"
        MQ[Message Queue<br/>RabbitMQ / Kafka]
        EVT[Event Bus]
    end

    subgraph "Data Layer"
        PG[(PostgreSQL<br/>Primary)]
        PG_R[(PostgreSQL<br/>Read Replicas)]
        RD[(Redis<br/>Cache & Sessions)]
        ES[(Elasticsearch<br/>Search & Logs)]
        S3[(S3<br/>Documents & Images)]
    end

    subgraph "External Services"
        STRIPE[Stripe Payments]
        TWILIO[Twilio SMS/Voice]
        FCM[Firebase Cloud Messaging]
        MAPS[Maps API<br/>Google/Mapbox]
        GOOGLE[Google/Apple Auth]
    end

    MP --> CDN
    MD --> CDN
    AW --> CDN
    CDN --> LB
    LB --> AG
    AG --> RT
    AG --> AS
    AG --> US
    AG --> DS
    AG --> RS
    AG --> PM
    AG --> NS

    RS --> MS
    RS --> PS
    RS --> MQ
    RS --> WS

    MS --> RD
    PS --> RD

    AS --> PG
    US --> PG
    DS --> PG
    VS --> PG
    RS --> PG
    PM --> PG
    AN --> PG

    US --> RD
    RS --> RD
    WS --> RD

    AN --> ES

    DS --> S3
    VS --> S3

    PM --> STRIPE
    NS --> TWILIO
    NS --> FCM

    AS --> GOOGLE
    RS --> MAPS
    PS --> MAPS
    WS --> MAPS
    US --> MAPS

    MQ --> NS
    MQ --> AN
    MQ --> EVT
```

## 2. Microservices Architecture

```mermaid
graph LR
    subgraph "Service Mesh"
        AS[Auth Service<br/>8081]
        US[User Service<br/>8082]
        DS[Driver Service<br/>8083]
        VS[Vehicle Service<br/>8084]
        RS[Ride Service<br/>8085]
        MS[Matching Service<br/>8086]
        PS[Pricing Service<br/>8087]
        PM[Payment Service<br/>8088]
        NS[Notification Service<br/>8089]
        AN[Analytics Service<br/>8090]
    end

    AS -.->|gRPC/REST| US
    RS -.->|gRPC| MS
    RS -.->|gRPC| PS
    RS -.->|Events| PM
    US -.->|Events| NS
    RS -.->|Events| NS
    PM -.->|Events| NS
```

### Service Communication Patterns

| Pattern | Implementation |
|---|---|
| **Synchronous** | REST/gRPC for request-response (API Gateway → Services) |
| **Asynchronous** | Events via RabbitMQ/Kafka for cross-service communication |
| **Real-time** | WebSocket (STOMP over SockJS) for live location updates |
| **Service Discovery** | Kubernetes Services + Eureka/Consul |

## 3. Component Architecture

### 3.1 Backend Component Diagram

```mermaid
graph TB
    subgraph "Spring Boot Service Template"
        CTRL[REST Controller]
        SVC[Service Layer]
        REPO[Repository]
        DTO[DTO / Request/Response]
        ENT[Entity / Domain Model]
        EVT[Event Publisher/Listener]
        CLNT[External Service Client]
    end

    CTRL --> SVC
    SVC --> REPO
    SVC --> EVT
    SVC --> CLNT
    REPO --> ENT
```

### 3.2 Mobile App Component Diagram

```mermaid
graph TB
    subgraph "React Native App"
        UI[UI Layer<br/>Screens + Components]
        NAV[Navigation Layer<br/>React Navigation]
        STM[State Management<br/>Zustand Stores]
        QRY[Data Fetching<br/>TanStack Query]
        SVC[Service Layer<br/>Axios + WebSocket]
        LOC[Location Service]
        NOTIF[Notification Handler]
    end

    UI --> NAV
    UI --> STM
    UI --> QRY
    QRY --> SVC
    SVC --> API[Backend APIs]
    SVC --> WS[WebSocket Server]
    LOC --> SVC
    NOTIF --> FCM
```

## 4. Deployment Architecture

```mermaid
graph TB
    subgraph "AWS Cloud"
        subgraph "VPC"
            subgraph "Public Subnet"
                ALB[Application Load Balancer]
            end

            subgraph "Private Subnet - App Tier"
                K8S[EKS Cluster]
                subgraph "Kubernetes Pods"
                    SVC1[Auth Service]
                    SVC2[User Service]
                    SVC3[Driver Service]
                    SVC4[Ride Service]
                    SVC5[Matching Service]
                    SVC6[Payment Service]
                    SVC7[Notification Service]
                end
            end

            subgraph "Private Subnet - Data Tier"
                RDS[(RDS PostgreSQL<br/>Multi-AZ)]
                RDS_R[(RDS Read Replica)]
                ELASTICACHE[(ElastiCache Redis)]
                OPENSEARCH[(OpenSearch)]
            end

            subgraph "Private Subnet - Message Layer"
                MQ[Amazon MQ / MSK<br/>RabbitMQ / Kafka]
            end
        end

        CDN[CloudFront] --> ALB
        ALB --> K8S
        S3_BUCKET[(S3<br/>Documents)]
    end

    Route53[DNS Route53] --> CDN
```

## 5. Infrastructure Architecture (Terraform)

```mermaid
graph TB
    subgraph "Terraform Modules"
        VPC[VPC Module]
        EKS[EKS Module]
        RDS[RDS Module]
        ELASTICACHE[ElastiCache Module]
        S3[S3 Module]
        MQ[Message Queue Module]
        CIAM[IAM Module]
        MON[Monitoring Module]
    end

    subgraph "Environments"
        DEV[Development]
        STG[Staging]
        PRD[Production]
    end

    VPC --> DEV
    VPC --> STG
    VPC --> PRD
    EKS --> DEV
    EKS --> STG
    EKS --> PRD
    RDS --> DEV
    RDS --> STG
    RDS --> PRD
```

### Infrastructure Specifications

| Component | Specification |
|---|---|
| **Kubernetes** | EKS v1.28+, 3-10 nodes per AZ, c5.xlarge (dev), c5.2xlarge (prod) |
| **PostgreSQL** | RDS Multi-AZ, db.r6g.xlarge (prod), 500GB GP3, auto-scaling storage |
| **Redis** | ElastiCache for Redis, r6g.large (prod), cluster mode enabled |
| **Message Queue** | Amazon MSK (Kafka) or Amazon MQ (RabbitMQ) |
| **Object Storage** | S3 with lifecycle policies, 30-day to Glacier |
| **CDN** | CloudFront with WAF, regional edge caches |
| **Monitoring** | Prometheus operator on EKS, Grafana, CloudWatch |

## 6. Data Flow Architecture

### Ride Request Flow

```mermaid
sequenceDiagram
    participant P as Passenger App
    participant GW as API Gateway
    participant RS as Ride Service
    participant PS as Pricing Service
    participant MS as Matching Service
    participant WS as WebSocket
    participant D as Driver App
    participant NS as Notification Service

    P->>GW: POST /api/rides/estimate
    GW->>PS: Calculate fare
    PS-->>GW: Fare estimate
    GW-->>P: Price breakdown

    P->>GW: POST /api/rides/request
    GW->>RS: Create ride request
    RS->>PS: Lock price
    RS->>MS: Find nearby drivers
    RS-->>GW: Ride request created
    GW-->>P: Searching for driver

    MS->>MS: Geospatial query<br/>Rank drivers
    MS->>D: Ride offer (via WS)
    D->>MS: Accept ride
    MS->>RS: Driver assigned
    RS->>WS: Broadcast driver info
    WS-->>P: Driver found + live location
    RS->>NS: Send notifications
    NS-->>P: Push: "Driver assigned"
    NS-->>D: Push: "New ride request"
```

## 7. Technology Stack Summary

| Layer | Technology |
|---|---|
| **Mobile Framework** | React Native 0.73+, TypeScript |
| **Mobile Navigation** | React Navigation 6 |
| **Mobile State** | Zustand + TanStack Query v5 |
| **Mobile Forms** | React Hook Form + Zod |
| **Mobile Localization** | i18next |
| **Backend Runtime** | Java 21, Spring Boot 3.2+ |
| **Backend Security** | Spring Security, JWT, OAuth2 |
| **Database** | PostgreSQL 16 |
| **Cache** | Redis 7 |
| **Message Queue** | Apache Kafka / RabbitMQ |
| **Search** | Elasticsearch / OpenSearch |
| **API Documentation** | Swagger / OpenAPI 3.0 |
| **Container** | Docker, Docker Compose |
| **Orchestration** | Kubernetes, Helm |
| **Cloud** | AWS (EKS, RDS, ElastiCache, MSK) |
| **CI/CD** | GitHub Actions / GitLab CI |
| **IaC** | Terraform / Pulumi |
| **Monitoring** | Prometheus, Grafana, ELK |
| **APM** | OpenTelemetry + Jaeger |
| **Maps** | Google Maps SDK / Mapbox |
| **Payments** | Stripe Connect |
| **Notifications** | Firebase Cloud Messaging, Twilio |
| **CDN** | AWS CloudFront |
