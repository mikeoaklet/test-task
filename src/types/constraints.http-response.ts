export interface ConstraintsHttpResponse {
  amountInterval: {
    min: number;
    max: number;
    step: number;
    defaultValue: number;
  };

  termInterval: {
    min: number;
    max: number;
    step: number;
    defaultValue: number;
  };
}
