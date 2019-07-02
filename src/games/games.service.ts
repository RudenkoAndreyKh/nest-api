import { Injectable } from '@nestjs/common';
import Game from '../models/game.model';

@Injectable()
export class GamesService {
    async getAllGames(): Promise<any> {
        const games = await Game.find();
        try {
            if (!games) {
                return {
                    success: false,
                    message: 'Games not found',
                };
            }
            return {
                success: true,
                message: 'Games successfully found',
                data: games
            };
        } catch (err) {
            return {
                success: false,
                message: err.toString(),
            }
        }

    }

    async findOneGame(params): Promise<any> {
        const game = await Game.findOne({ _id: params.id });
        try {
            if (!game) {
                return {
                    success: false,
                    message: 'Game not found',
                };
            }
            return {
                success: true,
                message: 'Game successfully found',
                data: game
            };
        } catch (err) {
            return {
                success: false,
                message: err.toString(),
            }
        }
    }

    async addNewGame(body): Promise<any> {
        const { name, description, price, image } = body;
        try {
            const gameExist = await Game.findOne({ name: body.name });
            if (gameExist) {
                return {
                    success: false,
                    message: 'Game already exist'
                };
            }

            const game = new Game({
                name,
                description,
                price,
                image
            });

            const newGame = await game.save();

            return {
                success: true,
                message: 'Game Successfully created',
                data: newGame
            };

        } catch (err) {
            return {
                success: false,
                message: err.toString()
            };
        }
    }

    async searchGames(body): Promise<any> {
        const searchingGames = body.searchingGames;
        try {
            const games = await Game.find({ name: { $regex: searchingGames } });
 
            if (!games) {
                return {
                    success: false,
                    message: 'Games not found'
                };
            }

            return {
                success: true,
                message: 'Games Successfully found',
                data: games
            };
        } catch (err) {
            return {
                success: false,
                message: err.toString(),
            }
        }
    }

    async updateGame(params, body): Promise<any> {
        const { name, description, price, image } = body;
        try {
            const gameUpdated = await Game.findByIdAndUpdate(
                params.id,
                {
                    $set: {
                        name,
                        description,
                        price,
                        image
                    }
                },
                { new: true }
            );
            if (!gameUpdated) {
                return {
                    success: false,
                    message: 'Game not found',
                };
            }
            return {
                success: true,
                data: gameUpdated
            };
        } catch (err) {
            return {
                success: false,
                message: err.toString(),
            };
        }
    }

    async removeGame(params): Promise<any> {
        try {
            const game = await Game.findByIdAndRemove(params.id);

            if (!game) {
                return {
                    success: false,
                    message: 'Game not found',
                };
            }
            Game.remove({ _id: params.id });
            return {
                success: true,
                message: 'The game successfully deleted'
            };
        } catch (err) {
            return {
                success: false,
                message: err.toString(),
            };
        }
    }
}
