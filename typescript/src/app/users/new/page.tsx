import Link from "next/link";
import UserForm from "@/app/users/_components/UserForm";

export default function NewUser() {
    return (
        <main className="flex flex-col items-center my-20">
            <UserForm />
            <Link href="/users">
                <p className="nav-link mt-8">ユーザー一覧へ戻る</p>
            </Link>
        </main>
    );
}
