import { Company, User } from '../../models'

export interface AuthUserSettings {
    key: string,
    value: string | number | null
}

export interface AuthUser {
    user: User;
    setting: AuthUserSettings[];
    token: string;
    refresh: string;
    company: Company|null,
}

export interface AuthUserJWT {
    user: User;
    company: Company|null;
    scope: string[];
    setting: AuthUserSettings[];
    tokenType: string;
}

export interface AuthUserJWTVerify {
    isValid: boolean,
    credentials?: {
        user: User,
        scope: string[],
        setting: AuthUserSettings[],
        company: Company|null
    }
}

export interface ResetToken {
    name: string,
    email: string
}
