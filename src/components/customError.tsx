export class EndTimeOutOfBoundsError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "EndTimeOutOfBoundsError";
    }
}