# API Specification

## 1. API Overview

- **Base URL:** `https://api.ridesharing.com/api/v1`
- **Format:** JSON
- **Authentication:** Bearer JWT token in `Authorization` header
- **Pagination:** `?page=0&size=20&sort=createdAt,desc`
- **Errors:** Standard error response format

### Standard Response Envelope

```json
{
  "success": true,
  "data": {},
  "message": "Operation completed successfully",
  "timestamp": "2026-06-07T10:30:00Z",
  "path": "/api/v1/rides/estimate"
}
```

### Standard Error Response

```json
{
  "success": false,
  "error": {
    "code": "RIDE_NOT_FOUND",
    "message": "Ride not found with id: abc-123",
    "details": {},
    "status": 404
  },
  "timestamp": "2026-06-07T10:30:00Z",
  "path": "/api/v1/rides/abc-123"
}
```

---

## 2. Authentication APIs

### POST /auth/register

Register a new passenger.

**Request:**
```json
{
  "email": "user@example.com",
  "phone": "+1234567890",
  "password": "SecurePass123!",
  "fullName": "John Doe"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "userId": "uuid",
    "accessToken": "eyJhbGci...",
    "refreshToken": "dGhpcyBp...",
    "expiresIn": 900,
    "tokenType": "Bearer"
  }
}
```

**Error Codes:**

| Code | Status | Description |
|---|---|---|
| EMAIL_EXISTS | 409 | Email already registered |
| PHONE_EXISTS | 409 | Phone already registered |
| INVALID_EMAIL | 400 | Invalid email format |
| WEAK_PASSWORD | 400 | Password does not meet requirements |
| PHONE_INVALID | 400 | Invalid phone number format |

---

### POST /auth/register/driver

Register a new driver.

**Request:**
```json
{
  "email": "driver@example.com",
  "phone": "+1234567890",
  "password": "SecurePass123!",
  "fullName": "Jane Driver",
  "vehicle": {
    "make": "Toyota",
    "model": "Camry",
    "year": 2024,
    "color": "White",
    "licensePlate": "ABC1234",
    "vehicleType": "economy"
  }
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "userId": "uuid",
    "driverId": "uuid",
    "accessToken": "eyJhbGci...",
    "refreshToken": "dGhpcyBp...",
    "expiresIn": 900,
    "tokenType": "Bearer",
    "status": "pending"
  }
}
```

---

### POST /auth/login

Login with email/phone and password.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "deviceId": "device-uuid",
  "fcmToken": "fcm-token-here"
}
```

**Or:**
```json
{
  "phone": "+1234567890",
  "password": "SecurePass123!"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "userId": "uuid",
    "fullName": "John Doe",
    "email": "user@example.com",
    "role": "passenger",
    "accessToken": "eyJhbGci...",
    "refreshToken": "dGhpcyBp...",
    "expiresIn": 900,
    "tokenType": "Bearer"
  }
}
```

---

### POST /auth/login/social

**Request:**
```json
{
  "provider": "google",
  "idToken": "google-id-token",
  "deviceId": "device-uuid",
  "fcmToken": "fcm-token"
}
```

**Response (200):** Same as login.

---

### POST /auth/otp/send

**Request:**
```json
{
  "phone": "+1234567890",
  "purpose": "registration"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "otpId": "uuid",
    "expiresInSeconds": 300
  }
}
```

---

### POST /auth/otp/verify

**Request:**
```json
{
  "otpId": "uuid",
  "code": "123456"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "verified": true
  }
}
```

---

### POST /auth/refresh

**Request:**
```json
{
  "refreshToken": "dGhpcyBp..."
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGci...",
    "refreshToken": "bmV3IHJl...",
    "expiresIn": 900,
    "tokenType": "Bearer"
  }
}
```

---

### POST /auth/logout

**Headers:** `Authorization: Bearer <token>`

**Request:**
```json
{
  "refreshToken": "dGhpcyBp...",
  "deviceId": "device-uuid"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## 3. User APIs

### GET /users/me

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "phone": "+1234567890",
    "role": "passenger",
    "profile": {
      "fullName": "John Doe",
      "photoUrl": "https://cdn.ridesharing.com/photos/uuid.jpg",
      "language": "en"
    },
    "settings": {
      "notificationsEnabled": true,
      "emailNotifications": true,
      "smsNotifications": false
    },
    "stats": {
      "totalRides": 42,
      "totalSpent": 345.50,
      "memberSince": "2025-03-15T10:30:00Z"
    }
  }
}
```

---

### PUT /users/me

**Request:**
```json
{
  "fullName": "John Updated",
  "language": "fr"
}
```

**Response (200):** Updated profile.

---

### PUT /users/me/photo

**Request:** `multipart/form-data` with `file` field.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "photoUrl": "https://cdn.ridesharing.com/photos/uuid.jpg"
  }
}
```

