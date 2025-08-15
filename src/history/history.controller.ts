import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { HistoryService } from './history.service';
import { CreateHistoryDto } from './dto/create-history.dto';
import { AuthGuard } from 'src/guard/jwt.auth.guard';
import RequestWithUser from 'src/guard/request.user';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new car rental history record' })
  @ApiBody({ type: CreateHistoryDto })
  @ApiResponse({ status: 201, description: 'History created successfully.' })
  @ApiResponse({ status: 404, description: 'Car not found.' })
  @ApiResponse({ status: 400, description: 'Invalid dates or input.' })
  create(@Body() dto: CreateHistoryDto, @Req() req: RequestWithUser) {
    return this.historyService.create(dto, req.user.id);
  }

  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get all rental history for the logged-in user' })
  @ApiResponse({ status: 200, description: 'List of user history records' })
  getMyHistory(@Req() req: RequestWithUser) {
    return this.historyService.findByUserId(req.user.id);
  }
}
