interface Request {
  body: any
}

export type BaseController = (req: Request) => Promise<any>;


export function conflict(message?: string) {

}

export function internal(message?: string) {

}

export function ok(response: any | null) {

}
