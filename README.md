# AetherOps Admin

**Version 0.4**

Automated VPS management platform powered by AI. Perfect for startups and digital entrepreneurs who need to manage their Linux Ubuntu environments without a dedicated system administrator.

## 🚀 Features

- **AI-Based Administration & Monitoring**: 24/7 autonomous management and scaling
- **Proactive Diagnosis & Improvement**: Self-healing infrastructure with root cause analysis
- **Chat & Voice Deployment**: Deploy applications using natural language commands
- **Autonomous Security**: Enterprise-grade protection with automatic patching and threat blocking

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Express.js, Node.js
- **Build Tool**: Vite
- **Deployment**: Docker, Nginx

## 📋 Prerequisites

- Node.js 20+
- Docker & Docker Compose
- Nginx (for production)

## 🏃 Quick Start

### Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

The application will be available at `http://localhost:5001`

### Production (Docker)

```bash
# Build and run with Docker Compose
docker compose up -d --build
```

## 🌐 Deployment

### Strategy: Prebuilt Docker Deployment

Due to build tool compatibility issues in some environments, we use a "prebuilt" strategy where the application is built locally and artifacts are copied into the Docker container.

### Deployment Steps

1. **Build Locally**
   ```bash
   npm install
   npm run build
   ```

2. **Package Artifacts**
   ```bash
   tar -czf deploy.tar.gz dist package.json package-lock.json Dockerfile docker-compose.yml
   ```

3. **Upload to Server**
   ```bash
   scp deploy.tar.gz user@server:/tmp/
   ```

4. **Deploy on Server**
   ```bash
   # Prepare directory
   sudo mkdir -p /opt/docker-aetherops
   sudo chown -R $USER:$USER /opt/docker-aetherops
   cd /opt/docker-aetherops

   # Extract
   tar -xzf /tmp/deploy.tar.gz

   # Start with Docker Compose
   docker compose up -d --build
   ```

### Nginx Configuration

Create `/etc/nginx/sites-available/aetherops.labshub.cc`:

```nginx
server {
    listen 80;
    server_name aetherops.labshub.cc;

    location / {
        proxy_pass http://127.0.0.1:5001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 📁 Project Structure

```
├── client/              # React frontend
│   ├── src/
│   │   ├── components/  # UI components
│   │   ├── lib/         # i18n and utilities
│   │   └── assets/      # Images and static files
├── server/              # Express backend
├── dist/                # Compiled assets (production)
├── Dockerfile           # Docker configuration
├── docker-compose.yml   # Docker Compose setup
└── package.json         # Dependencies and scripts
```

## 🌍 Internationalization

Supports multiple languages:
- English (en)
- Spanish (es)
- Portuguese (pt)
- French (fr)

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run check` - Type checking

## 🔒 Environment Variables

- `NODE_ENV` - Environment mode (development/production)
- `PORT` - Server port (default: 5001)

## 📝 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For support or questions, please visit [AetherOps.labshub.cc](https://AetherOps.labshub.cc)
