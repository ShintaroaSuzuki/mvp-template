'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
    useGetUserQuery,
    useUpdateUserMutation,
    useDeleteUserMutation,
    GetUsersDocument
} from '@/gql/_generated_/graphql';

const schema = z.object({
    name: z.string().nonempty('名前を入力してください')
});
type FormData = z.infer<typeof schema>;

export default function UserDetail({ id }: { id: string }) {
    const { data, loading, error } = useGetUserQuery({
        variables: {
            id
        }
    });

    const router = useRouter();

    const [updateUser, { loading: updateLoading, error: updateError }] =
        useUpdateUserMutation();

    const [deleteUser, { loading: deleteLoading, error: deleteError }] =
        useDeleteUserMutation({
            awaitRefetchQueries: true,
            refetchQueries: [
                {
                    query: GetUsersDocument
                }
            ]
        });

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: 'onChange'
    });

    const onSubmit = useCallback(
        async (data: FormData) => {
            await updateUser({
                variables: {
                    id,
                    name: data.name
                }
            });
        },
        [updateUser, id]
    );

    const handleDelete = useCallback(async () => {
        const { errors } = await deleteUser({
            variables: {
                id
            }
        });
        if (errors != null) return;
        router.back();
    }, [deleteUser, id, router]);

    if (loading || updateLoading || deleteLoading) return <p>Loading...</p>;

    if (error != null) return <p>Error: {error.message}</p>;

    if (data != null) {
        return (
            <form
                className="flex flex-col items-stretch items-center w-2/3 max-w-lg gap-y-2"
                onSubmit={handleSubmit(onSubmit)}
            >
                <input
                    className="px-5 text-sm text-black rounded-lg py-2.5 hover:font-semibold disabled:hover:font-normal"
                    type="text"
                    {...register('name')}
                    defaultValue={data.user.name}
                />
                <p className="validation-error">
                    {errors.name?.message ??
                        updateError?.message ??
                        deleteError?.message}
                </p>
                <div className="flex flex-col items-stretch gap-y-4">
                    <button
                        className="px-10 text-sm text-black bg-white rounded-lg py-2.5 hover:font-semibold disabled:hover:font-normal hover:bg-gray-100"
                        type="submit"
                    >
                        更新
                    </button>
                    <button
                        className="px-10 text-sm text-black bg-white rounded-lg py-2.5 hover:font-semibold disabled:hover:font-normal hover:bg-gray-100"
                        onClick={handleDelete}
                    >
                        削除
                    </button>
                </div>
            </form>
        );
    }
}
