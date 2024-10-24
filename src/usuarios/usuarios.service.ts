import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './usuario.entity';
import { Repository } from 'typeorm';
import { UsuarioDto } from './dto/usuario.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usersRepository: Repository<Usuario>,
    private readonly jwtService: JwtService,
  ){}

  async criar(usuario: UsuarioDto): Promise<UsuarioDto> {
    return this.usersRepository.save(usuario)
  }

  async logar(username: string, pass: string) {
    const user = await this.usersRepository.findOne({where: {username}});
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.username };

    return {
      token: await this.jwtService.signAsync(payload),
      expiresIn: 60
    };
  }

  async findAll(): Promise<Usuario[]> {
    return this.usersRepository.find({select: { 
      id: true,
      username: true,
      birthdate: true,
      balance: true,
    }}); 
  }
}