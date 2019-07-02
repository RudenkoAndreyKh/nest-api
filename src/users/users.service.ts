import { Injectable } from '@nestjs/common';
import User from '../models/user.model';
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

@Injectable()
export class UserService {
    async findAllUsers(): Promise<any> {
        try {
            const users = await User.find();
            if (!users) {
                return {
                    success: false,
                    message: 'Users not found',
                    data: null
                };
            }
            return {
                success: true,
                data: users
            };
        } catch (err) {
            return {
                success: false,
                message: err.toString(),
                data: null
            };
        }
    }

    async findUserByEmail(body): Promise<any> {
        try {
            const user = await User.findOne({ email: body.email });
            if (!user) {
                return {
                    success: false,
                    message: 'User not found',
                };
            }
            return {
                success: true,
                data: user
            };
        } catch (err) {
            return {
                success: false,
                message: err.toString(),
            };
        }
    }

    async changeUserInfo(params, body): Promise<any> {
        const { firstName, lastName, email, unhashedPass, image } = body;
        console.log(body);

        try {
            const password = await bcrypt.hash(unhashedPass, SALT_ROUNDS);
            const userUpdated = await User.findByIdAndUpdate(
                params.id,
                {
                    $set: {
                        firstName,
                        lastName,
                        email,
                        password,
                        image
                    }
                },
                { new: true }
            );
            if (!userUpdated) {
                return {
                    success: false,
                    message: 'User not found',
                };
            }
            return {
                success: true,
                data: userUpdated
            };
        } catch (err) {
            return {
                success: false,
                message: err.toString(),
            };
        }
    }

    async deleteUserById(params): Promise<any> {
        try {
            const user = await User.findByIdAndRemove(params.id);

            if (!user) {
                return {
                    success: false,
                    message: 'User not found',
                };
            }
            User.remove({ _id: params.id }, function (err: Error) {
                if (!err) {
                    return {
                        success: false,
                        message: "User successfully deleted",
                    }
                }
                else {
                    return {
                        success: false,
                        message: err.toString(),
                        data: null
                    };
                }
            });
        } catch (err) {
            return {
                success: false,
                message: err.toString(),
            };
        }
    }
}