---

### POST /users/me/favorites

**Request:**
```json
{
  "name": "Home",
  "address": "123 Main St, New York, NY",
  "latitude": 40.7128,
  "longitude": -74.0060,
  "placeId": "ChIJ..."
}
```

**Response (200):** Created favorite location.

---

### GET /users/me/favorites

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "Home",
      "address": "123 Main St, New York, NY",
      "latitude": 40.7128,
      "longitude": -74.0060,
      "icon": "home"
    }
  ]
}
```

---

### DELETE /users/me

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "success": true,
  "message": "Account deletion scheduled. Data will be purged within 30 days."
}
```

---

## 4. Ride APIs

### POST /rides/estimate

**Request:**
```json
{
  "pickup": {
    "latitude": 40.7580,
    "longitude": -73.9855,
    "address": "Times Square, New York, NY"
  },
  "destination": {
    "latitude": 40.7484,
    "longitude": -73.9857,
    "address": "Empire State Building, New York, NY"
  },
  "rideTypes": ["economy", "comfort", "premium"]
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "pickup": { "latitude": 40.7580, "longitude": -73.9855, "address": "Times Square" },
    "destination": { "latitude": 40.7484, "longitude": -73.9857, "address": "Empire State Building" },
    "distance": 1.2,
    "distanceUnit": "km",
    "durationMinutes": 8,
    "estimates": [
      {
        "rideType": "economy",
        "baseFare": 2.50,
        "distanceCharge": 3.60,
        "timeCharge": 1.60,
        "surgeMultiplier": 1.0,
        "totalFare": 7.70,
        "currency": "USD",
        "etaMinutes": 3
      },
      {
        "rideType": "comfort",
        "baseFare": 4.00,
        "distanceCharge": 4.80,
        "timeCharge": 2.00,
        "surgeMultiplier": 1.0,
        "totalFare": 10.80,
        "currency": "USD",
        "etaMinutes": 5
      },
      {
        "rideType": "premium",
        "baseFare": 7.00,
        "distanceCharge": 6.00,
        "timeCharge": 2.40,
        "surgeMultiplier": 1.2,
        "totalFare": 18.48,
        "currency": "USD",
        "etaMinutes": 4
      }
    ]
  }
}
```

**Error Codes:**

| Code | Status | Description |
|---|---|---|
| INVALID_LOCATION | 400 | Invalid pickup/destination coordinates |
| NO_SERVICE_AREA | 400 | Location outside service area |
| NO_AVAILABLE_RIDES | 400 | No ride types available at this time |

---

### POST /rides/request

**Request:**
```json
{
  "pickup": {
    "latitude": 40.7580,
    "longitude": -73.9855,
    "address": "Times Square, New York, NY"
  },
  "destination": {
    "latitude": 40.7484,
    "longitude": -73.9857,
    "address": "Empire State Building, New York, NY"
  },
  "rideType": "economy",
  "paymentMethod": "card",
  "promoCode": "SAVE20",
  "scheduledAt": null
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "rideId": "uuid",
    "status": "requested",
    "estimatedFare": 7.70,
    "currency": "USD",
    "estimatedDriverArrival": 180,
    "requestedAt": "2026-06-07T10:30:00Z"
  }
}
```

