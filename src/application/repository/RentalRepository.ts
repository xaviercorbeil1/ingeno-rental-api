import Rental from "../models/rentals";

export interface RentalRepository  {
    getRentals(): Rental[];
}