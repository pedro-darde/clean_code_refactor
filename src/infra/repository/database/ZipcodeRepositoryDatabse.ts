import { Coord } from "../../../domain/entity/Coord";
import { Zipcode } from "../../../domain/entity/Zipocode";
import { ZipcodeRepository } from "../../../domain/repository/ZipcodeRepository";
import Connection from "../../database/Connection";

export class ZipcodeRepositoryDatabase implements ZipcodeRepository {
    constructor(readonly connection: Connection) { }
    save(zipcode: Zipcode): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async getByCode(code: string): Promise<Zipcode> {
        const [zipcodeData] = await this.connection.query('SELECT * FROM public.zipcode WHERE code = $1', [code])

        return new Zipcode(zipcodeData.code, zipcodeData.stret, zipcodeData.neighborhood, new Coord(zipcodeData.lat, zipcodeData.long))
    }

}