---

### GET /rides/{id}

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "status": "in_progress",
    "rideType": "economy",
    "passenger": {
      "id": "uuid",
      "fullName": "John Doe",
      "photoUrl": "https://cdn.ridesharing.com/photos/uuid.jpg",
      "rating": 4.8
    },
    "driver": {
      "id": "uuid",
      "fullName": "Jane Driver",
      "photoUrl": "https://cdn.ridesharing.com/photos/driver.jpg",
      "phone": "+1234567890",
      "rating": 4.9,
      "vehicle": {
        "make": "Toyota",
        "model": "Camry",
        "color": "White",
        "licensePlate": "ABC1234"
      },
      "currentLocation": {
        "latitude": 40.7585,
        "longitude": -73.9850
      }
    },
    "pickup": {
      "latitude": 40.7580,
      "longitude": -73.9855,
      "address": "Times Square"
    },
    "destination": {
      "latitude": 40.7484,
      "longitude": -73.9857,
      "address": "Empire State Building"
    },
    "route": {
      "polyline": "abc123...",
      "distance": 1.2,
      "duration": 480
    },
    "pricing": {
      "baseFare": 2.50,
      "distanceCharge": 3.60,
      "timeCharge": 1.60,
      "surgeMultiplier": 1.0,
      "promoDiscount": 1.54,
      "totalFare": 6.16,
      "currency": "USD"
    },
    "timeline": {
      "requestedAt": "2026-06-07T10:30:00Z",
      "acceptedAt": "2026-06-07T10:30:15Z",
      "arrivedAt": "2026-06-07T10:33:00Z",
      "startedAt": "2026-06-07T10:33:30Z"
    },
    "paymentStatus": "completed"
  }
}
```

---

### GET /rides/current

Returns current active ride for the authenticated user.

**Response (200):** Same as GET /rides/{id}

**Response (204):** No active ride (if none exists).

---

### POST /rides/{id}/cancel

**Request:**
```json
{
  "reasonCode": "change_of_plans",
  "reasonText": "I no longer need the ride"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "rideId": "uuid",
    "status": "cancelled",
    "cancellationFee": 2.50,
    "refundAmount": 0,
    "cancelledAt": "2026-06-07T10:35:00Z"
  }
}
```

**Error Codes:**

| Code | Status | Description |
|---|---|---|
| RIDE_NOT_CANCELLABLE | 400 | Ride cannot be cancelled in current state |
| RIDE_ALREADY_COMPLETED | 400 | Ride already completed |

---

### POST /rides/{id}/status

Driver endpoint to update ride status.

**Request:**
```json
{
  "status": "driver_arrived",
  "timestamp": "2026-06-07T10:33:00Z"
}
```

**Valid transitions:**
- `accepted` → `driver_arrived`
- `driver_arrived` → `in_progress`
- `in_progress` → `completed`

---

### GET /rides/history

**Query Parameters:**

| Param | Type | Default | Description |
|---|---|---|---|
| page | int | 0 | Page number |
| size | int | 20 | Items per page |
| sort | string | createdAt,desc | Sort field and direction |
| from | date | - | Start date filter |
| to | date | - | End date filter |
| status | string | - | Filter by status |

**Response (200):**
```json
{
  "success": true,
  "data": {
    "content": [
      {
        "id": "uuid",
        "status": "completed",
        "pickupAddress": "Times Square",
        "destAddress": "Empire State Building",
        "rideType": "economy",
        "totalFare": 7.70,
        "currency": "USD",
        "driverName": "Jane Driver",
        "duration": 480,
        "distance": 1.2,
        "completedAt": "2026-06-06T14:30:00Z",
        "rating": 5
      }
    ],
    "page": 0,
    "size": 20,
    "totalElements": 142,
    "totalPages": 8,
    "last": false
  }
}
```

---

### POST /rides/{id}/rate

**Request:**
```json
{
  "rating": 5,
  "comment": "Great ride, very smooth!",
  "tags": ["on_time", "friendly", "clean"]
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "rideId": "uuid",
    "rating": 5,
    "createdAt": "2026-06-07T10:45:00Z"
  }
}
```

---

### POST /rides/{id}/tip

**Request:**
```json
{
  "amount": 2.00,
  "currency": "USD"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "rideId": "uuid",
    "tipAmount": 2.00,
    "totalCharged": 8.16,
    "status": "completed"
  }
}
```

---

### POST /rides/schedule

**Request:**
```json
{
  "pickup": {
    "latitude": 40.7580,
    "longitude": -73.9855,
    "address": "Times Square, New York, NY"
  },
  "destination": {
    "latitude": 40.7484,
    "longitude": -73.9857,
    "address": "Empire State Building, New York, NY"
  },
  "rideType": "economy",
  "scheduledAt": "2026-06-08T08:00:00Z"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "scheduledRideId": "uuid",
    "status": "pending",
    "scheduledAt": "2026-06-08T08:00:00Z",
    "estimatedFare": 7.70,
    "currency": "USD"
  }
}
```

---

## 5. Driver APIs

### GET /drivers/me

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "status": "approved",
    "isOnline": true,
    "isBusy": false,
    "currentLocation": { "latitude": 40.7580, "longitude": -73.9855 },
    "vehicle": {
      "id": "uuid",
      "make": "Toyota",
      "model": "Camry",
      "year": 2024,
      "color": "White",
      "licensePlate": "ABC1234",
      "vehicleType": "economy",
      "status": "approved"
    },
    "stats": {
      "totalEarnings": 4520.50,
      "totalRides": 320,
      "rating": 4.9,
      "acceptanceRate": 92.5,
      "cancellationRate": 2.1,
      "onlineHours": 520
    },
    "documentsStatus": {
      "identity": "approved",
      "license": "approved",
      "vehicleRegistration": "approved",
      "insurance": "approved",
      "backgroundCheck": "cleared"
    }
  }
}
```

