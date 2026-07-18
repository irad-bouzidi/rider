# Functional & Non-Functional Requirements

## 1. Functional Requirements

### 1.1 Passenger Mobile Application

| ID | Feature | Description | Priority |
|---|---|---|---|
| P-01 | User Registration | Register via email, phone number, Google, or Apple ID | P0 |
| P-02 | Phone Verification | SMS OTP verification during registration | P0 |
| P-03 | Profile Management | Edit name, email, phone, photo, language preferences | P0 |
| P-04 | Add Payment Methods | Add credit/debit cards (Stripe), wallet top-up, cash option | P0 |
| P-05 | Location Services | GPS-based current location, drag-and-drop pin on map | P0 |
| P-06 | Set Pickup/Destination | Auto-complete address search, recent locations, favorites | P0 |
| P-07 | Fare Estimation | Real-time fare quote before booking with price breakdown | P0 |
| P-08 | Ride Types Selection | Choose ride category (Economy, Comfort, Premium, XL) | P0 |
| P-09 | Book Ride | Confirm booking, see driver acceptance, ride details | P0 |
| P-10 | Schedule Ride | Book rides for future time slots (up to 7 days ahead) | P1 |
| P-11 | Live Driver Tracking | Real-time driver location on map with route to pickup | P0 |
| P-12 | Ride Status Updates | Step-by-step ride status notifications | P0 |
| P-13 | Ride History | View past rides with details, receipts, and routes | P0 |
| P-14 | Rate Driver | 1-5 star rating + optional comment after each ride | P0 |
| P-15 | In-App Support Chat | Real-time messaging with support team during active ride | P1 |
| P-16 | Push Notifications | Ride updates, promotions, account alerts | P0 |
| P-17 | Promo Codes | Apply discount codes, view available promotions | P1 |
| P-18 | Favorite Locations | Save Home, Work, and custom locations for quick access | P1 |
| P-19 | SOS Emergency Button | Share location + ride details with emergency contacts | P1 |
| P-20 | Share Trip Status | Share real-time trip link with friends/family | P2 |
| P-21 | Split Fare | Split ride cost with other passengers | P2 |
| P-22 | Trip Receipts | Downloadable PDF/email receipts after each trip | P1 |
| P-23 | Wallet Balance | View wallet balance, top-up, transaction history | P1 |

### 1.2 Driver Mobile Application

| ID | Feature | Description | Priority |
|---|---|---|---|
| D-01 | Driver Registration | Register with personal details, phone verification | P0 |
| D-02 | Identity Verification | Upload driver's license, ID card, selfie verification | P0 |
| D-03 | Vehicle Registration | Add vehicle(s): make, model, year, color, license plate | P0 |
| D-04 | Document Management | Upload insurance, registration, background check | P0 |
| D-05 | Document Verification Status | Real-time status of submitted documents (pending/approved/rejected) | P0 |
| D-06 | Online/Offline Toggle | Set availability to receive ride requests | P0 |
| D-07 | Ride Request Alerts | Sound + notification + screen wake for incoming rides | P0 |
| D-08 | Ride Preview | Show passenger pickup location, destination, distance, fare estimate | P0 |
| D-09 | Accept/Reject Rides | Accept to start trip, reject to skip (limited rejections) | P0 |
| D-10 | Navigation Integration | Open turn-by-turn navigation (Google Maps, Waze, Apple Maps) | P0 |
| D-11 | Ride Flow Management | Navigate → Arrived → Start Ride → Complete Ride | P0 |
| D-12 | Earnings Dashboard | Daily/weekly/monthly earnings with charts | P0 |
| D-13 | Driver Wallet | Balance overview, transaction history, withdrawal requests | P0 |
| D-14 | Ride History | Past rides with earnings breakdown | P1 |
| D-15 | Passenger Ratings | View passenger ratings and feedback | P1 |
| D-16 | Driver Support | In-app chat with support team | P1 |
| D-17 | Shift Management | Set work hours, breaks, auto-logout for inactivity | P2 |
| D-18 | Heat Map | View high-demand areas on map | P2 |
| D-19 | Bonus Tracking | Track promotion bonuses, referral rewards | P2 |
| D-20 | Destination Filter | Only accept rides going toward preferred direction | P2 |

### 1.3 Admin Dashboard

| ID | Feature | Description | Priority |
|---|---|---|---|
| A-01 | Analytics Dashboard | KPIs: active users, rides completed, revenue, driver acceptance rate | P0 |
| A-02 | User Management | List, search, filter, suspend, ban passenger accounts | P0 |
| A-03 | Driver Management | View drivers, verify documents, approve/reject, suspend | P0 |
| A-04 | Vehicle Management | View registered vehicles, verify documents | P0 |
| A-05 | Ride Management | View all rides, status, cancel rides, process refunds | P0 |
| A-06 | Payment Management | View transactions, process refunds, manage payouts | P0 |
| A-07 | Promotions | Create, edit, activate/deactivate promo codes | P1 |
| A-08 | Pricing Configuration | Set base fare, per-km, per-minute rates, surge thresholds | P1 |
| A-09 | Reports | Generate CSV reports (revenue, rides, users, drivers) | P1 |
| A-10 | Support Tickets | View, assign, respond to support tickets | P1 |
| A-11 | Fraud Monitoring | Flag suspicious activity, review flagged transactions | P1 |
| A-12 | Audit Logs | View system-wide audit trail | P2 |
| A-13 | Commission Settings | Configure platform commission per ride type | P1 |
| A-14 | Notification Broadcast | Send push notifications to all or filtered users | P2 |

