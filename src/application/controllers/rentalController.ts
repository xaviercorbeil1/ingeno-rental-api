import { Request, Response } from "express";
import { RentalRepository } from "../repository/RentalRepository";
import Rental from "../models/rentals";


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
    };

}

