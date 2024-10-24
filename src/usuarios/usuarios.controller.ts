import { Controller, Get, Post } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';

@Controller('users')
export class UsuariosController {
    constructor(private readonly usuariosService: UsuariosService) {}
    
    @Get()
    async todosUsuarios() {

    }

    @Post('signup')
    async cadastrarUsuario() {

    }

    @Post('signin')
    async loginUsuario() {

    }

}
