import Footer from "@/components/custom/Footer";
import Navbar from "@/components/custom/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header>
        <Navbar />
      </header>

      {children}

      <Footer />
    </>
  );
}
