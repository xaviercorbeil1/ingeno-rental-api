import Rental from "../rentals";

export default class RentalFilterBuilder {
    private minBed : number
    private postalCodeFilter: string
    private minPrice: number
    private maxPrice: number


    build() :(rental: Rental) => boolean {
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
        if(this.postalCodeFilter && this.postalCodeFilter.length == 6) {
            for (let i = 0; i < 6; i++ ) {
                const character = this.postalCodeFilter[i];
                if (character != "_" && character != postalCode[i]) {
                    return true;
                }
            }
        }
        return false;
    }

    withMinBed(nb: number): RentalFilterBuilder {
        this.minBed = nb;
        return this;
    }

    withPostalCode(postalCode: string): RentalFilterBuilder {
        this.postalCodeFilter = postalCode;
        return this;
    }

    withMinPrice(minPrice: number): RentalFilterBuilder {
        this.minPrice = minPrice;
        return this;
    }

    withMaxPrice(maxPrice: number): RentalFilterBuilder {
        this.maxPrice = maxPrice;
        return this;
    }
}
