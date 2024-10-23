import { Controller, Get, Post } from '@nestjs/common';

@Controller('users')
export class UsuariosController {
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
