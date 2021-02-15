import { RentalController } from "../controllers/rentalController";
import { CSVRentalRepository } from "../../infrastructure/CSVRentalRepository";

export class RentalContext {
    private readonly rentalController: RentalController

    constructor() {
        const rentalRepository = new CSVRentalRepository("./db/rentals.csv");
        this.rentalController = new RentalController(rentalRepository);
    }

    getRentalController(): RentalController {
        return this.rentalController;
    }
}
