import { ProposalHttpResponse } from '../types/proposal.http-response';

interface IVectorCacheStore<Vector, Value> {
  put(vector: Vector, value: Value): void;
  get(vector: Vector): Value;
  has(vector: Vector): boolean;
}

export class LoanNetworkCacheStore
  implements
    IVectorCacheStore<[amount: number, term: number], ProposalHttpResponse>
{
  readonly limit;
  private store: { [vectorKey: string]: ProposalHttpResponse };
  private recordsQueue: string[] = [];

  constructor(numberOfResponsesLimit: number) {
    this.limit = numberOfResponsesLimit;
    this.store = {};
  }

  put(
    vector: [amount: number, term: number],
    value: ProposalHttpResponse,
  ): void {
    const vectorKey = `${vector[0]}-${vector[1]}`;

    // Use queue to clear old records from cache.
    if (this.recordsQueue.unshift(vectorKey) > this.limit) {
      const vectorKeyToClear = this.recordsQueue.pop() as string;
      delete this.store[vectorKeyToClear];
    }

    this.store[vectorKey] = value;
  }

  get(vector: [amount: number, term: number]): ProposalHttpResponse {
    return this.store[`${vector[0]}-${vector[1]}`];
  }

  has(vector: [amount: number, term: number]): boolean {
    return this.store.hasOwnProperty(`${vector[0]}-${vector[1]}`);
  }
}
