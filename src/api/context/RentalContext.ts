import { RentalController } from "../controllers/RentalController";
import { CSVRentalRepository } from "../../infrastructure/CSVRentalRepository";
import RentalService from "../../domain/rental/RentalService";
import RentalFilterPredicateFactory from "../../domain/rental/filter/RentalFilterPredicateFactory";

export class RentalContext {
    async getRentalController(): Promise<RentalController> {
        const rentalRepository = new CSVRentalRepository("./db/rentals.csv", new RentalFilterPredicateFactory());
        await rentalRepository.initDatabase();
        const rentalService = new RentalService(rentalRepository);
        return new RentalController(rentalService);
    }
}
