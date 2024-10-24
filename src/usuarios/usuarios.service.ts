import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './usuario.entity';
import { Repository } from 'typeorm';
import { UsuarioDto } from './dto/usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usersRepository: Repository<Usuario>
  ){}

  async criar(usuario: UsuarioDto): Promise<UsuarioDto> {
    return this.usersRepository.save(usuario)
  }

  logar() {

  }

  async findAll(): Promise<Usuario[]> {
    return this.usersRepository.find();
  }
}