import Rental from "./rentals";

export interface RentalRepository  {
    getRentals(): Rental[];

    getRental(id: string): Rental;
}
