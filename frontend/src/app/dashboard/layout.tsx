import { requiredAdmin } from "@/lib/auth";
import { Sidebar } from "@/components/dashboard/sidebar";
import { MobileSidebar } from "@/components/dashboard/mobile-sidebar";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await requiredAdmin();

    return (
        <div className="flex h-screen overflow-hidden text-white">
            {/* Sidebar DESKTOP */}
            <Sidebar userName={user.name} />

            <div className="flex flex-1 flex-col overflow-hidden">
                {/* HEADER MOBILE */}
                <MobileSidebar />

                <main className="flex-1 overflow-y-auto bg-app-background">
                    <div className="container max-w-full px-4 py-6">{children}</div>
                </main>
            </div>
        </div>
    );
}
