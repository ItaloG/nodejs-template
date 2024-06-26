// TODO: We should seek better alternatives in the future, but for now, it's not a problem.
/* eslint-disable @typescript-eslint/no-explicit-any */
type Callback<Type> = (value: Type) => any;

class Pipeline<Type> {
  constructor(private data: Type) {}
  pipe(callback: Callback<Type>) {
    this.data = callback(this.data);
    return this;
  }
  get() {
    return this.data;
  }
}

export const transform = <Param>(value: Param) => new Pipeline(value);
