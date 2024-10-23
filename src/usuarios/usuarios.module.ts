import { Module } from '@nestjs/common';
import { UsuariosController } from './usuarios.controller';

@Module({
    controllers: [UsuariosController],
    providers: [],
})
export class UsuariosModule {}
