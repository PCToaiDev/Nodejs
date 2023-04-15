import { express } from "express";


const configviewEngine = (app) => {
    app.set("view engine", "ejs");
    app.set("views", "./src/views");
}

export default configviewEngine;