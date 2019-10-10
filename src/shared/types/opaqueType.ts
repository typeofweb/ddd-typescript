declare const $brand: unique symbol;

export function branded<T, Brand extends string>() {
  return class Type {
    // tslint:disable-next-line
    // @ts-ignore
    private value!: Type;
    // tslint:disable-next-line
    // @ts-ignore
    private [$brand]: Brand;
    static toBranded<Cls extends typeof Type>(this: Cls, t: T) {
      return (t as unknown) as InstanceType<Cls>;
    }
    static fromBranded<Cls extends typeof Type>(this: Cls, b: InstanceType<Cls>) {
      return (b as unknown) as T;
    }
    static Type: Type;
  };
}
