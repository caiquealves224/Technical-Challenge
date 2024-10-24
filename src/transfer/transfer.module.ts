import { Module } from '@nestjs/common';
import { TransferController } from './transfer.controller';
import { TransferService } from './transfer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/usuarios/usuario.entity';

@Module({
    imports:[TypeOrmModule.forFeature([Usuario])],
    controllers: [TransferController],
    providers:[TransferService],
})
export class TransferModule {}
