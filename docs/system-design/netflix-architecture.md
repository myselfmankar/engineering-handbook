---
id: netflix-architecture
title: "Case Study: Netflix Architecture"
sidebar_label: Netflix Architecture
description: How Netflix serves 270 million users globally — a deep dive into their microservices, CDN, and resilience engineering.
tags: [case-studies, microservices, streaming, aws]
---

# Case Study: Netflix Architecture

Netflix serves **270 million subscribers** across 190 countries, streaming **1 billion+ hours** of video per day. Their architecture is one of the most referenced in system design discussions.

:::info Key Numbers (2024)
- 🌍 190+ countries
- 👤 270 million subscribers
- 📺 1 billion+ hours streamed per day
- ☁️ Runs entirely on **AWS**
- 🎬 ~15,000 microservices
:::

---

## High-Level Architecture

```mermaid
graph TB
    subgraph Client["📱 Client (App / Browser)"]
        APP["Netflix App"]
    end

    subgraph AWS_Edge["🌐 AWS Edge (CloudFront + OCA)"]
        CDN["Open Connect CDN"]
    end

    subgraph Backend["☁️ AWS Backend"]
        API["API Gateway<br/>(Zuul)"]
        subgraph Services["Microservices"]
            US["User Service"]
            RS["Recommendation Service"]
            CS["Content Service"]
            BS["Billing Service"]
        end
        KAFKA["Apache Kafka<br/>(Event Bus)"]
        CACHE["EVCache<br/>(Memcached)"]
        DB["Cassandra<br/>(User Data)"]
        S3["AWS S3<br/>(Video Storage)"]
    end

    APP -->|"Metadata requests"| API
    APP -->|"Video stream"| CDN
    API --> Services
    Services --> KAFKA
    Services --> CACHE
    Services --> DB
    CDN --> S3
```

---

## The Two Sides of Netflix

Netflix's architecture has **two distinct data flows**:

### 1. 📋 Control Plane (Metadata)
Requests for user data, recommendations, search, and content metadata. These go through their **AWS backend**.

### 2. 🎬 Data Plane (Video)
Actual video streams. These **never go through AWS**. Instead, they flow through Netflix's own **Open Connect CDN** — servers Netflix places *inside ISPs and internet exchanges* globally.

---

## Key Technology Decisions

### Microservices (~15,000 services)
Netflix was one of the first companies to fully adopt microservices (2008 onwards). Each service:
- Owns its own database
- Is deployed independently
- Communicates via REST or Kafka events

### Open Connect CDN
Instead of relying on third-party CDNs, Netflix built its own. They ship physical servers called **Open Connect Appliances (OCAs)** directly to ISPs. The OCA stores the top 95% of streamed content locally. When you press Play:

```mermaid
sequenceDiagram
    participant App as Netflix App
    participant Backend as AWS Backend
    participant OCA as Local ISP OCA

    App->>Backend: "I want to play Stranger Things S4E1"
    Backend-->>App: "Stream from OCA at 192.168.x.x (your ISP)"
    App->>OCA: Start video stream
    OCA-->>App: 🎬 Video bytes (low latency, no AWS involved)
```

### EVCache (Distributed Caching)
Netflix processes billions of requests and can't hit Cassandra every time. EVCache is their Memcached-based caching layer, replicated across AWS availability zones. Cache hit rates: **~99%**.

### Apache Kafka (Event Streaming)
All activity (plays, pauses, searches, ratings) is published to Kafka. This powers:
- Real-time **recommendation updates**
- **Analytics** pipelines
- **Billing** events
- **A/B testing** infrastructure

---

## Resilience Engineering

Netflix is famous for handling failures. They built **Chaos Engineering**.

### Chaos Monkey 🐒
A tool that **randomly kills production servers** during business hours. The philosophy: *"If it can fail, it will fail. So let's fail it on purpose when engineers are watching."*

### Hystrix (Circuit Breaker)
When a downstream service is slow or down, Hystrix **"opens the circuit"** and returns a cached/default response instead of waiting. This prevents cascading failures.

```mermaid
stateDiagram-v2
    [*] --> Closed : System starts
    Closed --> Open : Failure threshold exceeded
    Open --> HalfOpen : After timeout
    HalfOpen --> Closed : Test request succeeds
    HalfOpen --> Open : Test request fails
```

---

## Database Strategy

| Data Type | Database | Why |
|---|---|---|
| User profiles, watch history | **Cassandra** | High write throughput, geo-distributed |
| Billing data | **MySQL** (on RDS) | ACID transactions needed |
| Recommendations model | **Custom ML infra** | Real-time + batch hybrid |
| Movie metadata | **DynamoDB** | Fast key-value lookups |
| Session data | **EVCache (Memcached)** | Ultra-low latency |

---

## What I Learned From Netflix

1. **Separation of concerns at scale** — video traffic and API traffic are completely decoupled.
2. **Build for failure** — Chaos Engineering is now an industry practice, not just Netflix's quirk.
3. **CDN strategy matters more than application logic** for media companies.
4. **Polyglot persistence** — No single database solves all problems.

---

## Further Reading

- [Netflix Tech Blog](https://netflixtechblog.com/)
- [Chaos Engineering Book](https://principlesofchaos.org/)
- [Open Connect Overview](https://openconnect.netflix.com/)
