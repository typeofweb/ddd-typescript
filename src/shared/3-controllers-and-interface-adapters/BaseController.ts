interface Request<T = unknown> {
  body: T;
}

export interface Response<T = unknown> {
  status: number;
  body: T;
}

class HTTPError extends Error {
  constructor(message?: string, public status: number = 500) {
    super(message);
    this.name = 'HTTPError';
  }
}

export type BaseController<ResponseType = unknown, RequestType = unknown> = (
  req: Request<RequestType>,
) => Promise<Response<ResponseType>>;

export function conflict(message?: string): never {
  throw new HTTPError(message, 409);
}

export function internal(message?: string): never {
  throw new HTTPError(message);
}

export function ok<T>(response: T): Response<T>;
export function ok(response: unknown | null): Response {
  return {
    status: 200,
    body: response,
  };
}
