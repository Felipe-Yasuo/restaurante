import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { colors } from "../constants/theme";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" backgroundColor={colors.background} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="(authenticated)" />
      </Stack>
    </>
  );
}
