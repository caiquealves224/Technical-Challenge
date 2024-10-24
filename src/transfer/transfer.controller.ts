import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { TransferDto } from './dto/transfer.dto';

@Controller('transfer')
export class TransferController {
    @UseGuards(AuthGuard)
    @Post()
    async realizarTransferencia(@Res() response, @Body() transfer: TransferDto) {
        return response.status(204).json()
    }
}
