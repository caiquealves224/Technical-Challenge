import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { TransferModule } from './transfer/transfer.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsuariosModule,
    TransferModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
