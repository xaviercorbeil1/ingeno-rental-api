import { RentalRepository } from "../application/repository/RentalRepository";
import fs from "fs";
import csv from "csv-parser";
import Rental from "../application/models/rentals";

export class CSVRentalRepository implements RentalRepository {

    private rentals: Map<string, Rental> = new Map()

    constructor() {
        fs.createReadStream("./src/infrastructure/rentals.csv")
            .pipe(csv())
            .on("data", (row) => {
                const rental: Rental = { id: row.id, city: row.city, postalCode: row.postalCode, price: row.price, nbBed: row.nb_beds, nbBath: row.nb_baths, owner: row.owner, rating: row.rating, description: row.description }
                this.rentals.set(rental.id, rental);
            })
            .on("end", () => {
                console.log("CSV done");
            });
    }

    getRentals(): Rental[] {
        return [...this.rentals.values()];
    }
}