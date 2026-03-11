import { colors } from "@/constants/theme";
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
        <Stack
            screenOptions={{
                headerShown: true,
                headerStyle: {
                    backgroundColor: colors.background,
                },
                headerTintColor: colors.primary,
                headerTitleStyle: {
                    fontWeight: "600",
                },
                headerShadowVisible: false,
            }}
        >
            <Stack.Screen name="dashboard" options={{ headerShown: false }} />
        </Stack>
    );
}
