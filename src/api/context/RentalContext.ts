import { RentalController } from "../controllers/RentalController";
import { CSVRentalRepository } from "../../infrastructure/CSVRentalRepository";
import RentalService from "../../domain/rental/RentalService";

export class RentalContext {
    async getRentalController(): Promise<RentalController> {
        const rentalRepository = new CSVRentalRepository("./db/rentals.csv");
        await rentalRepository.initDatabase();
        const rentalService = new RentalService(rentalRepository);
        return new RentalController(rentalService);
    }
}
