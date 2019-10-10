declare const $brand: unique symbol;

export function branded<T, Brand extends string>() {
  return class Type {
    private value!: Type;
    private [$brand]: Brand;
    static toBranded<Cls extends typeof Type>(this: Cls, t: T) {
      return (t as unknown) as InstanceType<Cls>;
    }
    static fromBranded<Cls extends typeof Type>(
      this: Cls,
      b: InstanceType<Cls>
    ) {
      return (b as unknown) as T;
    }
    static Type: Type;
  };
}
