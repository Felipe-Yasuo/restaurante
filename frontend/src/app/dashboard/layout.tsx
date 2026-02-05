import { requiredAdmin } from "@/lib/auth";
import { Sidebar } from "@/components/dashboard/sidebar";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await requiredAdmin();

    return (
        <div className="flex h-screen overflow-hidden text-white">
            {/* Sidebar DESKTOP*/}
            <Sidebar userName={user.name} />
            {children}
        </div>);
}

