import Rental from "./Rentals";
import RentalFilterDto from "./RentalFilterDto";

interface RentalRepository  {
    getRentals(): Rental[];

    getRentalsFiltered(rentalFilterDto: RentalFilterDto): Rental[];

    getRental(id: string): Rental;
}

export default RentalRepository;
