import Link from 'next/link';
import UserDetail from '@/app/users/_components/UserDetail';

export default function Page({ params }: { params: { id: string } }) {
  return (
    <main className="flex flex-col items-center my-20">
      <UserDetail id={params.id} />
      <Link href="/users">
        <p className="mt-8 nav-link">ユーザー一覧に戻る</p>
      </Link>
    </main>
  );
}
