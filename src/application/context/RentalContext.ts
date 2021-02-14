import { RentalController } from "../controllers/rentalController";
import { CSVRentalRepository } from "../../infrastructure/CSVRentalRepository";

export class RentalContext {
    private readonly rentalController: RentalController

    constructor() {
        console.log("1");
        const rentalRepository = new CSVRentalRepository();
        this.rentalController = new RentalController(rentalRepository);
    }

    getRentalController(): RentalController {
        return this.rentalController;
    }
}