---

### PUT /drivers/me/location

Driver location update (also sent via WebSocket for real-time).

**Request:**
```json
{
  "latitude": 40.7580,
  "longitude": -73.9855,
  "heading": 180.0,
  "speed": 0.0,
  "timestamp": "2026-06-07T10:30:00Z"
}
```

**Response (200):** `{ "success": true }`

---

### POST /drivers/me/status

**Request:**
```json
{
  "isOnline": true
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "isOnline": true,
    "statusChangedAt": "2026-06-07T10:30:00Z"
  }
}
```

---

### POST /drivers/me/documents

**Request:** `multipart/form-data`
- `file`: The document file (PDF, JPG, PNG)
- `documentType`: `license`, `identity_card`, `insurance`, `registration`, `selfie`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "documentId": "uuid",
    "documentType": "license",
    "status": "pending",
    "uploadedAt": "2026-06-07T10:30:00Z"
  }
}
```

---

### GET /drivers/me/earnings

**Query Parameters:**

| Param | Type | Default | Description |
|---|---|---|---|
| period | string | week | `day`, `week`, `month`, `year`, `all` |

**Response (200):**
```json
{
  "success": true,
  "data": {
    "period": "week",
    "totalEarnings": 850.00,
    "totalRides": 45,
    "totalHours": 28,
    "averagePerRide": 18.89,
    "averagePerHour": 30.36,
    "commissionPaid": 127.50,
    "tipsReceived": 45.00,
    "breakdown": [
      { "date": "2026-06-01", "earnings": 120.00, "rides": 6, "hours": 4 },
      { "date": "2026-06-02", "earnings": 150.00, "rides": 8, "hours": 5 }
    ]
  }
}
```

---

### POST /drivers/me/payout

**Request:**
```json
{
  "amount": 500.00
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "payoutId": "uuid",
    "amount": 500.00,
    "status": "pending",
    "estimatedCompletion": "2026-06-09T10:30:00Z"
  }
}
```

---

## 6. Payment APIs

### POST /payments/methods

**Request:**
```json
{
  "stripePaymentMethodId": "pm_123456"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "cardLast4": "4242",
    "cardBrand": "visa",
    "cardExpMonth": 12,
    "cardExpYear": 2027,
    "isDefault": true
  }
}
```

---

### GET /payments/methods

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "cardLast4": "4242",
      "cardBrand": "visa",
      "cardExpMonth": 12,
      "cardExpYear": 2027,
      "isDefault": true
    }
  ]
}
```

