import type { RegisterDTO, LoginDTO, AuthResponseDTO } from "../types/dto.types.js";
interface IAuthService {
    register(data: RegisterDTO): Promise<AuthResponseDTO>;
    login(data: LoginDTO): Promise<AuthResponseDTO>;
    authenticate(token: string): Promise<{
        id: string;
        role: string;
    }>;
}
declare class AuthService implements IAuthService {
    /**
     * Register — delegates creation to UserFactory.
     * Factory picks Customer / Provider / Admin discriminator.
     */
    register(data: RegisterDTO): Promise<AuthResponseDTO>;
    /**
     * Login — uses Repository to find user, bcrypt to verify.
     */
    login(data: LoginDTO): Promise<AuthResponseDTO>;
    /**
     * AuthService.authenticate() — verifies JWT and returns payload.
     * Used by AuthMiddleware and other services.
     * Implements the "authenticate()" method from UML AuthService.
     */
    authenticate(token: string): Promise<{
        id: string;
        role: string;
    }>;
    /** Private — generates signed JWT with id + role in payload */
    private generateToken;
}
export declare const authService: AuthService;
export {};
//# sourceMappingURL=auth.service.d.ts.map