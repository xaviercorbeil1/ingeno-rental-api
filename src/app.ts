import express from "express";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import {RentalContext} from "./api/context/RentalContext";
import * as homeController from "./api/controllers/home";

const rentalContext =new RentalContext();

dotenv.config();

// Express configuration
const app = express();
app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

(async function () {
        const rentalController = await rentalContext.getRentalController();
        app.set("dataOnStartup", rentalController);
        /**
         * Primary app routes.
         */
        app.get("/", homeController.index);
        app.get("/rentals",rentalController.getRentals);
        app.get("/rentals/:id",rentalController.getRentalById);
        app.emit("started");
})();

export default app;
