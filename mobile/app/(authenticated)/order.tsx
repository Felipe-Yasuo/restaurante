import { Select } from "@/components/Select";
import { colors, fontSize, spacing } from "@/constants/theme";
import api from "@/services/api";
import { Category, Product } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Order() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const { order_id, table } = useLocalSearchParams<{
        order_id: string;
        table: string;
    }>();

    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = useState("");

    const [loadingCategories, setLoadingCategories] = useState(true);
    const [loadingProducts, setLoadingProducts] = useState(false);

    useEffect(() => {
        async function loadDataCategories() {
            await loadCategories();
        }

        loadDataCategories();
    }, []);

    useEffect(() => {
        if (selectedCategory) {
            loadProducts(selectedCategory);
        } else {
            setProducts([]);
            setSelectedCategory("");
        }
    }, [selectedCategory]);

    async function loadCategories() {
        try {
            const response = await api.get<Category[]>("/category");
            setCategories(response.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoadingCategories(false);
        }
    }

    async function loadProducts(categoryId: string) {
        try {
            setLoadingProducts(true);

            const response = await api.get<Product[]>("/category/product", {
                params: { category_id: categoryId },
            });

            setProducts(response.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoadingProducts(false);
        }
    }

    if (loadingCategories) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.brand} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
                <View style={styles.headerContent}>
                    <Text style={styles.headerTitle}>Mesa {table}</Text>

                    <Pressable style={styles.closeButton} onPress={() => router.back()}>
                        <Ionicons name="trash" size={20} color={colors.primary} />
                    </Pressable>
                </View>
            </View>

            <ScrollView style={styles.scrollContent}>
                <Select
                    label="Categorias"
                    placeholder="Selecione a categoria..."
                    options={categories.map((category) => ({
                        label: category.name,
                        value: category.id,
                    }))}
                    selectedValue={selectedCategory}
                    onValueChange={setSelectedCategory}
                />

                {loadingProducts ? (
                    <ActivityIndicator size="small" color={colors.brand} />
                ) : (
                    selectedCategory && (
                        <Select
                            placeholder="Selecione um produto..."
                            options={products.map((product) => ({
                                label: product.name,
                                value: product.id,
                            }))}
                            selectedValue={selectedProduct}
                            onValueChange={setSelectedProduct}
                        />
                    )
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.background,
    },
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        backgroundColor: colors.background,
        borderBottomWidth: 1,
        borderBottomColor: colors.borderColor,
        paddingBottom: spacing.lg,
        paddingHorizontal: spacing.lg,
    },
    headerContent: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    headerTitle: {
        fontSize: fontSize.xl,
        color: colors.primary,
        fontWeight: "bold",
    },
    closeButton: {
        backgroundColor: colors.red,
        padding: spacing.sm,
        borderRadius: 8,
    },
    scrollContent: {
        padding: spacing.lg,
        gap: 14,
    },
});
