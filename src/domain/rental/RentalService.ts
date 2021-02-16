import {RentalRepository} from "./RentalRepository";
import Rental from "./Rentals";
import RentalFilterBuilder from "./filter/RentalFilterBuilder";


export default class RentalService {
    private rentalRepository: RentalRepository;

    constructor(rentalRepository: RentalRepository) {
        this.rentalRepository = rentalRepository;
    }

    getRentalsFiltered(filterBuilder: RentalFilterBuilder): Rental[] {
        return this.rentalRepository.getRentalsFiltered(filterBuilder.build());
    }

    getRental(id:string):Rental {
        return this.rentalRepository.getRental(id);
    }
}
