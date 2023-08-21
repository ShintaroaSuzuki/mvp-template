"use client";

import Link from "next/link";
import { useGetUsersQuery } from "@/gql/_generated_/graphql";

export default function UserList() {
    const { data, loading, error } = useGetUsersQuery();

    if (loading) return <p>Loading...</p>;

    if (error != null) return <p>Error: {error.message}</p>;

    if (data != null) {
        if (data.users.length === 0)
            return (
                <Link href="/users/new">
                    <p>ユーザーを作成しましょう</p>
                </Link>
            );

        return (
            <ul className="w-2/3 max-w-lg flex flex-col gap-y-4">
                {data.users.map((user) => (
                    <li className="bg-gray-800 rounded-lg" key={user.id}>
                        <Link href={`/users/${user.id}`}>
                            <p className="p-4">{user.name}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        );
    }
}
