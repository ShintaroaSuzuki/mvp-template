import Link from 'next/link';

export default function Home() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen">
            <Link href="users">
                <p className="nav-link">ユーザー一覧へ</p>
            </Link>
        </main>
    );
}
