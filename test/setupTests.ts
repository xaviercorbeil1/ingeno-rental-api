import app from "../src/app";

beforeAll(() => {
    return new Promise<void>((resolve) => {
        app.on("started", function(){
            return resolve();
        });
    });
});
