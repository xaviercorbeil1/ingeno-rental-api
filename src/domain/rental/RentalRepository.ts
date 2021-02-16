import Rental from "./Rentals";

export default interface RentalRepository  {
    getRentals(): Rental[];

    getRentalsFiltered(predicate: (rental: Rental) => boolean): Rental[];

    getRental(id: string): Rental;
}
