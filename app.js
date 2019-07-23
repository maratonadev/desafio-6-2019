const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const nluRouter = require("./routes/nlu-router")
const config = require('./routes/config.routes');
const cors = require('cors');
const app = express();
app.set('port', process.env.PORT || 4000);

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', nluRouter);
app.use('/api/v1/config', config);

app.use("/", express.static(path.join(__dirname, "public")));
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(app.get('port'), '0.0.0.0', () => {
  console.log(`Server starting on => ${app.get('port')} `);
})

module.exports = app;
