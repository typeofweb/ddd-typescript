const eitherBrand = Symbol();

export type Either<L, R> = Left<L, R> | Right<L, R>;

type Left<L, R> = { readonly [eitherBrand]: "left"; readonly value: L };
type Right<L, R> = { readonly [eitherBrand]: "right"; readonly value: R };

export const makeLeft = <L, R>(l: L): Either<L, R> => {
  return { [eitherBrand]: "left", value: l };
};

export const makeRight = <L, R>(r: R): Either<L, R> => {
  return { [eitherBrand]: "right", value: r };
};

export function isLeft<L, R>(value: Either<L, R>): value is Left<L, R> {
  return value[eitherBrand] === "left";
}

export function isRight<L, R>(value: Either<L, R>): value is Right<L, R> {
  return value[eitherBrand] === "right";
}

// @todo update types
// export function combine(value: Array<Either<Error, any>>): Either<Error, any> {
//   return value.reduce((acc, val) => {
//     if (isLeft(acc)) {
//       return acc;
//     }
//     return val;
//   }, makeRight<any, any>(null))
// }
