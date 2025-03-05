import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    async validateUser(email: string, senha: string): Promise<any> {
        console.log("🔍 Buscando usuário:", email);
        
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
        const payload = { email: user.email, id: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}