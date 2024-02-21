import { JwtService } from '@nestjs/jwt';
import { ArangoRepository } from 'nest-arango';
import { UserEntity } from 'src/entities/user/user.entity';
export declare class AuthService {
    private readonly userRepository;
    private jwtService;
    constructor(userRepository: ArangoRepository<UserEntity>, jwtService: JwtService);
    signIn(username: string, pass: string): Promise<{
        access_token: string;
    }>;
}
