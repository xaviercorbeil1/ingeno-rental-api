import { Request, Response } from "express";
import { RentalRepository } from "../repository/RentalRepository";


export class RentalController {

    private rentalRepository: RentalRepository;

    constructor(rentalRepository: RentalRepository) {
        this.rentalRepository = rentalRepository;
    }

    getRentals(req: Request, res: Response): void {
        res.send("Express + TypeScript Server");
    }

    getRentalById = (req: Request, res: Response): void => {
        const id: string = req.params.id;
    };

}