### 1.4 Backend Services

| ID | Feature | Description | Priority |
|---|---|---|---|
| B-01 | Authentication | JWT token issuance, refresh, revocation | P0 |
| B-02 | User Management | CRUD operations for all user roles | P0 |
| B-03 | Ride Orchestration | End-to-end ride lifecycle management | P0 |
| B-04 | Driver Matching | Find nearest available drivers for ride requests | P0 |
| B-05 | Pricing & Fare Calculation | Dynamic pricing with surge algorithm | P0 |
| B-06 | Payment Processing | Card payments, wallet, refunds, payouts | P0 |
| B-07 | Notification Dispatch | Push, SMS, email delivery to users | P0 |
| B-08 | Real-Time Location | WebSocket-based location streaming and broadcasting | P0 |
| B-09 | File Upload | Secure document upload for driver verification | P0 |
| B-10 | Geocoding | Address-to-coordinates and reverse geocoding | P0 |
| B-11 | Route Calculation | Distance, duration, polyline between points | P0 |
| B-12 | Analytics Pipeline | Event ingestion and aggregation for reporting | P1 |

---

## 2. Non-Functional Requirements

### 2.1 Security

| Requirement | Specification |
|---|---|
| Authentication | JWT-based with 15-min access token + 7-day refresh token |
| Password Policy | Min 8 chars, complex (upper, lower, digit, special) |
| API Security | HTTPS enforced, API Gateway rate limiting |
| Data Encryption | AES-256 at rest, TLS 1.3 in transit |
| RBAC | Role-based access control for all API endpoints |
| Input Validation | All inputs validated server-side with sanitization |
| SQL Injection | Prepared statements / ORM parameterized queries |
| XSS Protection | Output encoding, CSP headers |
| CSRF | CSRF tokens for state-changing requests |
| Rate Limiting | 100 req/min per user, 1000 req/min per IP |
| OWASP | Follow OWASP Top 10 mitigation practices |
| Fraud Detection | Real-time anomaly detection for ride/payment fraud |

### 2.2 Performance

| Requirement | Target |
|---|---|
| API Response Time (P95) | < 200ms for read endpoints, < 500ms for write |
| Ride Matching Time | < 3 seconds from request to driver found |
| Location Update Latency | < 1 second from driver to passenger |
| Fare Estimation | < 500ms |
| Page Load (Admin) | < 2 seconds |
| App Cold Start | < 3 seconds |
| Concurrent Users | Scale to 100,000+ concurrent users |

### 2.3 Scalability

| Requirement | Strategy |
|---|---|
| Horizontal Scaling | Stateless services behind load balancer |
| Database Scaling | Read replicas, connection pooling, sharding ready |
| Cache Layer | Redis for session cache, ride data, location cache |
| Async Processing | Message queues for non-critical operations |
| Auto-Scaling | Kubernetes HPA based on CPU/Memory/custom metrics |
| CDN | Static assets served via CDN |

### 2.4 Availability

| Requirement | Target |
|---|---|
| Uptime SLA | 99.9% (8.76 hours downtime/year max) |
| Deployment Strategy | Rolling updates with zero-downtime |
| Health Checks | Liveness + Readiness probes on all services |
| Circuit Breakers | Resilience4j for external service calls |
| Disaster Recovery | Multi-AZ deployment, RPO < 5 min, RTO < 30 min |
| Backup | Daily automated DB snapshots, 30-day retention |

### 2.5 Reliability

| Requirement | Specification |
|---|---|
| Idempotency | All payment and ride creation operations idempotent |
| Data Consistency | Eventual consistency for non-critical, strong for payments |
| Retry Logic | Exponential backoff for failed operations |
| Dead Letter Queue | Failed messages routed to DLQ for analysis |
| Transaction Logging | All state-changing operations logged |

### 2.6 Compliance

| Requirement | Standard |
|---|---|
| Data Privacy | GDPR (right to access, delete, portability) |
| Payment Security | PCI-DSS Level 1 compliance |
| Data Localization | Regional data storage where required |
| Accessibility | WCAG 2.1 AA standards for web admin |
| Retention Policy | User data retained for 3 years post account deletion |

### 2.7 Monitoring & Observability

| Requirement | Tool/Strategy |
|---|---|
| Logging | ELK Stack (Elasticsearch, Logstash, Kibana) |
| Metrics | Prometheus + Grafana dashboards |
| Distributed Tracing | OpenTelemetry + Jaeger |
| Alerting | PagerDuty / OpsGenie integration |
| APM | New Relic or Datadog |
| Uptime Monitoring | Synthetic transactions from multiple regions |
| Error Tracking | Sentry for real-time error aggregation |
