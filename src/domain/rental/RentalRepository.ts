import Rental from "./Rentals";

export interface RentalRepository  {
    getRentals(): Rental[];

    getRentalsFiltered(predicate: (rental: Rental) => boolean): Rental[];

    getRental(id: string): Rental;
}
