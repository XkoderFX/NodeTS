"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "config.env" });
var app = express_1.default();
app.use(express_1.default.json());
// models
var users = [];
var User = /** @class */ (function () {
    function User(_a) {
        var id = _a.id, name = _a.name, email = _a.email, isFromIsrael = _a.isFromIsrael;
        this.id = id;
        this.name = name;
        this.email = email;
        this.isFromIsrael = isFromIsrael;
    }
    return User;
}());
// controllers
var postUser = function (req, res) {
    var _a = req.body, name = _a.name, email = _a.email, isFromIsrael = _a.isFromIsrael;
    var user = new User({ id: Date.now(), name: name, email: email, isFromIsrael: isFromIsrael });
    users.push(user);
    var message = isFromIsrael
        ? "שלום"
        : "user has been created successfully";
    res.status(201).json({
        message: message,
    });
};
var getUser = function (req, res) {
    res.status(200).send({ users: users });
};
// -
app.route("/api/users").get(getUser).post(postUser);
app.listen(process.env.PORT, function () {
    console.log("serve on " + process.env.PORT);
});
