import { requiredAdmin } from "@/lib/auth";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await requiredAdmin();
    console.log("USER LOGADO ", user);

    return <div>{children}</div>;
}

