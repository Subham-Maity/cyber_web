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
import { Strategy as LinkedInStrategy } from 'passport-linkedin-oauth2';
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
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// passport.use(new LinkedInStrategy({
//   clientID: "77k8hhpvxj352p",
//   clientSecret: "8StWnondh0gyIp8F",
//   callbackURL: "http://localhost:3000",
//   scope: ['openid', 'profile', 'email'],
// }, function (token, tokenSecret, profile, done) {
//   return done(null, profile);
// }
// ));

// app.get('/auth/linkedin', passport.authenticate('linkedin', { state: '12345678' }));
// app.get('/auth/linkedin/callback',
//   passport.authenticate('linkedin', {
//     successRedirect: '/',
//     failureRedirect: '/login'
//   }), function (req, res) {
//     console.log(req.user);
//     res.json(req.user);
//   });
// app.get('/logout', function (req, res) {
//   req.logout((err) => {
//     if (err) {
//       // Handle any error that occurred during logout.
//       console.error('Logout error:', err);
//     }
//     // Redirect or respond as needed after logout.
//     res.json({ msg: "user logged out " });
//   }
//   );
// });

// app.get("/user", (req, res) => {
//   if (req.user) {
//     res.json({ user: req.user })
//   } else res.json({ user: "not found k" })
// })

// routers
app.use("/api/v1/company", companyRouter);
app.use("/api/v1/jobPost", jobPostRouter);
app.use("/api/v1/candidate", candidateRouter)





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

  } catch (error) {
    console.log(error);
  }
};
start();
