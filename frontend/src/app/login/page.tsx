import { LoginForm } from "@/components/forms/login-form";

export default function Login() {
    return (
        <div className="bg-app-background min-h-screen flex items-center justify-center px-4 py-8">
            <div className="w-full">
                <LoginForm />
            </div>
        </div>
    )
}