import { Zipcode } from "../entity/Zipocode"

export interface ZipcodeRepository {
    save(zipcode: Zipcode): Promise<void>
    getByCode(code: string): Promise<Zipcode>
}