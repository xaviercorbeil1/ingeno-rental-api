import express from "express";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import {RentalContext} from  "./context/RentalContext";
import * as homeController from "./controllers/home";

const rentralContext =new RentalContext();

const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
dotenv.config();

/**
 * Primary app routes.
 */
app.get("/", homeController.index);
app.get("/rentals",rentralContext.rentalController.getRentals);
app.get("/rentals/:id",rentralContext.rentalController.getRentalById);

export default app;
