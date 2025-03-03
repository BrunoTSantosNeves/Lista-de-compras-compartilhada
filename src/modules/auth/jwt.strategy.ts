import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export const jwtConstants = {
  secret: process.env.JWT_SECRET || 'secretKey', // Pegando do .env com fallback
  expiresIn: '1h', // Expiração do token
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }
  
  async validate(payload: any) {
    return { id: payload.id, email: payload.email };
  }
}