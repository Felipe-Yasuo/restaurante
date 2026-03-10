import { colors, fontSize, spacing } from "@/constants/theme";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

import { Button } from "../components/Button";
import { Input } from "../components/Input";

export default function Login() {
    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.logoContainer}>
                    <Text style={styles.logoText}>
                        Sujeito<Text style={styles.logoBrand}>Pizzaria</Text>
                    </Text>
                    <Text style={styles.logoSubtitle}>Garçom app</Text>
                </View>

                <View style={styles.formContainer}>
                    <Input
                        label="Email"
                        placeholder="Digite seu email..."
                        placeholderTextColor={colors.gray}
                    />

                    <Input
                        label="Senha"
                        placeholder="Digite sua senha..."
                        placeholderTextColor={colors.gray}
                        secureTextEntry={true}
                    />

                    <Button title="Acessar" />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background,
        flex: 1,
    },
    scrollContent: {
        justifyContent: "center",
        flexGrow: 1,
        paddingHorizontal: spacing.xl,
    },
    logoContainer: {
        alignItems: "center",
        marginBottom: spacing.xl,
    },
    logoText: {
        fontSize: 34,
        fontWeight: "bold",
        color: colors.primary,
    },
    logoBrand: {
        color: colors.brand,
    },
    logoSubtitle: {
        color: colors.primary,
        fontSize: fontSize.lg,
    },
    formContainer: {
        gap: spacing.md,
    },
});
