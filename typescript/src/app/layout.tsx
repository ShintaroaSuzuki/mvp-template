import './globals.css';
import AppProvider from '@/app/_providers';

export default function RootLayout({
    children
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
                <body>{children}</body>
            </html>
        </AppProvider>
    );
}
