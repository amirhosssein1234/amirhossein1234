import { AuthService } from '../../services/auth/auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signIn(username: string, password: string): Promise<{
        access_token: string;
    }>;
}