---

### GET /payments/wallet

**Response (200):**
```json
{
  "success": true,
  "data": {
    "balance": 50.00,
    "currency": "USD",
    "lastUpdated": "2026-06-07T10:30:00Z"
  }
}
```

---

### POST /payments/wallet/topup

**Request:**
```json
{
  "amount": 25.00,
  "paymentMethodId": "uuid",
  "currency": "USD"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "transactionId": "uuid",
    "amount": 25.00,
    "newBalance": 75.00,
    "status": "completed"
  }
}
```

---

### GET /payments/history

**Response (200):**
```json
{
  "success": true,
  "data": {
    "content": [
      {
        "id": "uuid",
        "type": "ride_payment",
        "amount": -7.70,
        "currency": "USD",
        "status": "completed",
        "description": "Ride to Empire State Building",
        "createdAt": "2026-06-07T10:45:00Z"
      },
      {
        "id": "uuid",
        "type": "wallet_topup",
        "amount": 25.00,
        "currency": "USD",
        "status": "completed",
        "description": "Wallet top-up",
        "createdAt": "2026-06-06T09:00:00Z"
      }
    ],
    "page": 0,
    "size": 20,
    "totalElements": 55,
    "totalPages": 3
  }
}
```

---

## 7. Admin APIs

### GET /admin/dashboard

**Response (200):**
```json
{
  "success": true,
  "data": {
    "summary": {
      "totalUsers": 50000,
      "totalDrivers": 12000,
      "activeDrivers": 3400,
      "totalRides": 250000,
      "todayRides": 1200,
      "totalRevenue": 1875000.00,
      "todayRevenue": 15000.00,
      "avgRating": 4.7,
      "avgDriverAcceptance": 88.5
    },
    "trends": {
      "ridesLast7Days": [950, 1020, 1100, 980, 1150, 1200, 1180],
      "revenueLast7Days": [12000, 13000, 14000, 12500, 14500, 15000, 14800],
      "newUsersLast7Days": [150, 180, 200, 165, 210, 220, 190]
    },
    "topDrivers": [
      { "driverId": "uuid", "name": "Jane Driver", "ratings": 4.9, "rides": 320, "earnings": 4520 }
    ],
    "recentRides": [
      { "rideId": "uuid", "passenger": "John", "driver": "Jane", "status": "completed", "fare": 7.70, "time": "2 min ago" }
    ]
  }
}
```

---

### GET /admin/users

**Query Parameters:**

| Param | Type | Description |
|---|---|---|
| search | string | Search by name, email, phone |
| status | string | active, suspended, banned |
| role | string | passenger, driver |
| page | int | Page number |
| size | int | Items per page |

**Response (200):** Paginated user list with profiles, status, ride counts.

---

### PUT /admin/users/{id}/status

**Request:**
```json
{
  "status": "suspended",
  "reason": "Violation of terms of service"
}
```

**Response (200):** Updated user status.

---

### GET /admin/drivers

**Response (200):** Paginated driver list with verification status, earnings, ratings.

---

### PUT /admin/drivers/{id}/verify

**Request:**
```json
{
  "status": "approved",
  "note": "All documents verified correctly"
}
```

**Response (200):** Updated driver verification status.

---

### POST /admin/promotions

