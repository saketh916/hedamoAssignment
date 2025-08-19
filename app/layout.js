import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "Hedamo",
  description: "Shop with love ♡",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        
        {children}
      </body>
    </html>
  );
}
