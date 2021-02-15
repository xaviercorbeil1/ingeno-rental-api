import express from "express";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import {RentalContext} from "./api/context/RentalContext";
import * as homeController from "./api/controllers/home";

const rentalContext =new RentalContext();

dotenv.config();
const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


/**
 * Primary app routes.
 */
app.get("/", homeController.index);

rentalContext.getRentalController().then(rentalController => {
        app.get("/rentals",rentalController.getRentals);
        app.get("/rentals/:id",rentalController.getRentalById);
});

export default app;
