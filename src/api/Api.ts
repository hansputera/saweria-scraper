import express from "express";
const app = express();

app.set("json spaces", 2);
export function init():void {
    app.use("/", require("./routes/Home"));

    const listener = app.listen(process.env.PORT ? process.env.PORT : 8080, () => {
        console.log(`Listening to ${(listener.address() as any).port}`);
    });
}