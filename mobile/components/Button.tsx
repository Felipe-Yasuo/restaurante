import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

interface ButtonProps extends TouchableOpacityProps {
    title: string;
    variant?: "primary" | "secondary";
    loading?: boolean;
}

export function Button({
    title,
    variant = "primary",
    loading = false,
    disabled,
    style,
    ...rest
}: ButtonProps) {
    return (
        <TouchableOpacity>
            <Text>{title}</Text>
        </TouchableOpacity>
    );
}
