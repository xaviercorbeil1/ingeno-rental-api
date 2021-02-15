import { Request, Response } from "express";
import Rental from "../../domain/rental/rentals";
import RentalService from "../../domain/rental/RentalService";
import RentalFilterBuilder from "../../domain/rental/filter/RentalFilterBuilder";


export class RentalController {

    private readonly rentalService: RentalService;

    constructor(rentalRepository: RentalService) {
        this.rentalService = rentalRepository;
    }

    getRentals = (req: Request, res: Response): void => {
        const rentalFilterBuilder = new RentalFilterBuilder();
        const query = req.query;

        rentalFilterBuilder
            .withPostalCode(query.postalcode && query.postalcode.toString())
            .withMinBed(query.min_nb_beds && Number(query.min_nb_beds))
            .withMinPrice(query.min_price && Number(query.min_price))
            .withMaxPrice(query.min_price && Number(query.max_price));

        const rentals: Rental[] = this.rentalService.getRentalsFiltered(rentalFilterBuilder);
        res.send(rentals);
    }

    getRentalById = (req: Request, res: Response): void => {
        const id: string = req.params.id;
        const rental: Rental = this.rentalService.getRental(id);
        if(rental) {
            res.send(rental);
        } else {
            res.status(404).send("Rental not found");
        }
    };
}

