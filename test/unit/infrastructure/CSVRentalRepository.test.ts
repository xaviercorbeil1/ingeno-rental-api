import {CSVRentalRepository} from "../../../src/infrastructure/CSVRentalRepository";
import Rental from "../../../src/domain/rental/rentals";


describe("CSVRentalRepository tests", () => {
    let csvRentalRepository:CSVRentalRepository;
    beforeEach(async () => {
        const validPath = "./db/rentalsTest.csv";
        csvRentalRepository= new CSVRentalRepository(validPath);
        await csvRentalRepository.initDatabase();
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
