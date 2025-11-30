FROM node:20-alpine

WORKDIR /app

# Copy prebuilt application
COPY dist ./dist
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Expose the port
EXPOSE 5001

# Set environment variables
ENV NODE_ENV=production
ENV PORT=5001

# Start the application
CMD ["node", "dist/index.cjs"]
