# NestJS Auth Template Backend

> **⚠️ Disclaimer:** This project is under active development. The functionality and documentation will be updated as the project evolves.

A production-ready NestJS authentication template with PostgreSQL, Redis, and comprehensive session management.

## ✨ Features

- 🔐 Complete authentication system (login, register, logout) (coming soon)
- 🍪 Session-based authentication with Redis storage (partial, coming soon)
- 🐘 PostgreSQL database with Prisma ORM
- 🔒 Secure cookie configuration
- 🌐 CORS support for frontend integration
- 🐳 Docker support for development and production
- 📝 TypeScript support
- 🧪 Testing setup included
- 📊 Database migrations with Prisma

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **pnpm** (v8 or higher) - [Installation guide](https://pnpm.io/installation)
- **Docker & Docker Compose** - [Get Docker](https://docs.docker.com/get-docker/)
- **Git** - [Install Git](https://git-scm.com/downloads)

## 🚀 Quick Start

### 1. Clone and Setup

```bash
# Clone the repository
git clone <repository-url>
cd nest-auth-template-backend

# Install dependencies
pnpm install
```

### 2. Environment Configuration

```bash
# Copy environment template
cp .env.example .env
```

**Configure your `.env` file:**

```env
# Application Settings
NODE_ENV=development
APPLICATION_PORT=4000
APPLICATION_URL=http://localhost:4000
ALLOWED_ORIGIN=http://localhost:3000

# Session & Security
COOKIES_SECRET=your-strong-cookies-secret-here
SESSION_SECRET=your-strong-session-secret-here
SESSION_NAME=session
SESSION_DOMAIN=localhost
SESSION_MAX_AGE=30d
SESSION_HTTP_ONLY=true
SESSION_SECURE=false
SESSION_FOLDER=sessions

# PostgreSQL Database
POSTGRES_USER=root
POSTGRES_PASSWORD=your-secure-password
POSTGRES_HOST=localhost
POSTGRES_PORT=5433
POSTGRES_DB=authorization
POSTGRES_URI=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}

# Redis Cache
REDIS_USER=default
REDIS_PASSWORD=your-redis-password
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_URI=redis://${REDIS_USER}:${REDIS_PASSWORD}@${REDIS_HOST}:${REDIS_PORT}
```

> ⚠️ **Security Note:** Always use strong, unique secrets in production environments.

### 3. Start Services

```bash
# Start PostgreSQL and Redis containers
docker-compose up -d

# Run database migrations
pnpm prisma migrate dev

# Generate Prisma client
pnpm prisma generate
```

### 4. Launch Application

```bash
# Development mode with hot reload
pnpm start:dev

# The application will be available at http://localhost:4000
```

## 📝 Environment Variables Reference

### Application Configuration

| Variable           | Description         | Default                 | Required |
| ------------------ | ------------------- | ----------------------- | -------- |
| `NODE_ENV`         | Environment mode    | `development`           | ✅       |
| `APPLICATION_PORT` | Backend server port | `4000`                  | ✅       |
| `APPLICATION_URL`  | Backend URL         | `http://localhost:4000` | ✅       |
| `ALLOWED_ORIGIN`   | Allowed CORS origin | `http://localhost:3000` | ✅       |

### Session & Security

| Variable            | Description               | Default     | Required |
| ------------------- | ------------------------- | ----------- | -------- |
| `COOKIES_SECRET`    | Cookie encryption secret  | -           | ✅       |
| `SESSION_SECRET`    | Session encryption secret | -           | ✅       |
| `SESSION_NAME`      | Session cookie name       | `session`   | ✅       |
| `SESSION_DOMAIN`    | Session cookie domain     | `localhost` | ✅       |
| `SESSION_MAX_AGE`   | Session expiration time   | `30d`       | ✅       |
| `SESSION_HTTP_ONLY` | HTTP-only cookie flag     | `true`      | ✅       |
| `SESSION_SECURE`    | Secure cookie flag        | `false`     | ✅       |
| `SESSION_FOLDER`    | Session storage folder    | `sessions`  | ✅       |

### Database Configuration

| Variable            | Description            | Default         | Required |
| ------------------- | ---------------------- | --------------- | -------- |
| `POSTGRES_USER`     | PostgreSQL username    | `root`          | ✅       |
| `POSTGRES_PASSWORD` | PostgreSQL password    | -               | ✅       |
| `POSTGRES_HOST`     | PostgreSQL host        | `localhost`     | ✅       |
| `POSTGRES_PORT`     | PostgreSQL port        | `5433`          | ✅       |
| `POSTGRES_DB`       | Database name          | `authorization` | ✅       |
| `POSTGRES_URI`      | Full connection string | -               | ✅       |

### Redis Configuration

| Variable         | Description            | Default     | Required |
| ---------------- | ---------------------- | ----------- | -------- |
| `REDIS_USER`     | Redis username         | `default`   | ✅       |
| `REDIS_PASSWORD` | Redis password         | -           | ✅       |
| `REDIS_HOST`     | Redis host             | `localhost` | ✅       |
| `REDIS_PORT`     | Redis port             | `6379`      | ✅       |
| `REDIS_URI`      | Full connection string | -           | ✅       |

## 🛠️ Available Scripts

| Command           | Description                              |
| ----------------- | ---------------------------------------- |
| `pnpm start:dev`  | Start development server with hot reload |
| `pnpm start:prod` | Start production server                  |
| `pnpm build`      | Build the application for production     |
| `pnpm test`       | Run tests                                |
| `pnpm lint`       | Run ESLint                               |
| `pnpm format`     | Format code with Prettier                |

## 🐳 Docker Deployment

### Development with Docker

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Production Deployment

```bash
# Build production image
docker build -t nest-auth-backend .

# Run with production compose
docker-compose -f docker-compose.prod.yml up -d

# Run database migrations
docker-compose exec app pnpm prisma migrate deploy
```

## 🔌 API Endpoints

### Authentication

| Method | Endpoint         | Description                        |
| ------ | ---------------- | ---------------------------------- |
| `POST` | `/auth/register` | Register new user (coming soon)    |
| `POST` | `/auth/login`    | Login user (coming soon)           |
| `POST` | `/auth/logout`   | Logout user (coming soon)          |
| `GET`  | `/auth/profile`  | Get user profile (coming soon)     |
| `GET`  | `/auth/session`  | Check session status (coming soon) |

### Health Check

| Method | Endpoint  | Description               |
| ------ | --------- | ------------------------- |
| `GET`  | `/health` | Application health status |

## 🔧 Troubleshooting

### Common Issues

**🔴 Database Connection Issues**

- Ensure PostgreSQL container is running: `docker-compose ps`
- Check database credentials in `.env`
- Verify port 5433 is not in use: `lsof -i :5433`

**🔴 Redis Connection Problems**

- Verify Redis container status: `docker-compose logs redis`
- Check Redis password configuration
- Test Redis connection: `redis-cli -h localhost -p 6379`

**🔴 Session/Cookie Issues**

- Verify `SESSION_*` variables are set correctly
- Check `SESSION_SECURE` setting (should be `false` for HTTP in development)
- Ensure frontend and backend domains match

**🔴 CORS Errors**

- Check `ALLOWED_ORIGIN` matches your frontend URL exactly
- Verify frontend is making requests to correct backend URL

**🔴 Migration Issues**

```bash
# Reset database and rerun migrations
pnpm prisma migrate reset
pnpm prisma migrate dev
pnpm prisma generate
```

### Debug Mode

```bash
# Start with debug logging
DEBUG=* pnpm start:dev

# Or with specific debug scope
DEBUG=nest:* pnpm start:dev
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Troubleshooting](#-troubleshooting) section
2. Search existing [Issues](../../issues)
3. Create a new [Issue](../../issues/new) with detailed information

---

**Happy coding! 🚀**
