import RentalFilterPredicateFactory from "../../../../../src/domain/rental/filter/RentalFilterPredicateFactory";
import Rental from "../../../../../src/domain/rental/Rentals";
import RentalFilterDto from "../../../../../src/domain/rental/RentalFilterDto";

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
    let rentalFilterPredicateFactory: RentalFilterPredicateFactory;

    beforeEach(() => {
        rentalFilterPredicateFactory = new RentalFilterPredicateFactory();
    });

    describe("with min bed", () => {
        it("when valid should BeTruthy ", function () {
            const predicate = rentalFilterPredicateFactory.create(nbBed, undefined, undefined, undefined);

            const isValid = predicate(rental);
            expect(isValid).toBeTruthy();
        });

        it("when invalide should BeFalsy", function () {
            const predicate = rentalFilterPredicateFactory.create(nbBed + 1, undefined, undefined, undefined);

            const isValid = predicate(rental);
            expect(isValid).toBeFalsy();
        });
    });

    describe("with min price", () => {
        it("when valid should BeTruthy ", function () {
            const predicate = rentalFilterPredicateFactory.create(undefined, undefined, price, undefined);

            const isValid = predicate(rental);
            expect(isValid).toBeTruthy();
        });

        it("when invalide should BeFalsy", function () {
            const predicate = rentalFilterPredicateFactory.create(undefined, undefined, price + 1, undefined);

            const isValid = predicate(rental);
            expect(isValid).toBeFalsy();
        });
    });

    describe("with max price", () => {
        it("when valid should BeTruthy ", function () {
            const predicate = rentalFilterPredicateFactory.create(undefined, undefined, undefined, price);

            const isValid = predicate(rental);
            expect(isValid).toBeTruthy();
        });

        it("when invalide should BeFalsy", function () {
            const predicate = rentalFilterPredicateFactory.create(undefined, undefined, undefined, price - 1);

            const isValid = predicate(rental);
            expect(isValid).toBeFalsy();
        });
    });

    describe("with postal code", () => {
        it("when valid should BeTruthy ", function () {
            const postalCodeValidFilter = "G3__G4";
            const predicate = rentalFilterPredicateFactory.create(undefined, postalCodeValidFilter, undefined, undefined);

            const isValid = predicate(rental);
            expect(isValid).toBeTruthy();
        });

        it("when invalide should BeFalsy", function () {
            const postalCodeInvalidFilter = "G4__G4";
            const predicate = rentalFilterPredicateFactory.create(undefined, postalCodeInvalidFilter, undefined, undefined);

            const isValid = predicate(rental);
            expect(isValid).toBeFalsy();
        });
    });
});
