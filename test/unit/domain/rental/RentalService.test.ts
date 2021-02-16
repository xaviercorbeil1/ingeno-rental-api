import RentalService from "../../../../src/domain/rental/RentalService";
import {instance, mock, verify, when} from "ts-mockito";
import RentalFilterBuilder from "../../../../src/domain/rental/filter/RentalFilterBuilder";
import RentalRepository from "../../../../src/domain/rental/RentalRepository";
import Rental from "../../../../src/domain/rental/Rentals";

describe("RentalService tests", () => {
    let rentalService: RentalService;
    let rentalFilterBuilder : RentalFilterBuilder;
    let rentalRepository: RentalRepository;

    beforeEach(() => {
        rentalRepository= mock<RentalRepository>();
        rentalFilterBuilder= mock(RentalFilterBuilder);
        rentalService =new RentalService(instance(rentalRepository));
    });

    describe("getRentalsFiltered", () => {
        it("call rentalFilterBuilder.build()", ()=> {
            rentalService.getRentalsFiltered(instance(rentalFilterBuilder));

            verify(rentalFilterBuilder.build()).once();
        });

        it("call rentalRepository.getRentalsFiltered", ()=> {
            const predicate = mock(() => false);
            when(rentalFilterBuilder.build()).thenReturn(predicate);

            rentalService.getRentalsFiltered(instance(rentalFilterBuilder));

            verify(rentalRepository.getRentalsFiltered(predicate)).once();
        });

        it("return rentals", ()=> {
            const predicate = mock(() => false);
            when(rentalFilterBuilder.build()).thenReturn(predicate);
            const rentals: Rental[] = [];
            when(rentalRepository.getRentalsFiltered(predicate)).thenReturn(rentals);

            const rentalsFiltered = rentalService.getRentalsFiltered(instance(rentalFilterBuilder));

            expect(rentalsFiltered).toBe(rentals);
        });
    });

    describe("getById", () => {
        it("call rentalFilterBuilder.build()", ()=> {
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
