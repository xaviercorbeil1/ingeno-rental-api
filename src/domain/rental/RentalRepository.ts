import Rental from "./Rentals";

interface RentalRepository  {
    getRentals(): Rental[];

    getRentalsFiltered(predicate: (rental: Rental) => boolean): Rental[];

    getRental(id: string): Rental;
}

export default RentalRepository;
