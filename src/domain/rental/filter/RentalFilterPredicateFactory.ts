import Rental from "../Rentals";

export default class RentalFilterPredicateFactory {
    private minBed : number
    private postalCode: string
    private minPrice: number
    private maxPrice: number

    create(minBed: number, postalCode: string, minPrice: number, maxPrice: number): (rental: Rental) => boolean {
        this.minBed = minBed;
        this.postalCode = postalCode;
        this.minPrice = minPrice;
        this.maxPrice = maxPrice;

        return this.buildPredicate();
    }

    private buildPredicate() :(rental: Rental) => boolean {
        return  (rental: Rental): boolean => {
            const conditions = [this.isMinBedRentalInvalid,
            this.isMinPriceRentalInvalid,
            this.isMaxPriceRentalInvalid,
            this.isPostalCodeRentalInvalid];

            return conditions.every(x => !x(rental));
        };
    }

    private isMinBedRentalInvalid = (rental: Rental) => {
        return this.minBed && rental.nbBed < this.minBed;
    }

    private isMinPriceRentalInvalid = (rental:Rental) => {
        return this.minPrice && rental.price < this.minPrice;
    }

    private isMaxPriceRentalInvalid = (rental:Rental) => {
        return this.maxPrice && rental.price > this.maxPrice;
    }

    private isPostalCodeRentalInvalid = (rental:Rental): boolean => {
        const postalCode = rental.postalCode;
        if(this.postalCode && this.postalCode.length == 6) {
            for (let i = 0; i < 6; i++ ) {
                const character = this.postalCode[i];
                if (character != "_" && character != postalCode[i]) {
                    return true;
                }
            }
        }
        return false;
    }
}
