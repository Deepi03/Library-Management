//THIS IS THE SERVER FILE

import express, { Request, Response } from "express";
import session from "express-session";
import path from "path";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import passport from "passport";

import authorsRoute from "./routes/authorsRoute";
import booksRoute from "./routes/booksRoute";
import homeRoute from "./routes/homeRoute";
import usersRoute from "./routes/usersRoute";
import { errorHandler } from "./errorHandler/error";
import { jwtStrategy, googleStrategy } from "./config/passport";

require("dotenv").config();

const app = express();
app.set("port", process.env.PORT);

const user = {
  userName: "Milo",
  age: "10 months"
};

/* PASSPORT */
app.use(
  session({
    secret: `${process.env.SESSION_SECRET}`,
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(googleStrategy);
passport.use(jwtStrategy);

/** MIDDLEWARES **/
app.use(express.json()); //JSON
app.use(express.text()); //texsapp.use(express.urlencoded()); //Decode Form URL Encoded data
app.use(express.static(path.join(__dirname, "../public")));
//express.static helps access files that are outside of /src. It opens up the public folder for node.
// now /images can also be accessed

//import swaggerDocument
const swaggerDocument = YAML.load(
  path.join(__dirname, "../_build/swagger.yaml")
);

//setup view for dynamic template
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "jade");

app.use("/", homeRoute);
app.use("/books", booksRoute);
app.use("/users", usersRoute);
app.use("/authors", authorsRoute);

//dynamic page
app.get("/about", (req: Request, res: Response) => {
  // res.locals.user = user // Don't need res.locals if object is encased in {}
  res.render("about", { user });
});

//Add swagger router
app.use(
  "/api",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    explorer: true
  })
);

app.use(errorHandler);

export default app;
