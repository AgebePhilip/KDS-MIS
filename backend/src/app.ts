import * as dotenv from 'dotenv';
dotenv.config()

import express, {json, urlencoded} from 'express';
import path from 'path';
import 'express-async-errors'
import compression from 'compression';
import cors from 'cors';
import cookieSession from 'cookie-session';




//Users routes
import currentUserRouter from './routes/user/current-user';
import signInRouter from './routes/user/signin';
import signOutRouter from './routes/user/signout';
import signUpRouter from './routes/user/signup';
import profileRouter from './routes/user/profile';
import addRouter from './routes/user/add';
import adminUpdateRouter from './routes/user/admin-update';
import userUpdateRouter from './routes/user/update';
import deleteRouter from './routes/user/delete';

import change_passwordRouter from './routes/user/change_password';
import resent_otpRouter from './routes/user/resent-otp';
import reset_passwordRouter from './routes/user/reset-password';
import verfiy_otpRouter from './routes/user/verfiy-otp';
import verify_emailRouter from './routes/user/verify-email';
import fetchUsersRouter from './routes/user/fetch';



import { NotFoundError } from './errors/not-found';
import { errorHandler } from './middleware/error-handler';
import { currentUser } from './middleware/current-user';


const app = express();

app.use(cors({
  credentials: true, origin: 'http://localhost:3000'
}))
app.use(compression());

app.set('trust proxy', true);
app.use(json());
app.use(urlencoded({ extended: false }));

app.use(cookieSession({
  signed: false, //don't encryt cookies as we are using jwt
  secure: false, //process.env.NODE_ENV !== 'test'//send cookies over HTTPS only
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))


app.use(express.static('public'))

//for email templates
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

//set current user session
app.use(currentUser)
app.use('/api/users', currentUserRouter);
app.use('/api/users', signInRouter);
app.use('/api/users', signOutRouter);
app.use('/api/users', signUpRouter);
app.use('/api/users', profileRouter);
app.use('/api/users', change_passwordRouter);
app.use('/api/users', resent_otpRouter);
app.use('/api/users', reset_passwordRouter);
app.use('/api/users', verfiy_otpRouter);
app.use('/api/users', verify_emailRouter);
app.use('/api/users', addRouter);
app.use('/api/users', deleteRouter);
app.use('/api/users', fetchUsersRouter)
app.use('/api/users', userUpdateRouter)
app.use('/api/users', adminUpdateRouter)


app.use('*', (req, res) => {
  throw new NotFoundError()
})

app.use(errorHandler);

export {app};