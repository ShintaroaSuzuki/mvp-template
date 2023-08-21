import Link from "next/link";
import UserDetail from "@/app/users/_components/UserDetail";

export default function Page({ params }: { params: { id: string } }) {
    return (
        <main>
            <UserDetail id={params.id} />
            <Link href="/users">ユーザー一覧に戻る</Link>
        </main>
    );
}
