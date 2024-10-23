import { Injectable } from '@nestjs/common';
import { Usuario } from './usuarios.interface';

@Injectable()
export class UsuarioService {
  private readonly usuarios: Usuario[] = [];

  create() {
    this.usuarios.push();
  }

  findAll() {
    return this.usuarios;
  }
}