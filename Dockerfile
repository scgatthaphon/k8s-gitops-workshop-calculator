FROM node:10 as builder
WORKDIR /app

# Install dependencies
COPY ./package.json ./yarn.lock ./
RUN yarn install

# Build
COPY ./tsconfig.json ./tsconfig.build.json ./
COPY ./src ./src
RUN yarn run build

RUN yarn install --production --offline

FROM node:10-alpine
WORKDIR /app

# Install grpc_health_probe
RUN GRPC_HEALTH_PROBE_VERSION=v0.3.1 && \
    wget -qO/bin/grpc_health_probe https://github.com/grpc-ecosystem/grpc-health-probe/releases/download/${GRPC_HEALTH_PROBE_VERSION}/grpc_health_probe-linux-amd64 && \
    chmod +x /bin/grpc_health_probe

COPY --from=builder /app/package.json /app/yarn.lock ./
COPY --from=builder /app/node_modules ./node_modules
RUN yarn --cwd node_modules/grpc run install

COPY ./api ./api
COPY --from=builder /app/dist ./dist

CMD yarn run start:prod

