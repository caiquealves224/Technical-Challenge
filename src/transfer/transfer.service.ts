import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from 'src/usuarios/usuario.entity';
import { TransferDto } from './dto/transfer.dto';

@Injectable()
export class TransferService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usersRepository: Repository<Usuario>,
  ) {}

  async transferir(transfer: TransferDto) {
    const [usuarioOrigem, usuarioDestino] = await Promise.all([
      this.buscarUsuario(transfer.fromId),
      this.buscarUsuario(transfer.toId),
    ]);

    if (transfer.amount > usuarioOrigem.balance) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: 'Saldo Insuficente',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    usuarioOrigem.balance -= transfer.amount;
    usuarioDestino.balance += transfer.amount;

    await this.usersRepository.save([usuarioOrigem, usuarioDestino]);
  }

  private async buscarUsuario(id: string): Promise<Usuario> {
    return this.usersRepository.findOne({
      where: {
        id: Number(id),
      },
    });
  }
}
