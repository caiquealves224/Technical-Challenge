import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { TransferDto } from './dto/transfer.dto';
import { TransferService } from './transfer.service';

@Controller('transfer')
export class TransferController {
    constructor(private readonly transferService: TransferService) {}
    
    @UseGuards(AuthGuard)
    @Post()
    async realizarTransferencia(@Res() response, @Body() transfer: TransferDto) {
        await this.transferService.transferir(transfer);
        return response.status(204).json()
    }
}
