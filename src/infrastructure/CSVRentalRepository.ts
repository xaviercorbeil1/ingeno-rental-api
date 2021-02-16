import RentalRepository from "../domain/rental/RentalRepository";
import fs from "fs";
import csv from "csv-parser";
import Rental from "../domain/rental/Rentals";

export class CSVRentalRepository implements RentalRepository {

    private rentals: Map<string, Rental> = new Map();
    private path: string;

    constructor(path : string) {
        this.path = path;
    }

    async initDatabase(): Promise<void> {
        return new Promise(((resolve) => {
            fs.createReadStream(this.path)
                .on("error", () => {
                    throw new Error("Can't load database");
                })
                .pipe(csv())
                .on("data", (row) => {
                    const rental: Rental = { id: row.id, city: row.city, postalCode: row.postalcode, price: row.price, nbBed: row.nb_beds, nbBath: row.nb_baths, owner: row.owner, rating: row.rating, description: row.description }
                    this.rentals.set(rental.id, rental);
                })
                .on("end", () => {
                    resolve();
                });
        }));
    }

    getRentals(): Rental[] {
        return [...this.rentals.values()];
    }

    getRentalsFiltered(predicate: (rental: Rental) => boolean): Rental[] {
        return [...this.rentals.values()].filter(predicate);
    }

    getRental(id: string): Rental {
        return this.rentals.get(id);
    }
}
