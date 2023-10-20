import express, { Express } from 'express';
import dotenv from 'dotenv'
import connectDB from './utils/connectDb.js';
import cors from 'cors'
import jobPostRouter from './routes/jobPostRoute.js';
import companyRouter from './routes/company.js';
import status from 'express-status-monitor'
import session from 'express-session'
import passport from 'passport'
import candidateRouter from './routes/user/candidate.js';
import employerRouter from './routes/user/employer.js';
import morgan from "morgan";
import controlledFieldRouter from './routes/controlledField.js';
import errorMiddleware from './middleware/error.js';
import fs from "fs";
import https from "https"
dotenv.config()
// initiating the app
const app: Express = express();

// required middleware
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET'
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(status());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));


// routers
app.use("/api/v1/company", companyRouter);
app.use("/api/v1/jobPost", jobPostRouter);
app.use("/api/v1/candidate", candidateRouter)
app.use("/api/v1/employer", employerRouter);
app.use("/api/v1/", controlledFieldRouter)



app.use(errorMiddleware);

const options = {
  cert: fs.readFileSync('/etc/letsencrypt/live/layer2.fun/fullchain.pem'),
  key: fs.readFileSync('/etc/letsencrypt/live/layer2.fun/privkey.pem')
};

const port = process.env.PORT || 8000;
const start = async () => {
  try {
    if (process.env.MONGO_URL) {
      await connectDB(process.env.MONGO_URL);
      app.listen(port, () =>
        console.log(
          `⚡️[server]: Server iS running at http://localhost:${port} as well as connected with database`
        )
      );
    }
    https.createServer(options, app).listen(443);

  } catch (error) {
    console.log(error);
  }
};
start();
