// type declaration file
// import the User interface (the type)
import  User  from '../models/userModel';

declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}