import { Injectable } from '@nestjs/common';
import User from '../models/user.model';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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
                    success: false,
                    message: 'User already exist'
                };
            }

            const hash = await bcrypt.hash(password, SALT_ROUNDS);

            const user = new User({
                firstName,
                lastName,
                email,
                password: hash,
                image
            });

            const newUser = await user.save();

            return {
                success: true,
                message: 'User Successfully created',
                data: newUser
            };

        } catch (err) {
            return {
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
                    success: false,
                    message: 'User not found'
                };
            }

            const matchPasswords = await bcrypt.compare(password, user.password);
            if (!matchPasswords) {
                return {
                    success: false,
                    message: 'Not authorized'
                };
            }

            const accessToken = jwt.sign({ email }, SECRET_KEY);

            const date = new Date();
            const tokenExpiresIn = date.getTime() + 720000;


            return {
                success: true,
                message: 'Token generated Successfully',
                data: { "accessToken": accessToken, "tokenExpiresIn": tokenExpiresIn, "user": user }
            };

        } catch (err) {
            return {
                success: false,
                message: err.toString()
            };
        }
    }

    async isLoggedIn(body): Promise<any> {
        try {
            console.log(body.accessToken);
            const user = await User.findOne({ email: body.userModel.email });
            const token: string = body.accessToken;

            if (!user || !token) {
                return {
                    success: false,
                    message: 'User or token are not found'
                };
            }

            return {
                success: true,
                message: 'User is logged in',
            };
        } catch (err) {
            return {
                success: false,
                message: err.toString()
            };
        }
    }
}