**Request:**
```json
{
  "code": "SUMMER20",
  "discountType": "percentage",
  "discountValue": 20.00,
  "maxDiscount": 10.00,
  "minRideValue": 5.00,
  "maxUses": 1000,
  "maxUsesPerUser": 1,
  "applicableRideTypes": ["economy", "comfort"],
  "validFrom": "2026-06-01T00:00:00Z",
  "validTo": "2026-08-31T23:59:59Z"
}
```

**Response (200):** Created promo code.

---

### GET /admin/reports/{type}

**Path Parameters:**

| Type | Description |
|---|---|
| revenue | Revenue report by day/week/month |
| rides | Ride volume report |
| users | User growth & retention report |
| drivers | Driver acquisition & retention report |

**Query Parameters:** `from`, `to`, `format=csv` (downloads CSV file)

---

### GET /admin/support/tickets

**Response (200):** Paginated support tickets with user info, status, priority.

---

### PUT /admin/support/tickets/{id}

**Request:**
```json
{
  "status": "in_progress",
  "assignedTo": "admin-uuid"
}
```

**Response (200):** Updated ticket.

---

### GET /admin/fraud/flags

**Response (200):** Paginated fraud flags with severity, status, user info.

---

## 8. Promo APIs

### POST /promo/validate

**Request:**
```json
{
  "code": "SAVE20",
  "rideType": "economy",
  "fare": 7.70
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "valid": true,
    "discountType": "percentage",
    "discountValue": 20.00,
    "maxDiscount": 10.00,
    "discountAmount": 1.54,
    "finalFare": 6.16
  }
}
```

---

### GET /promo/available

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "code": "WELCOME10",
      "description": "10% off your first 5 rides",
      "discountType": "percentage",
      "discountValue": 10,
      "maxDiscount": 5.00,
      "validUntil": "2026-07-31T23:59:59Z"
    }
  ]
}
```

---

## 9. Notification APIs

### POST /notifications/register

**Request:**
```json
{
  "deviceId": "device-uuid",
  "platform": "ios",
  "fcmToken": "fcm-token",
  "apnsToken": "apns-token"
}
```

**Response (200):** Device registered.

---

### PUT /notifications/preferences

**Request:**
```json
{
  "preferences": [
    { "channel": "push", "eventType": "ride_update", "enabled": true },
    { "channel": "sms", "eventType": "payment", "enabled": false },
    { "channel": "email", "eventType": "promo", "enabled": true }
  ]
}
```

**Response (200):** Preferences updated.

---

### GET /notifications

**Query Parameters:** `page`, `size`

**Response (200):** Paginated notification history.

---

## 10. WebSocket Endpoints

### Connection

```
wss://api.ridesharing.com/ws
```

Connect with JWT token:
```
wss://api.ridesharing.com/ws?access_token=eyJhbGci...
```

### STOMP Topics

| Topic | Direction | Description |
|---|---|---|
| `/topic/ride/{rideId}` | Server → Client | Ride status updates |
| `/topic/driver/{driverId}/location` | Server → Client | Driver location broadcasts |
| `/topic/ride/request/{driverId}` | Server → Client | New ride requests to driver |
| `/topic/ride/offer/{passengerId}` | Server → Client | Driver matched notification |
| `/topic/nearby/{passengerId}` | Server → Client | Nearby driver updates |

### STOMP Endpoints

| Endpoint | Direction | Description |
|---|---|---|
| `/app/location/driver` | Client → Server | Driver sends location update |
| `/app/ride/accept` | Client → Server | Driver accepts ride |
| `/app/ride/reject` | Client → Server | Driver rejects ride |

### WebSocket Message Format

```json
{
  "type": "DRIVER_LOCATION",
  "rideId": "uuid",
  "data": {
    "driverId": "uuid",
    "latitude": 40.7580,
    "longitude": -73.9855,
    "heading": 180.0,
    "speed": 35.0,
    "timestamp": "2026-06-07T10:30:00Z"
  },
  "timestamp": "2026-06-07T10:30:00Z"
}
```
