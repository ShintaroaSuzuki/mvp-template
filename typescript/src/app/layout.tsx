import "./globals.css";
import { Inter } from "next/font/google";
import AppProvider from "@/app/_providers";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AppProvider>
            <html lang="ja">
                <head>
                    <title>MVP template</title>
                    <meta name="description" content="MVP template" />
                </head>
                <body className={inter.className}>{children}</body>
            </html>
        </AppProvider>
    );
}
