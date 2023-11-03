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
import jobAppRouter from './routes/jobApp.js';
import morgan from "morgan";
import controlledFieldRouter from './routes/controlledField.js';
import errorMiddleware from './middleware/error.js';
import adminRouter from './routes/user/adminRoute.js';
import http from 'http';
import { Server, Socket } from 'socket.io';
import chatRouter from './routes/chat.js';
import fs from "fs";
dotenv.config()
// initiating the app
declare global {
  namespace Express {
    interface Request {
      socketMap: Server;
    }
  }
}
const app: Express = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL
  }
});
// required middleware
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET'
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(status());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
// app.use((req, res, next) => {
//   req.io = io; // Attach the io object to the request
//   next();
// });
const socketMap = new Map<string, Socket>();

type CandidateSocketMap = Record<string, string>;
const candidateSockets: CandidateSocketMap = {}; // This will hold the associations

const addNewUser = (mongoId: string, socketId: string) => {
  if (!candidateSockets[mongoId]) {
    candidateSockets[mongoId] = socketId;
  }
}
io.on('connection', (socket) => {
  console.log('A user has connected');

  // Store the socket connection in the map
  socket.on('newUser', (mongoId: string) => {
    console.log(mongoId, socket.id);
    socketMap.set(mongoId, socket);

    // Add any additional logic as needed
  });

  socket.on('disconnect', () => {
    console.log('Someone has left');

    // Remove the socket from the map when a user disconnects
    socketMap.forEach((value, key) => {
      if (value === socket) {
        socketMap.delete(key);
      }
    });
  });
});

// Extend the Request object to include 'socketMap'
// app.use((req, res, next) => {
//   req.socketMap = socketMap;
//   next();
// });
// io.on('connection', (socket) => {
//   // Store the socket ID when a candidate logs in
//   console.log("some one has connected")
//   // io.emit("firstEvent", "hello this is test!")
//   socket.on("newUser", (mongoId) => {
//     // console.log(mongoId);
//     console.log(mongoId, socket.id)
//     addNewUser(mongoId, socket.id);
//   })
//   socket.on("sendNotification", ({ senderId, receiverId }) => {
//     console.log(candidateSockets[receiverId])
//     io.to(candidateSockets[receiverId]).emit("getNotification", {
//       senderId,
//       msg: "you are shortlisted"
//     })
//   })
//   socket.on("disconnect", () => {
//     console.log("someone has left")
//   })

//   // socket.on('candidate_login', (candidateId) => {
//   //   candidateSockets[candidateId] = socket.id;
//   // });
// });


// routers
app.use("/api/v1/company", companyRouter);
app.use("/api/v1/jobPost", jobPostRouter);
app.use("/api/v1/candidate", candidateRouter)
app.use("/api/v1/employer", employerRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/jobApp", jobAppRouter);
app.use("/api/v1/", controlledFieldRouter)
app.use("/api/v1/chat", chatRouter)

// app.use("/", (req, res, next) => {
//   res.send("⚡️[server]: This is cyberLevel's server")
// })


app.use(errorMiddleware);

// const options = {
//   cert: fs.readFileSync('/etc/letsencrypt/live/layer2.fun/fullchain.pem'),
//   key: fs.readFileSync('/etc/letsencrypt/live/layer2.fun/privkey.pem')
// };

const port = process.env.PORT || 8000;
// const httpsPort = 443
const start = async () => {
  try {
    if (process.env.MONGO_URL) {
      await connectDB(process.env.MONGO_URL);
      server.listen(port, () =>
        console.log(
          `⚡️[server]: Server iS running at http://localhost:${port} as well as connected with database`
        )
      );
    }
    // server.listen(7000)
    // // https.createServer(options, app).listen(httpsPort, () => {
    // //   console.log(
    // //     `⚡️[server]: Server is running on HTTPS at port ${httpsPort}`
    // //   );
    // // });

  } catch (error) {
    console.log(error);
  }
};
start();
