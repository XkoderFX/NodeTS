import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config({ path: "config.env" });

const app = express();
app.use(express.json());

// models
const users: User[] = [];

interface UserInterface {
    id: number;
    name: string;
    email: string;
    isFromIsrael: boolean;
}

interface UserArgs extends Exclude<UserInterface, Function> {}

class User implements UserInterface {
    id: number;
    name: string;
    email: string;
    isFromIsrael: boolean;

    constructor({ id, name, email, isFromIsrael }: UserArgs) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.isFromIsrael = isFromIsrael;
    }
}

// controllers

const postUser = (req: Request, res: Response) => {
    const { name, email, isFromIsrael } = req.body;
    const user = new User({ id: Date.now(), name, email, isFromIsrael });
    users.push(user);

    const message = isFromIsrael
        ? "שלום"
        : "user has been created successfully";

    res.status(201).json({
        message,
    });
};

const getUser = (req: Request, res: Response) => {
    res.status(200).send({ users });
};

// -

app.route("/api/users").get(getUser).post(postUser);

app.listen(process.env.PORT, () => {
    console.log(`serve on ${process.env.PORT}`);
});
