import { Module } from '@nestjs/common';
import { AuthGuard } from './auth.guard';

@Module({
    imports: [AuthGuard],
    exports: [AuthGuard]
})
export class AuthModule {}
