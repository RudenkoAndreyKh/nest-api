import { Injectable } from '@nestjs/common';
import User from '../models/user.model';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
var jwtDecode = require('jwt-decode');

const SALT_ROUNDS: number = 10;
const SECRET_KEY: string = "A16R03I1999"

@Injectable()
export class AuthService {
    async signUp(body): Promise<any> {
        const { firstName, lastName, email, password, image } = body;
        try {
            const userExist = await User.findOne({ email: body.email });
            if (userExist) {
                return {
                    status: 409,
                    success: false,
                    message: 'User already exist',
                };
            }

            const hash = await bcrypt.hash(password, SALT_ROUNDS);

            const user = new User({
                firstName,
                lastName,
                email,
                password: hash,
                image,
            });

            const newUser = await user.save();

            return {
                status: 201,
                success: true,
                message: 'User Successfully created',
                data: newUser,
            };

        } catch (err) {
            return {
                status: 500,
                success: false,
                message: err.toString()
            };
        }
    }

    async signIn(body): Promise<any> {
        const { email, password } = body;
        try {
            const user = await User.findOne({ email: body.email });
            if (!user) {
                return {
                    status: 401,
                    success: false,
                    message: 'Wrong email or password',
                };
            }

            const matchPasswords = await bcrypt.compare(password, user.password);
            if (!matchPasswords) {
                return {
                    status: 401,
                    success: false,
                    message: 'Wrong email or password',
                };
            }

            const accessToken = jwt.sign({ email }, SECRET_KEY);

            const date = new Date();
            const tokenExpiresIn = date.getTime() + 720000;


            return {
                status: 200,
                success: true,
                message: 'Token generated Successfully',
                data: { "accessToken": accessToken, "tokenExpiresIn": tokenExpiresIn, "user": user }
            };

        } catch (err) {
            return {
                status: 500,
                success: false,
                message: err.toString()
            };
        }
    }

    async isLoggedIn(body): Promise<any> {
        try {
            const user = await User.findOne({ email: body.userModel.email });
            const token: string = body.accessToken;

            // console.log(token.substring(1, token.length-1));
            console.log("before decode");
            const decoded = jwtDecode(token);
            console.log("decode", decoded);

            if (!user || !token) {
                return {
                    status: 404,
                    success: false,
                    message: 'User or token are not found',
                };
            }

            return {
                status: 200,
                success: true,
                
                message: 'User is logged in',
                user: body.userModel,
            };
        } catch (err) {
            return {
                status: 500,
                success: false,
                message: err.toString(),
            };
        }
    }
}
