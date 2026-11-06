# Node 22 LTS (Node 20 is end-of-life since April 2026)
FROM node:22-alpine

WORKDIR /app

# Apply latest Alpine security patches
RUN apk upgrade --no-cache

# Copy prebuilt application
COPY --chown=node:node dist ./dist
COPY --chown=node:node package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev && npm cache clean --force

ENV NODE_ENV=production
ENV PORT=5001

EXPOSE 5001

# Run as unprivileged user
USER node

CMD ["node", "dist/index.cjs"]
