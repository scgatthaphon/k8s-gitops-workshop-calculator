import { Controller, Get, ParseIntPipe, Param } from '@nestjs/common';
import { CalculatorService } from './calculator.service';
import { GrpcMethod } from '@nestjs/microservices';
import { calculator } from 'src/api/v1/rpc';
import { ApiOkResponse, ApiParam } from '@nestjs/swagger';

@Controller('calculator')
export class CalculatorController {
  constructor(private readonly calculatorService: CalculatorService) {}

  @Get('fibo/:order')
  @ApiParam({ name: 'order', type: Number, example: 1 })
  @ApiOkResponse({ type: Number })
  getFibonacci(@Param('order', ParseIntPipe) order: number): number {
    return this.calculatorService.fibonacci(order);
  }

  @Get('fibo/faster/:order')
  @ApiParam({ name: 'order', type: Number, example: 1 })
  @ApiOkResponse({ type: Number })
  getFibonacciFaster(@Param('order', ParseIntPipe) order: number): number {
    return this.calculatorService.fibonacciFaster(order);
  }

  @Get('fibo/fastest/:order')
  @ApiParam({ name: 'order', type: Number, example: 1 })
  @ApiOkResponse({ type: Number })
  getFibonacciFastest(@Param('order', ParseIntPipe) order: number): number {
    return this.calculatorService.fibonacciFastest(order);
  }

  @GrpcMethod('CalculatorService', 'Fibonacci')
  rpcFibonacci(data: calculator.FibonacciReq): calculator.IFibonacciRes {
    return {
      number: this.calculatorService.fibonacci(data.order),
    };
  }

  @GrpcMethod('CalculatorService', 'FibonacciFaster')
  rpcFibonacciFaster(data: calculator.FibonacciReq): calculator.IFibonacciRes {
    return {
      number: this.calculatorService.fibonacciFaster(data.order),
    };
  }

  @GrpcMethod('CalculatorService', 'FibonacciFastest')
  rpcFibonacciFastest(data: calculator.FibonacciReq): calculator.IFibonacciRes {
    return {
      number: this.calculatorService.fibonacciFastest(data.order),
    };
  }
}
