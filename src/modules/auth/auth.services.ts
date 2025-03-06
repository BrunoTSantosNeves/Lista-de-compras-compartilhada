import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService
    ) {
        console.log("📢 AuthService inicializado! UsersService está definido?", !!this.userService);
    }

    async validateUser(email: string, senha: string): Promise<any> {
        console.log("🔍 Buscando usuário:", email);
        
        if (!this.userService) {
            console.log("❌ UsersService não está injetado corretamente!");
            return null;
        }

        const user = await this.userService.findByEmail(email);
        
        console.log("📌 Usuário encontrado?", user);
        
        if (!user) {
            console.log("❌ Usuário não encontrado.");
            return null;
        }
    
        const isMatch = await bcrypt.compare(senha, user.senha);
        console.log("🔐 Senha correta?", isMatch);
    
        if (isMatch) {
            console.log("✅ Login bem-sucedido!");
            return user;
        }
    
        console.log("❌ Senha incorreta.");
        return null;
    }

    async login(user: any) {
        console.log("🔑 Gerando token para:", user.email);
        const payload = { email: user.email, id: user.id };
        const token = this.jwtService.sign(payload);
        console.log("🎟️ Token gerado:", token);
        return { access_token: token };
    }
}
