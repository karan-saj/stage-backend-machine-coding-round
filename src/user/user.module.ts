import { Module } from '@nestjs/common';
import { UserService } from './user.servce';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../models/user.schema';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), // Register Movie model with Mongoose
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
