import express, {
  NextFunction,
  Request,
  Response,
  json,
  urlencoded,
} from "express";

import dotenv from "dotenv";
import cors from "cors";
import user_router from "./routes/userRouter";
import post_router from "./routes/PostRouter";
import follow_router from "./routes/followRouter";
import comment_router from "./routes/commentRouter";

dotenv.config();

const app = express();
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cors());

app.use("/user", user_router);
app.use("/post", post_router);
app.use("/", follow_router);
app.use("/comment", comment_router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: err.message,
  });
});

app.get("/", (req: Request, res: Response) => {
  res.send({ status: "Ok", message: "Api!" });
});

app.get("*", (req: Request, res: Response) => {
  res.status(404).send({ message: "Page not found" });
});

const PORT = process.env.SERVER_PORT || 5020;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
