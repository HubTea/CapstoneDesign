import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import * as stream from 'stream';
import { FishService } from '../service/fish';
import { DatabaseConnectionContainer } from '../service/databaseConnectionContainer';
import { FishClassDto } from '../dto';

@Controller('fish')
export class FishController {
  constructor(
    readonly fishService: FishService,
    readonly databaseConnectionContainer: DatabaseConnectionContainer,
  ) {}

  @Get('/')
  async getList() {
    const repository = this.databaseConnectionContainer.get().repository;

    return await this.fishService.getList(repository);
  }

  @Post('/')
  async register(@Body() fishClass: FishClassDto) {
    const repository = this.databaseConnectionContainer.get().repository;

    await this.fishService.register(repository, fishClass);
  }

  @Get('/image')
  async getImage(@Res() res: Response, @Body() fishClass: FishClassDto) {
    const imageStream = await this.fishService.getImageStream(fishClass);

    await stream.promises.pipeline(imageStream, res);
  }
}
