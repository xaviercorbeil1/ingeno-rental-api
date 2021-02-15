import Rental from "../rentals";

export default class RentalFilterBuilder {
    private minBed : number
    private postalCodeFilter: string
    private minPrice: number
    private maxPrice: number


    build() :(rental: Rental) => boolean {
        return  (rental: Rental): boolean => {
            if(this.minBed && this.minBed >= rental.nbBed) {
                return false;
            } else if(this.minPrice && this.minPrice >= rental.price) {
                return false;
            } else if(this.maxPrice && this.maxPrice < rental.price) {
                return false;
            } else if (!this.isPostalCodeValid(rental.postalCode)){
                return false;
            }
            return true;
        };
    }

    private isPostalCodeValid(postalCode:string): boolean {
        if(this.postalCodeFilter && this.postalCodeFilter.length == 6) {
            for (let i = 0; i < 6; i++ ) {
                const character = this.postalCodeFilter[i];
                if (character != "_" && character != postalCode[i]) {
                    return false;
                }
            }
        }
        return true;
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
