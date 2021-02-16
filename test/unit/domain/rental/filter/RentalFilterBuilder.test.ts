import RentalFilterBuilder from "../../../../../src/domain/rental/filter/RentalFilterBuilder";
import Rental from "../../../../../src/domain/rental/Rentals";

describe("RentalFilterBuilder tests", () => {
    const nbBed = 2;
    const price = 57;
    const nbBath = 1;
    const postalCode = "G3A0G4";
    const rental: Rental = {
        postalCode: postalCode, city: "montreal",
        description: "a very cool description",
        price, owner: "Harry Potter",
        nbBed, rating: 4,
        nbBath, id: "1234"
    };
    let rentalFilterBuilder: RentalFilterBuilder;

    beforeEach(() => {
        rentalFilterBuilder = new RentalFilterBuilder();
    });

    describe("with min bed", () => {
        it("when valid should BeTruthy ", function () {
            rentalFilterBuilder.withMinBed(nbBed);

            const isValid = rentalFilterBuilder.build()(rental);

            expect(isValid).toBeTruthy();
        });

        it("when invalide should BeFalsy", function () {
            rentalFilterBuilder.withMinBed(nbBed + 1);

            const isValid = rentalFilterBuilder.build()(rental);

            expect(isValid).toBeFalsy();
        });
    });

    describe("with min price", () => {
        it("when valid should BeTruthy ", function () {
            rentalFilterBuilder.withMinPrice(price);

            const isValid = rentalFilterBuilder.build()(rental);

            expect(isValid).toBeTruthy();
        });

        it("when invalide should BeFalsy", function () {
            rentalFilterBuilder.withMinPrice(price + 1);

            const isValid = rentalFilterBuilder.build()(rental);

            expect(isValid).toBeFalsy();
        });
    });

    describe("with max price", () => {
        it("when valid should BeTruthy ", function () {
            rentalFilterBuilder.withMaxPrice(price);

            const isValid = rentalFilterBuilder.build()(rental);

            expect(isValid).toBeTruthy();
        });

        it("when invalide should BeFalsy", function () {
            rentalFilterBuilder.withMaxPrice(price - 1);

            const isValid = rentalFilterBuilder.build()(rental);

            expect(isValid).toBeFalsy();
        });
    });

    describe("with postal code", () => {
        it("when valid should BeTruthy ", function () {
            const postalCodeValidFilter = "G3__G4";
            rentalFilterBuilder.withPostalCode(postalCodeValidFilter);

            const isValid = rentalFilterBuilder.build()(rental);

            expect(isValid).toBeTruthy();
        });

        it("when invalide should BeFalsy", function () {
            const postalCodeInvalidFilter = "G4__G4";
            rentalFilterBuilder.withPostalCode(postalCodeInvalidFilter);

            const isValid = rentalFilterBuilder.build()(rental);

            expect(isValid).toBeFalsy();
        });
    });
});
