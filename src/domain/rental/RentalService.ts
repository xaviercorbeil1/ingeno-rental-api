import {RentalRepository} from "./RentalRepository";
import Rental from "./Rentals";
import RentalFilterBuilder from "./filter/RentalFilterBuilder";


export default class RentalService {
    private rentalRepository: RentalRepository;

    constructor(rentalRepository: RentalRepository) {
        this.rentalRepository = rentalRepository;
    }

    getRentalsFiltered(rentalFilterBuilder: RentalFilterBuilder): Rental[] {
        const predicate = rentalFilterBuilder.build();
        return this.rentalRepository.getRentalsFiltered(predicate);
    }

    getRental(id:string):Rental {
        return this.rentalRepository.getRental(id);
    }
}
