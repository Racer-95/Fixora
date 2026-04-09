declare class AuthService {
    register(name: string, email: string, password: string): Promise<string>;
    login(email: string, password: string): Promise<string>;
    private generateToken;
}
export declare const authService: AuthService;
export {};
//# sourceMappingURL=auth.service.d.ts.map