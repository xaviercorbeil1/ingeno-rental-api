import RentalService from "../../../../src/domain/rental/RentalService";
import {instance, mock, verify, when} from "ts-mockito";
import RentalRepository from "../../../../src/domain/rental/RentalRepository";
import Rental from "../../../../src/domain/rental/Rentals";
import RentalFilterDto from "../../../../src/domain/rental/RentalFilterDto";

describe("RentalService tests", () => {
    const rentalFilterDto: RentalFilterDto = {postalCode: undefined, maxPrice: undefined, minPrice:undefined, nbBed:undefined}
    let rentalService: RentalService;
    let rentalRepository: RentalRepository;

    beforeEach(() => {
        rentalRepository= mock<RentalRepository>();
        rentalService =new RentalService(instance(rentalRepository));
    });

    describe("getRentalsFiltered", () => {
        it("call rentalRepository.getRentalsFiltered", ()=> {
            rentalService.getRentalsFiltered(rentalFilterDto);

            verify(rentalRepository.getRentalsFiltered(rentalFilterDto)).once();
        });

        it("return rentals", ()=> {
            const rentalsFiltered = rentalService.getRentalsFiltered(rentalFilterDto);

            expect(rentalsFiltered).toBeDefined();
        });
    });

    describe("getById", () => {
        it("call getRental", ()=> {
            const id = "1234";

            rentalService.getRental(id);

            verify(rentalRepository.getRental(id)).once();
        });

        it("return rental", ()=> {
            const id = "1234";
            const rental:Rental = mock<Rental>();
            when(rentalRepository.getRental(id)).thenReturn(rental);

            const rentalReceive = rentalService.getRental(id);

            expect(rentalReceive).toBe(rental);
        });
    });
});
