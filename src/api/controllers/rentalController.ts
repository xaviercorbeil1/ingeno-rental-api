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
        if(query.min_nb_beds) {
            rentalFilterBuilder.withMinBed(Number(query.min_nb_beds.toString()));
        }
        if(query.postalcode) {
            rentalFilterBuilder.withPostalCode(query.postalcode.toString());
        }
        if(query.min_price) {
            rentalFilterBuilder.withMinPrice(Number(query.min_price.toString()));
        }
        if(query.max_price) {
            rentalFilterBuilder.withMaxPrice(Number(query.max_price));
        }

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

