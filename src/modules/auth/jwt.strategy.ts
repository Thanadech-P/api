import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { config } from "src/configs";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor() {
        super({
            ignoreExpiration: false,
            secretOrKey: config.jwt_secret_key,
            jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
                let data = request?.cookies["auth-cookie"];
                if (!data) {
                    return null
                }
                return data.token
            }])
        });
    }

    async validate(payload: any) {
        if (payload === null) {
            // throw new UnauthorizedException();
        }
        return payload;
    }
}