import RentalRepository from "../domain/rental/RentalRepository";
import fs from "fs";
import csv from "csv-parser";
import Rental from "../domain/rental/Rentals";
import RentalFilterDto from "../domain/rental/RentalFilterDto";
import RentalFilterPredicateFactory from "../domain/rental/filter/RentalFilterPredicateFactory";

export class CSVRentalRepository implements RentalRepository {

    private rentals: Map<string, Rental> = new Map();
    private path: string;
    private rentalFilterBuilder: RentalFilterPredicateFactory;

    constructor(path: string,rentalFilterBuilder :RentalFilterPredicateFactory) {
        this.path = path;
        this.rentalFilterBuilder = rentalFilterBuilder;
    }

    async initDatabase(): Promise<void> {
        return new Promise(((resolve) => {
            fs.createReadStream(this.path)
                .on("error", () => {
                    throw new Error("Can't load database");
                })
                .pipe(csv())
                .on("data", (row) => {
                    const rental: Rental = {
                        id: row.id,
                        city: row.city,
                        postalCode: row.postalcode,
                        price: row.price,
                        nbBed: row.nb_beds,
                        nbBath: row.nb_baths,
                        owner: row.owner,
                        rating: row.rating,
                        description: row.description
                    };
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

    getRentalsFiltered(rentalFilterDto: RentalFilterDto): Rental[] {
        const predicate = this.rentalFilterBuilder.create(rentalFilterDto.nbBed,
            rentalFilterDto.postalCode,
            rentalFilterDto.minPrice,
            rentalFilterDto.maxPrice);

        return this.getRentals().filter(predicate);
    }

    getRental(id: string): Rental {
        return this.rentals.get(id);
    }
}
