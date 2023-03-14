const express = require("express");
const sequelize = require("./config/connection");
const path = require("path");
const routes = require("./controllers");
const exphbs = require("express-handlebars");
const session = require("express-session");
const helpers = require("./utils/helpers");
const Sequelize = require("connect-session-sequelize")(session.Store);


const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: "secretsession",
  cookie: { maxAge: 180000 },
  resave: false,
  saveUninitialized: true,
  store:new Sequelize({
    db: sequelize,
  }),
};
app.use(session(sess));

const hbs = exphbs.create({ helpers });
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(routes);

sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`listening ' +{PORT}`));
});
