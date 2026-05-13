import "./globals.css";
import NavBar from "../components/layout/NavBar";
import { AppProvider } from "../context/AppContext";

export const metadata = {
  title: "Mini TaskHub",
  description: "Todo and Notes app built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="mn">
      <body>
        <AppProvider>
          <NavBar />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
