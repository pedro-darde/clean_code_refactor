import { Coord } from "./Coord";

export class Zipcode {
    constructor(readonly code: string, readonly street: string, readonly neighborhood: string, readonly coord: Coord) {

    }
}