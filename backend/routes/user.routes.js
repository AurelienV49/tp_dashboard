const userData = require("../data/user.data.js");

module.exports = (app) => {
    app.get("/", userData.getUsers);
    app.get("/users", userData.getUsers);
    app.get("/user/:id", userData.getUser);
    app.post("/user", userData.postUser);
    app.put("/user/:id", userData.updateUser);
    app.delete("/user/:id", userData.deleteUser);
};