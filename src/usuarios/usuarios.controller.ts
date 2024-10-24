import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuarioDto } from './dto/usuario.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsuariosController {
    constructor(private readonly usuariosService: UsuariosService) {}
    
    @UseGuards(AuthGuard)
    @Get()
    async todosUsuarios(@Res() response) {
        return response.status(200).json(await this.usuariosService.findAll())
    }

    @Post('signup')
    async cadastrarUsuario(@Res() response, @Body() usuarioDto: UsuarioDto) {
        const userCreated = await this.usuariosService.criar(usuarioDto)
        return response.status(201).json({id: userCreated.id})
    }

    @Post('signin')
    async loginUsuario(@Res() response, @Body() body: { username, password }) {
        const result = await this.usuariosService.logar(body.username, body.password);

        return response.status(200).json(result)
    }

}
