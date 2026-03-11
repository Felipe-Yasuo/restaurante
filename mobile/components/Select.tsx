import { borderRadius, colors, fontSize, spacing } from "@/constants/theme";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

interface SelectOptions {
    label: string;
    value: string;
}

interface SelectProps {
    label?: string;
    options: SelectOptions[];
    selectedValue: string;
    onValueChange: (value: string) => void;
    placeholder?: string;
}

export function Select({
    onValueChange,
    options,
    selectedValue,
    label,
    placeholder = "Selecione...",
}: SelectProps) {
    const [modalVisible, setModalVisible] = useState(false);

    const selectedOption = options.find((opt) => opt.value === selectedValue);
    const displayText = selectedOption?.label || placeholder;

    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}

            <Pressable style={styles.selectButton} onPress={() => { }}>
                <Text style={styles.selectText}>{displayText}</Text>
                <Feather name="chevron-down" size={14} color={colors.primary} />
            </Pressable>

            <Modal
                visible={modalVisible}
                transparent
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            ></Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    label: {
        color: colors.primary,
        fontSize: fontSize.lg,
        marginBottom: spacing.sm,
        fontWeight: "600",
    },
    selectButton: {
        backgroundColor: colors.backgroundInput,
        borderRadius: borderRadius.md,
        borderWidth: 1,
        borderColor: colors.borderColor,
        height: 50,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        paddingHorizontal: spacing.md,
    },
    selectText: {
        color: colors.primary,
        flex: 1,
    },
    placeholderText: {
        color: colors.gray,
    },
});
