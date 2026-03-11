import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";

export default function AuthenticatedLayout() {
    const { loading, signed } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !signed) {
            router.replace("/login");
        }
    }, [loading, signed]);

    if (loading || !signed) {
        return null;
    }

    return (
        <Stack>
            <Stack.Screen name="dashboard" />
        </Stack>
    );
}
