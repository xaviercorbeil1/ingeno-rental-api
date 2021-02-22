import {CSVRentalRepository} from "../../../src/infrastructure/CSVRentalRepository";
import Rental from "../../../src/domain/rental/Rentals";
import {instance, mock, verify, when} from "ts-mockito";
import RentalFilterPredicateFactory from "../../../src/domain/rental/filter/RentalFilterPredicateFactory";
import RentalFilterDto from "../../../src/domain/rental/RentalFilterDto";


describe("CSVRentalRepository tests", () => {
    let csvRentalRepository: CSVRentalRepository;
    let rentalFilterPredicateFactory: RentalFilterPredicateFactory;
    beforeEach(async () => {
        const validPath = "./db/rentalsTest.csv";
        rentalFilterPredicateFactory = mock(RentalFilterPredicateFactory);
        csvRentalRepository = new CSVRentalRepository(validPath, instance(rentalFilterPredicateFactory));
        await csvRentalRepository.initDatabase();
    });

    describe("getRentalsFiltered", () => {
        const rentalFilterDto: RentalFilterDto = {
            nbBed: undefined,
            minPrice: undefined,
            maxPrice: undefined,
            postalCode: undefined
        };

        it("should return rentals", function () {
            when(rentalFilterPredicateFactory.create(rentalFilterDto.nbBed, rentalFilterDto.postalCode, rentalFilterDto.minPrice, rentalFilterDto.maxPrice))
                .thenReturn(() => true);

            const rentals: Rental[] = csvRentalRepository.getRentalsFiltered(rentalFilterDto);

            expect(rentals.length).toBeGreaterThan(0);
        });

        it("should call rentalFilterPredicateFactory.create", function () {
            csvRentalRepository.getRentals();

            verify(rentalFilterPredicateFactory.create(rentalFilterDto.nbBed, rentalFilterDto.postalCode, rentalFilterDto.minPrice, rentalFilterDto.maxPrice));
        });
    });

    describe("getRentals", () => {
        it("should return rentals", function () {
            const rentals: Rental[] = csvRentalRepository.getRentals();

            expect(rentals.length).toBeGreaterThan(0);
        });
    });

    describe("getRental", () => {
        it("with valid id should return rental", function () {
            const rental: Rental = csvRentalRepository.getRental("49eaf6af-b8f7-4cb2-ba9e-bdf49e1c27b4");

            expect(rental).toBeDefined();
        });

        it("invalid id should return undefined", function () {
            const rental: Rental = csvRentalRepository.getRental("1234");

            expect(rental).toBeUndefined();
        });
    });
});
