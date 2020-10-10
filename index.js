const Listener = require("./dist/Listener").default;
try {
    (new Listener()).listen("0.0.0.0", 19132);
} catch (err) {
    console.log(err);
}
