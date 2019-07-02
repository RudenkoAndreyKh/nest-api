import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { GamesService } from './games.service';

@Controller('games')
export class GamesController {
    constructor(private readonly gameService: GamesService) { }
    @Get()
    findAll(): Promise<any> {
        return this.gameService.getAllGames();
    }

    @Get(':id')
    findOne(@Param() params): Promise<any> {
        return this.gameService.findOneGame(params);
    }

    @Post('add-new-game')
    addNewGame(@Body() body): Promise<any> {
        return this.gameService.addNewGame(body);
    }

    @Post('find-games')
    findGames(@Body() body): Promise<any> {
        return this.gameService.searchGames(body);
    }

    @Put(':id')
    updateGame(@Param() params, @Body() body): Promise <any> {
        return this.gameService.updateGame(params, body);
    }

    @Delete(':id')
    deleteGame(@Param() params): Promise<any>{
        return this.gameService.removeGame(params);
    }
}
