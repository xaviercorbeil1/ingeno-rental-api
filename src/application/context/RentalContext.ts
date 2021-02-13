import { RentalController } from "../controllers/rentalController"

export class RentalContext {
    rentalController: RentalController

    constructor() {
        const rentalRepository = new CSVRentalRepository();
        this.rentalController = new RentalController(rentalRepository);
    }

    getRentalController(): RentalController {
        return this.rentalController;
    }
}