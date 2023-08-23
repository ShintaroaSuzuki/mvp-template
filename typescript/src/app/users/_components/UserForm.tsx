'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  useCreateUserMutation,
  UsersDocument,
} from '@/gql/_generated_/graphql';

const schema = z.object({
  name: z.string().nonempty('名前を入力してください'),
});
type FormData = z.infer<typeof schema>;

export default function UserForm() {
  const router = useRouter();

  const [createUser, { loading, error }] = useCreateUserMutation({
    awaitRefetchQueries: true,
    refetchQueries: [
      {
        query: UsersDocument,
      },
    ],
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = useCallback(
    async (data: FormData) => {
      await createUser({
        variables: {
          name: data.name,
        },
      });
      router.back();
    },
    [createUser, router],
  );

  if (loading) return <p>Loading...</p>;

  if (error != null) return <p>Error: {error.message}</p>;

  return (
    <form
      className="flex flex-col items-stretch items-center w-2/3 max-w-lg gap-y-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        className="px-5 text-sm text-black rounded-lg py-2.5 hover:font-semibold disabled:hover:font-normal"
        type="text"
        {...register('name')}
      />
      <p className="validation-error">{errors.name?.message}</p>
      <button
        className="px-10 text-sm text-black bg-white rounded-lg py-2.5 hover:font-semibold disabled:hover:font-normal hover:bg-gray-100"
        type="submit"
      >
        作成
      </button>
    </form>
  );
}
