import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from 'src/usuarios/usuario.entity';
import { TransferDto } from './dto/transfer.dto';

@Injectable()
export class TransferService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usersRepository: Repository<Usuario>,
  ){}

  async transferir(transfer: TransferDto) {
    const usuarioOrigem = await this.usersRepository.findOne({ where: {
        id: Number(transfer.fromId)
    }})

    const usuarioDestino = await this.usersRepository.findOne({ where: {
        id: Number(transfer.toId)
    }})

    usuarioOrigem.balance-= transfer.amount;
    usuarioDestino.balance += transfer.amount;

    await this.usersRepository.save([usuarioOrigem, usuarioDestino])
  }
}