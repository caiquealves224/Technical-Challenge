import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from 'src/auth/auth.guard';
import { Response } from 'express';
import { UsuariosController } from 'src/usuarios/usuarios.controller';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { UsuarioDto } from 'src/usuarios/dto/usuario.dto';

describe('UsuariosController', () => {
  let controller: UsuariosController;
  let usuariosService: UsuariosService;
  let responseMock: Partial<Response>;

  beforeEach(async () => {
    const usuariosServiceMock = {
      encotrarTudo: jest.fn(),
      criar: jest.fn(),
      logar: jest.fn(),
    };

    responseMock = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuariosController],
      providers: [{ provide: UsuariosService, useValue: usuariosServiceMock }],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<UsuariosController>(UsuariosController);
    usuariosService = module.get<UsuariosService>(UsuariosService);
  });

  it('deve estar definido', () => {
    expect(controller).toBeDefined();
  });

  describe('todosUsuarios', () => {
    it('deve retornar uma lista de usuários com status 200', async () => {
      const usuariosMock = [{ id: 1, username: 'User1' }];
      (usuariosService.encotrarTudo as jest.Mock).mockResolvedValue(
        usuariosMock,
      );

      await controller.todosUsuarios(responseMock as Response);

      expect(responseMock.status).toHaveBeenCalledWith(200);
      expect(responseMock.json).toHaveBeenCalledWith(usuariosMock);
    });
  });

  describe('cadastrarUsuario', () => {
    it('deve criar um novo usuário e retornar o ID com status 201', async () => {
      const usuarioDto: UsuarioDto = {
        username: 'User1',
        password: '123456',
        birthdate: '12/02/1999',
      };
      const usuarioCriadoMock = { id: 1 };
      (usuariosService.criar as jest.Mock).mockResolvedValue(usuarioCriadoMock);

      await controller.cadastrarUsuario(responseMock as Response, usuarioDto);

      expect(responseMock.status).toHaveBeenCalledWith(201);
      expect(responseMock.json).toHaveBeenCalledWith({
        id: usuarioCriadoMock.id,
      });
    });
  });

  describe('loginUsuario', () => {
    it('deve fazer login e retornar um token com status 200', async () => {
      const loginDto = { username: 'User1', password: '123456' };
      const loginResultMock = { token: 'valid-token' };
      (usuariosService.logar as jest.Mock).mockResolvedValue(loginResultMock);

      await controller.loginUsuario(responseMock as Response, loginDto);

      expect(responseMock.status).toHaveBeenCalledWith(200);
      expect(responseMock.json).toHaveBeenCalledWith(loginResultMock);
    });
  });
});
