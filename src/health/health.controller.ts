import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  GRPCHealthIndicator,
} from '@nestjs/terminus';
import { GrpcMethod } from '@nestjs/microservices';
import { grpc } from 'src/api/v1/rpc';
import health = grpc.health.v1;

@Controller('health')
export class HealthController {
  constructor(private readonly health: HealthCheckService) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([]);
  }

  @GrpcMethod('Health', 'Check')
  rpcCheck(_req: health.IHealthCheckRequest): health.IHealthCheckResponse {
    return {
      status: health.HealthCheckResponse.ServingStatus.SERVING,
    };
  }
}
