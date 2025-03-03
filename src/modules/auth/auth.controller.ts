import { Controller, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.services";
import { LocalAuthGuard } from './local-auth.guard';
import { Auth } from "typeorm";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login (@Request() req) {
        return this.authService.login(req.user);
    }
}