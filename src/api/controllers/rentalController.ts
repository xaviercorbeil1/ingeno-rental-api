import { Request, Response } from "express";
import {RentalRepository} from "../../domain/rental/RentalRepository";
import Rental from "../../domain/rental/rentals";


export class RentalController {

    private readonly rentalRepository: RentalRepository;

    constructor(rentalRepository: RentalRepository) {
        this.rentalRepository = rentalRepository;
    }

    getRentals = (req: Request, res: Response): void => {
        const rentals: Rental[] = this.rentalRepository.getRentals();
        res.send(rentals);
    }

    getRentalById = (req: Request, res: Response): void => {
        const id: string = req.params.id;
        const rental: Rental = this.rentalRepository.getRental(id);
        if(rental) {
            res.send(rental);
        } else {
            res.status(404).send("Rental not found");
        }

    };

}

