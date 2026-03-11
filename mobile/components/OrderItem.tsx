import { colors, fontSize, spacing } from "@/constants/theme";
import { Item } from "@/types";
import { Feather } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { formatPrice } from "../utils/format";

interface OrderItemProps {
    item: Item;
    onRemove: (item_id: string) => Promise<void>;
}

export function OrderItem({ item, onRemove }: OrderItemProps) {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.productName}>{item.product?.name}</Text>
                <Text style={styles.productDetail}>
                    {item.amount}x - {formatPrice(item.product.price * item.amount)}
                </Text>
            </View>

            <Pressable style={styles.deleteButton} onPress={() => onRemove(item.id)}>
                <Feather name="trash" size={20} color={colors.primary} />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.backgroundInput,
        borderRadius: 8,
        padding: spacing.md,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 1,
        borderColor: colors.borderColor,
    },
    content: {
        flex: 1,
    },
    productName: {
        color: colors.primary,
        fontSize: fontSize.md,
        marginBottom: 4,
    },
    productDetail: {
        color: colors.gray,
    },
    deleteButton: {
        backgroundColor: colors.red,
        padding: 8,
        borderRadius: 4,
    },
});
