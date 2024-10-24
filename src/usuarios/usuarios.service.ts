import { Injectable } from '@nestjs/common';
import { Usuario } from './usuarios.interface';

@Injectable()
export class UsuariosService {
  private readonly usuarios: Usuario[] = [];

  criar() {
    this.usuarios.push();
  }

  logar() {

  }

  findAll() {
    return this.usuarios;
  }
}