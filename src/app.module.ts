import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { TransferModule } from './transfer/transfer.module';

@Module({
  imports: [UsuariosModule, TransferModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
