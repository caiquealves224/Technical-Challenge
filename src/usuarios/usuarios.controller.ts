import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuarioDto } from './dto/usuario.dto';

@Controller('users')
export class UsuariosController {
    constructor(private readonly usuariosService: UsuariosService) {}
    
    @Get()
    async todosUsuarios(@Res() response) {
        return response.status(200).json(await this.usuariosService.findAll())
    }

    @Post('signup')
    async cadastrarUsuario(@Res() response, @Body() usuarioDto: UsuarioDto) {
        const userCreated = await this.usuariosService.criar(usuarioDto)
        return response.status(201).json(userCreated)
    }

    @Post('signin')
    async loginUsuario() {

    }

}
