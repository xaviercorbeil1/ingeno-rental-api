import {Request, Response} from "express";
import Rental from "../../domain/rental/Rentals";
import RentalService from "../../domain/rental/RentalService";
import RentalFilterDto from "../../domain/rental/RentalFilterDto";

export class RentalController {
    private readonly rentalService: RentalService;

    constructor(rentalRepository: RentalService) {
        this.rentalService = rentalRepository;
    }

    getRentals = (req: Request, res: Response): void => {
        const query = req.query;

        const rentalFilterDto: RentalFilterDto = {
            postalCode: query.postalcode && query.postalcode.toString(),
            nbBed: query.min_nb_beds && Number(query.min_nb_beds),
            minPrice: query.min_price && Number(query.min_price),
            maxPrice: query.max_price && Number(query.max_price)
        };

        const rentals: Rental[] = this.rentalService.getRentalsFiltered(rentalFilterDto);
        res.send(rentals);
    };

    getRentalById = (req: Request, res: Response): void => {
        const id: string = req.params.id;
        const rental: Rental = this.rentalService.getRental(id);

        if (rental) {
            res.send(rental);
        } else {
            res.status(404).send("Rental not found");
        }
    };
}

