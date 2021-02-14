import express from "express";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import {RentalContext} from  "./context/RentalContext";
import * as homeController from "./controllers/home";

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
app.get("/rentals",rentalContext.getRentalController().getRentals);
app.get("/rentals/:id",rentalContext.getRentalController().getRentalById);

export default app;
