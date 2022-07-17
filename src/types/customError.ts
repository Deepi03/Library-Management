export class CustomError extends Error {
    constructor(
        readonly status: string,
        readonly message: string
    ) {
        super()
    }
}