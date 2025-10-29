import { Header } from "@/components/Header/Header";
import { Navbar } from "@/components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

export function MainLayout() {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Vertical navbar on the left */}
      <Navbar />

      {/* Main content area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Header />
        <div style={{ flex: 1, padding: 16 }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
