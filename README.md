# NestJS Auth Template Backend

<p align="center">
  <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL">
  <img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white" alt="Redis">
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Production_Ready-success?style=for-the-badge" alt="Status">
  <img src="https://img.shields.io/badge/Auth-Session_+_OAuth-blue?style=for-the-badge" alt="Authentication">
  <img src="https://img.shields.io/badge/2FA-Email_Based-orange?style=for-the-badge" alt="2FA">
  <img src="https://img.shields.io/badge/API-REST_+_Swagger-green?style=for-the-badge" alt="API">
</p>

<p align="center">
  <strong>A production-ready NestJS authentication template with PostgreSQL, Redis, and comprehensive session management.</strong>
</p>

> **✅ Production Ready:** This template includes complete authentication, user management, 2FA, password reset, and OAuth integration.

---

## 📑 Table of Contents

- [✨ Features](#-features)
- [🏃‍♂️ Quick Start](#️-quick-start)
- [📋 Prerequisites](#-prerequisites)
- [⚙️ Configuration](#️-configuration)
- [🚀 Deployment](#-deployment)
- [📚 API Documentation](#-api-documentation)
- [🔒 Security Guide](#-security-guide)
- [🛠️ Development](#️-development)
- [🧪 Testing](#-testing)
- [🔧 Troubleshooting](#-troubleshooting)
- [🤝 Contributing](#-contributing)
- [📞 Support](#-support)

---

## ✨ Features

### 🔐 Authentication & Security

- **Session-based Authentication** with Redis storage
- **Email/Password Authentication** with secure password validation
- **Two-Factor Authentication (2FA)** via email codes
- **Password Reset** with secure token-based flow
- **Email Verification** for new registrations
- **Google OAuth** integration
- **Google reCAPTCHA** protection
- **Secure Cookie** configuration
- **Role-based Authorization** (ADMIN/REGULAR)
- **JWT Token** support (planned)

### 🗄️ Database & Storage

- **PostgreSQL** with Prisma ORM
- **Redis** for session storage
- **Database migrations** with Prisma
- **Connection pooling** support

### 🔧 Development Experience

- **TypeScript** support
- **Hot reload** in development
- **Docker** support for development and production
- **ESLint & Prettier** configuration
- **Testing setup** included
- **Environment validation**

### 🌐 Production Ready

- **CORS** support for frontend integration
- **Health checks** endpoint
- **Error handling** middleware
- **Request validation** with class-validator
- **Session Security** with configurable options
- **Password Security** with strength validation
- **Token Security** with time-limited expiration
- **Rate limiting** (planned)

---

## 🏃‍♂️ Quick Start

### 1️⃣ Clone & Install

```bash
git clone <repository-url>
cd nest-auth-template-backend
pnpm install
```

### 2️⃣ Setup Environment

```bash
cp .env.example .env
# Edit .env with your configuration (see Configuration section)
```

### 3️⃣ Start Services

```bash
docker-compose up -d        # Start PostgreSQL & Redis
pnpm prisma migrate dev     # Run database migrations
pnpm prisma generate        # Generate Prisma client
```

### 4️⃣ Launch Application

```bash
pnpm start:dev              # Development mode
# 🚀 App running at http://localhost:4000
```

**🎉 That's it! Your backend is ready.**

---

## 📋 Prerequisites

| Tool        | Version | Installation                                      |
| ----------- | ------- | ------------------------------------------------- |
| **Node.js** | v18+    | [Download](https://nodejs.org/)                   |
| **pnpm**    | v8+     | [Install Guide](https://pnpm.io/installation)     |
| **Docker**  | Latest  | [Get Docker](https://docs.docker.com/get-docker/) |
| **Git**     | Latest  | [Install Git](https://git-scm.com/downloads)      |

---

## ⚙️ Configuration

### Environment Variables

<details>
<summary><strong>📱 Application Settings</strong></summary>

| Variable           | Description         | Default                 | Required |
| ------------------ | ------------------- | ----------------------- | -------- |
| `NODE_ENV`         | Environment mode    | `development`           | ✅       |
| `APPLICATION_PORT` | Backend server port | `4000`                  | ✅       |
| `APPLICATION_URL`  | Backend URL         | `http://localhost:4000` | ✅       |
| `ALLOWED_ORIGIN`   | Allowed CORS origin | `http://localhost:3000` | ✅       |

</details>

<details>
<summary><strong>🔐 Session & Security</strong></summary>

| Variable            | Description               | Default     | Required |
| ------------------- | ------------------------- | ----------- | -------- |
| `COOKIES_SECRET`    | Cookie encryption secret  | -           | ✅       |
| `SESSION_SECRET`    | Session encryption secret | -           | ✅       |
| `SESSION_NAME`      | Session cookie name       | `session`   | ✅       |
| `SESSION_DOMAIN`    | Session cookie domain     | `localhost` | ✅       |
| `SESSION_MAX_AGE`   | Session expiration time   | `30d`       | ✅       |
| `SESSION_HTTP_ONLY` | HTTP-only cookie flag     | `true`      | ✅       |
| `SESSION_SECURE`    | Secure cookie flag        | `false`     | ✅       |

</details>

<details>
<summary><strong>🐘 PostgreSQL Database</strong></summary>

| Variable            | Description            | Default         | Required |
| ------------------- | ---------------------- | --------------- | -------- |
| `POSTGRES_USER`     | PostgreSQL username    | `root`          | ✅       |
| `POSTGRES_PASSWORD` | PostgreSQL password    | -               | ✅       |
| `POSTGRES_HOST`     | PostgreSQL host        | `localhost`     | ✅       |
| `POSTGRES_PORT`     | PostgreSQL port        | `5433`          | ✅       |
| `POSTGRES_DB`       | Database name          | `authorization` | ✅       |
| `POSTGRES_URI`      | Full connection string | Auto-generated  | ✅       |

</details>

<details>
<summary><strong>🔴 Redis Configuration</strong></summary>

| Variable         | Description            | Default        | Required |
| ---------------- | ---------------------- | -------------- | -------- |
| `REDIS_USER`     | Redis username         | `default`      | ✅       |
| `REDIS_PASSWORD` | Redis password         | -              | ✅       |
| `REDIS_HOST`     | Redis host             | `localhost`    | ✅       |
| `REDIS_PORT`     | Redis port             | `6379`         | ✅       |
| `REDIS_URI`      | Full connection string | Auto-generated | ✅       |

</details>

<details>
<summary><strong>🌐 Google Services</strong></summary>

| Variable                      | Description                 | Required |
| ----------------------------- | --------------------------- | -------- |
| `GOOGLE_RECAPTCHA_SECRET_KEY` | Google reCAPTCHA secret key | ✅       |
| `GOOGLE_CLIENT_ID`            | Google OAuth client ID      | ✅       |
| `GOOGLE_CLIENT_SECRET`        | Google OAuth client secret  | ✅       |

**📝 How to get Google credentials:**

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API and reCAPTCHA API
4. Create OAuth 2.0 credentials
5. Add your domain to authorized origins

</details>

### Example .env File

```env
# Application
NODE_ENV=development
APPLICATION_PORT=4000
APPLICATION_URL=http://localhost:4000
ALLOWED_ORIGIN=http://localhost:3000

# Security
COOKIES_SECRET=your-super-secret-cookies-key-min-32-chars
SESSION_SECRET=your-super-secret-session-key-min-32-chars
SESSION_NAME=session
SESSION_DOMAIN=localhost
SESSION_MAX_AGE=30d
SESSION_HTTP_ONLY=true
SESSION_SECURE=false

# Database
POSTGRES_USER=root
POSTGRES_PASSWORD=your-secure-db-password
POSTGRES_HOST=localhost
POSTGRES_PORT=5433
POSTGRES_DB=authorization
POSTGRES_URI=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}

# Redis
REDIS_USER=default
REDIS_PASSWORD=your-redis-password
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_URI=redis://${REDIS_USER}:${REDIS_PASSWORD}@${REDIS_HOST}:${REDIS_PORT}

# Google
GOOGLE_RECAPTCHA_SECRET_KEY=your-recaptcha-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

---

## 🚀 Deployment

### 🐳 Docker Development

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f app

# Stop services
docker-compose down

# Rebuild and start
docker-compose up -d --build
```

### 🏭 Production Deployment

```bash
# Build production image
docker build -t nest-auth-backend:latest .

# Run with production compose
docker-compose -f docker-compose.prod.yml up -d

# Run database migrations
docker-compose exec app pnpm prisma migrate deploy
```

---

## 📚 API Documentation

### 🔐 Authentication Endpoints

| Method | Endpoint                           | Description                    | Status       |
| ------ | ---------------------------------- | ------------------------------ | ------------ |
| `POST` | `/auth/register`                   | Register new user              | ✅ Available |
| `POST` | `/auth/login`                      | Login user (with 2FA support) | ✅ Available |
| `POST` | `/auth/logout`                     | Logout user                    | ✅ Available |
| `GET`  | `/auth/oauth/connect/:provider`    | Initiate OAuth flow            | ✅ Available |
| `GET`  | `/auth/oauth/callback/:provider`   | OAuth callback handler         | ✅ Available |
| `POST` | `/auth/email-confirmation`         | Verify email confirmation      | ✅ Available |
| `POST` | `/auth/recovery`                   | Send password reset email      | ✅ Available |
| `POST` | `/auth/recovery/confirm/:token`    | Validate recovery token        | ✅ Available |
| `POST` | `/auth/recovery/password/:token`   | Reset password with token      | ✅ Available |

### 👤 User Management Endpoints

| Method | Endpoint             | Description              | Auth Required | Role    |
| ------ | -------------------- | ------------------------ | ------------- | ------- |
| `GET`  | `/users/profile`     | Get current user profile | ✅            | Any     |
| `PUT`  | `/users/profile`     | Update current profile   | ✅            | Any     |
| `GET`  | `/users/profile/:id` | Get user by ID           | ✅            | Admin   |
| `PUT`  | `/users/profile/:id` | Update user by ID        | ✅            | Admin   |

### ❤️ Health Check

| Method | Endpoint  | Description   | Response              |
| ------ | --------- | ------------- | --------------------- |
| `GET`  | `/health` | Health status | `{ status: 'ok' }`    |

### 🔑 Authentication Flow Details

<details>
<summary><strong>📝 Registration Flow</strong></summary>

```bash
# 1. Register new user
POST /auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "passwordRepeat": "SecurePass123!"
}

# 2. Verify email (token sent to email)
POST /auth/email-confirmation
{
  "token": "verification-token-from-email"
}
```

</details>

<details>
<summary><strong>🔓 Login Flow</strong></summary>

```bash
# Standard login
POST /auth/login
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}

# Login with 2FA (if enabled)
POST /auth/login
{
  "email": "john@example.com",
  "password": "SecurePass123!",
  "twoFactorToken": "123456"
}
```

</details>

<details>
<summary><strong>🔄 Password Reset Flow</strong></summary>

```bash
# 1. Request password reset
POST /auth/recovery
{
  "email": "john@example.com"
}

# 2. Validate reset token (optional)
POST /auth/recovery/confirm/TOKEN_FROM_EMAIL

# 3. Reset password
POST /auth/recovery/password/TOKEN_FROM_EMAIL
{
  "password": "NewSecurePass123!",
  "passwordRepeat": "NewSecurePass123!"
}
```

</details>

<details>
<summary><strong>🌐 OAuth Flow</strong></summary>

```bash
# 1. Get OAuth URL
GET /auth/oauth/connect/google
# Returns: { "url": "https://accounts.google.com/oauth/authorize?..." }

# 2. User authorizes on Google
# 3. Google redirects to callback
GET /auth/oauth/callback/google?code=AUTHORIZATION_CODE
# Automatically creates/links account and redirects to frontend
```

</details>

### 🛡️ Security Features

- **Password Requirements**: Minimum 8 characters with complexity validation
- **Session Management**: Redis-backed sessions with configurable expiration
- **2FA Support**: Email-based two-factor authentication
- **Token Security**: Time-limited tokens for email verification and password reset
- **Role-based Access**: ADMIN and REGULAR user roles
- **OAuth Integration**: Google OAuth 2.0 with account linking
- **CORS Protection**: Configurable allowed origins
- **Cookie Security**: HTTP-only, secure, and SameSite protection

### 📖 Interactive API Docs

When running in development, visit:

- **Swagger UI**: `http://localhost:4000/api/docs`
- **Redoc**: `http://localhost:4000/api/redoc`

---

## 🔒 Security Guide

### 🛡️ Production Security Checklist

- [ ] **Environment Variables**: All sensitive data in environment variables
- [ ] **Strong Secrets**: Use 32+ character random strings for `COOKIES_SECRET` and `SESSION_SECRET`
- [ ] **Database Security**: Strong database passwords and restricted access
- [ ] **Session Configuration**: Set `SESSION_SECURE=true` and proper domain in production
- [ ] **CORS**: Restrict `ALLOWED_ORIGIN` to your actual frontend domain
- [ ] **Google OAuth**: Verify redirect URIs in Google Console
- [ ] **Redis Security**: Use authentication and restrict network access
- [ ] **SSL/TLS**: Use HTTPS in production (Let's Encrypt, Cloudflare, etc.)

### 🔑 Password Policy

```typescript
// Enforced password requirements:
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter  
- At least one number
- At least one special character
```

### 🚨 Security Best Practices

1. **Never commit secrets** to version control
2. **Rotate secrets regularly** in production
3. **Monitor failed login attempts** (implement rate limiting)
4. **Keep dependencies updated** with `pnpm audit`
5. **Use environment-specific configurations**
6. **Enable logging** for security events
7. **Regular security audits** of the codebase

---

## 🧪 Testing

### Running Tests

```bash
# Unit tests
pnpm test

# Watch mode for development
pnpm test:watch

# End-to-end tests
pnpm test:e2e

# Test coverage
pnpm test:cov
```

### Test Categories

- **Unit Tests**: Service logic, utilities, and helpers
- **Integration Tests**: Controller endpoints and database operations
- **E2E Tests**: Complete authentication flows and user journeys

### Writing Tests

```typescript
// Example test structure
describe('AuthController', () => {
  it('should register a new user', async () => {
    // Test implementation
  });
  
  it('should login with valid credentials', async () => {
    // Test implementation  
  });
});
```

---

## 🛠️ Development

### Available Scripts

| Command           | Description                    |
| ----------------- | ------------------------------ |
| `pnpm start:dev`  | 🔥 Development with hot reload |
| `pnpm start:prod` | 🚀 Production server           |
| `pnpm build`      | 📦 Build for production        |
| `pnpm test`       | 🧪 Run tests                   |
| `pnpm test:watch` | 🔍 Run tests in watch mode     |
| `pnpm test:e2e`   | 🌐 Run e2e tests               |
| `pnpm lint`       | 🔍 Run ESLint                  |
| `pnpm format`     | ✨ Format with Prettier        |

### Database Commands

| Command                     | Description                |
| --------------------------- | -------------------------- |
| `pnpm prisma generate`      | Generate Prisma client     |
| `pnpm prisma migrate dev`   | Create and apply migration |
| `pnpm prisma migrate reset` | Reset database             |
| `pnpm prisma studio`        | Open Prisma Studio         |
| `pnpm prisma db seed`       | Seed database              |

---

## 🔧 Troubleshooting

### 🔴 Common Issues

<details>
<summary><strong>Database Connection Failed</strong></summary>

**Symptoms:** `ECONNREFUSED` or `Connection refused`

**Solutions:**

```bash
# Check if PostgreSQL is running
docker-compose ps

# Check logs
docker-compose logs postgres

# Restart services
docker-compose restart postgres

# Verify connection
docker-compose exec postgres psql -U root -d authorization
```

</details>

<details>
<summary><strong>Redis Connection Issues</strong></summary>

**Symptoms:** `Redis connection failed` or `ECONNREFUSED`

**Solutions:**

```bash
# Check Redis status
docker-compose logs redis

# Test Redis connection
docker-compose exec redis redis-cli ping

# Check Redis auth
docker-compose exec redis redis-cli -a your-password ping
```

</details>

<details>
<summary><strong>Session/Cookie Problems</strong></summary>

**Symptoms:** Session not persisting, login not working

**Solutions:**

- Set `SESSION_SECURE=false` for HTTP in development
- Check `SESSION_DOMAIN` matches your domain
- Verify `COOKIES_SECRET` and `SESSION_SECRET` are set
- Clear browser cookies and try again

</details>

<details>
<summary><strong>CORS Errors</strong></summary>

**Symptoms:** `Access-Control-Allow-Origin` errors

**Solutions:**

- Verify `ALLOWED_ORIGIN` exactly matches frontend URL
- Include protocol (`http://` or `https://`)
- Check for trailing slashes
- For multiple origins, use comma-separated values

</details>

### 🐛 Debug Mode

```bash
# Enable debug logging
DEBUG=* pnpm start:dev

# NestJS specific debugging
DEBUG=nest:* pnpm start:dev

# Database query logging
DEBUG=prisma:* pnpm start:dev
```

### 🔧 Reset Everything

```bash
# Nuclear option - reset everything
docker-compose down -v
docker system prune -a
pnpm prisma migrate reset
docker-compose up -d
pnpm prisma migrate dev
pnpm start:dev
```

### 📊 Performance Tips

```bash
# Monitor application performance
docker stats

# Check database performance
docker-compose exec postgres pg_stat_activity

# Redis memory usage
docker-compose exec redis redis-cli info memory

# Application logs
docker-compose logs -f app --tail=100
```

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### Development Setup

1. **Fork** the repository
2. **Clone** your fork: `git clone <your-fork-url>`
3. **Install** dependencies: `pnpm install`
4. **Create** a feature branch: `git checkout -b feature/amazing-feature`
5. **Make** your changes
6. **Test** your changes: `pnpm test`
7. **Commit** your changes: `git commit -m 'Add amazing feature'`
8. **Push** to your branch: `git push origin feature/amazing-feature`
9. **Open** a Pull Request

### Contribution Guidelines

- Follow the existing code style
- Write tests for new features
- Update documentation as needed
- Keep commits atomic and well-described
- Ensure all tests pass before submitting

### Code Style

- Use **TypeScript** for all new code
- Follow **ESLint** and **Prettier** configurations
- Use **conventional commits** format
- Add **JSDoc** comments for public APIs
- Follow **NestJS best practices** and patterns
- Use **DTOs** for request/response validation
- Implement **proper error handling**

### Commit Message Format

```
type(scope): description

Types: feat, fix, docs, style, refactor, test, chore
Examples:
- feat(auth): add 2FA email verification
- fix(users): resolve profile update validation
- docs(readme): update API documentation
```

---

## 📞 Support

### 🆘 Getting Help

1. **📖 Check Documentation** - Read this README thoroughly
2. **🔍 Search Issues** - Look through [existing issues](../../issues)
3. **💬 Ask Questions** - Create a [new issue](../../issues/new) with:
   - Clear description of the problem
   - Steps to reproduce
   - Environment details
   - Error messages/logs

### 🐛 Bug Reports

Please include:

- **Environment** (OS, Node.js version, etc.)
- **Steps to reproduce**
- **Expected vs actual behavior**
- **Error logs**
- **Configuration** (remove sensitive data)

### 💡 Feature Requests

We're always open to new ideas! Please include:

- **Use case** description
- **Proposed solution**
- **Alternative solutions** considered
- **Additional context**

---

### 💡 Feature Requests

Have an idea? [Open an issue](../../issues/new) with the `enhancement` label!

---

<p align="center">
  <strong>Made with ❤️ by the development team</strong>
</p>

<p align="center">
  <a href="#-table-of-contents">⬆️ Back to Top</a> |
  <a href="../../issues">🐛 Report Bug</a> |
  <a href="../../issues/new">💡 Request Feature</a>
</p>

---

**Happy coding! 🚀**
