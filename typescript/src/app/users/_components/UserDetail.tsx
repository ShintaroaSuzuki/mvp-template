"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import {
    useGetUserQuery,
    useUpdateUserMutation,
    useDeleteUserMutation,
    GetUsersDocument,
} from "@/gql/_generated_/graphql";

const schema = z.object({
    name: z.string().nonempty("名前を入力してください"),
});
type FormData = z.infer<typeof schema>;

export default function UserDetail({ id }: { id: string }) {
    const { data, loading, error } = useGetUserQuery({
        variables: {
            id,
        },
    });

    const router = useRouter();

    const [updateUser, { loading: updateLoading, error: updateError }] =
        useUpdateUserMutation();

    const [deleteUser, { loading: deleteLoading, error: deleteError }] =
        useDeleteUserMutation({
            awaitRefetchQueries: true,
            refetchQueries: [
                {
                    query: GetUsersDocument,
                },
            ],
        });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onChange",
    });

    const onSubmit = useCallback(
        async (data: FormData) => {
            await updateUser({
                variables: {
                    id,
                    name: data.name,
                },
            });
        },
        [updateUser]
    );

    const handleDelete = useCallback(async () => {
        const { errors } = await deleteUser({
            variables: {
                id,
            },
        });
        if (errors != null) return;
        router.back();
    }, [deleteUser]);

    if (loading || updateLoading || deleteLoading) return <p>Loading...</p>;

    if (error != null) return <p>Error: {error.message}</p>;

    if (data != null) {
        return (
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    className="text-black"
                    type="text"
                    {...register("name")}
                    defaultValue={data.user.name}
                />
                <p>{errors.name?.message}</p>
                <button type="submit">更新</button>
                <p>{updateError?.message}</p>
                <button onClick={handleDelete}>削除</button>
                <p>{deleteError?.message}</p>
            </form>
        );
    }
}
