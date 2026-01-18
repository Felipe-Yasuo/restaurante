
interface AuthUserServiceProps {
    email: string;
    password: string;
}

class AuthUserService {
    async execute({ email, password }: AuthUserServiceProps) {
        console.log({ email, password })

        return "LOGADOO!"
    }
}

export { AuthUserService }