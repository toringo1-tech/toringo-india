import "./globals.css";
import DesktopHeader from "@/components/DesktopHeader";
import MobileHeader from "@/components/MobileHeader";
import MobileBottomNav from "@/components/MobileBottomNav";

export const metadata = {
  title: "Toringo India",
  description: "Building materials marketplace",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        {/* ===== HEADER ===== */}
        <header className="sticky top-0 z-50">
          {/* Desktop */}
          <div className="hidden md:block">
            <DesktopHeader />
          </div>

          {/* Mobile */}
          <div className="md:hidden">
            <MobileHeader />
          </div>
        </header>

        {/* ===== PAGE CONTENT ===== */}
        <main className="min-h-screen pb-16">{children}</main>
        <MobileBottomNav />
      </body>
    </html>
  );
}