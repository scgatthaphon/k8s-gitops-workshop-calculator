import { Injectable } from '@nestjs/common';

@Injectable()
export class CalculatorService {
  public fibonacci(order: number): number {
    if (order <= 1) return 1;

    return this.fibonacci(order - 1) + this.fibonacci(order - 2);
  }

  public fibonacciFaster(order: number): number {
    return this._fibonacciFaster(order, {});
  }

  private _fibonacciFaster(
    order: number,
    cache: { [order: number]: number },
  ): number {
    cache = cache || {};

    if (cache[order]) return cache[order];
    if (order <= 1) return 1;

    return (cache[order] =
      this._fibonacciFaster(order - 1, cache) +
      this._fibonacciFaster(order - 2, cache));
  }

  public fibonacciFastest(order: number): number {
    let a = 1;
    let b = 0;
    let temp = 0;

    while (order >= 0) {
      temp = a;
      a = a + b;
      b = temp;
      order--;
    }

    return b;
  }
}
