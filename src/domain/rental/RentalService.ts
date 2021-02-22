import RentalRepository from "./RentalRepository";
import Rental from "./Rentals";
import RentalFilterPredicateFactory from "./filter/RentalFilterPredicateFactory";
import RentalFilterDto from "./RentalFilterDto";


export default class RentalService {
    private rentalRepository: RentalRepository;

    constructor(rentalRepository: RentalRepository) {
        this.rentalRepository = rentalRepository;
    }

    getRentalsFiltered(rentalFilterDTO: RentalFilterDto): Rental[] {

        return this.rentalRepository.getRentalsFiltered(rentalFilterDTO);
    }

    getRental(id:string):Rental {
        return this.rentalRepository.getRental(id);
    }
}
