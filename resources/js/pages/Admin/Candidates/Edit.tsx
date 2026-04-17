import FlashMessage from '@/components/flash-message';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import FormEventHandler = React.FormEventHandler;

type Candidate = {
    id: number;
    last_name: string;
    first_name: string;
    last_name_kana: string | null;
    first_name_kana: string | null;
    birth_date: string | null;
    email: string | null;
    phone: string | null;
    note: string | null;
};

type Props = {
    candidate: Candidate;
};

export default function Edit({ candidate }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        last_name: candidate.last_name ?? '',
        first_name: candidate.first_name ?? '',
        last_name_kana: candidate.last_name_kana ?? '',
        first_name_kana: candidate.first_name_kana ?? '',
        birth_date: candidate.birth_date ?? '',
        email: candidate.email ?? '',
        phone: candidate.phone ?? '',
        note: candidate.note ?? '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(`/admin/candidates/${candidate.id}`);
    };

    return (
        <AppLayout>
            <Head title="応募者編集" />

            <div className="p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">応募者編集</h1>

                    <Link
                        href="/admin/candidates"
                        className="rounded-md border px-4 py-2 text-sm"
                    >
                        一覧へ戻る
                    </Link>
                </div>

                <div className="mt-4">
                    <FlashMessage />
                </div>

                <form onSubmit={submit} className="mt-6 space-y-6 rounded-lg border p-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div>
                            <label className="mb-2 block text-sm font-medium">姓</label>
                            <input
                                type="text"
                                value={data.last_name}
                                onChange={(e) => setData('last_name', e.target.value)}
                                className="w-full rounded-md border px-3 py-2"
                            />
                            {errors.last_name && (
                                <div className="mt-1 text-sm text-red-600">{errors.last_name}</div>
                            )}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">名</label>
                            <input
                                type="text"
                                value={data.first_name}
                                onChange={(e) => setData('first_name', e.target.value)}
                                className="w-full rounded-md border px-3 py-2"
                            />
                            {errors.first_name && (
                                <div className="mt-1 text-sm text-red-600">{errors.first_name}</div>
                            )}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">姓カナ</label>
                            <input
                                type="text"
                                value={data.last_name_kana}
                                onChange={(e) => setData('last_name_kana', e.target.value)}
                                className="w-full rounded-md border px-3 py-2"
                            />
                            {errors.last_name_kana && (
                                <div className="mt-1 text-sm text-red-600">{errors.last_name_kana}</div>
                            )}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">名カナ</label>
                            <input
                                type="text"
                                value={data.first_name_kana}
                                onChange={(e) => setData('first_name_kana', e.target.value)}
                                className="w-full rounded-md border px-3 py-2"
                            />
                            {errors.first_name_kana && (
                                <div className="mt-1 text-sm text-red-600">{errors.first_name_kana}</div>
                            )}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">生年月日</label>
                            <input
                                type="date"
                                value={data.birth_date}
                                onChange={(e) => setData('birth_date', e.target.value)}
                                className="w-full rounded-md border px-3 py-2"
                            />
                            {errors.birth_date && (
                                <div className="mt-1 text-sm text-red-600">{errors.birth_date}</div>
                            )}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">メールアドレス</label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="w-full rounded-md border px-3 py-2"
                            />
                            {errors.email && (
                                <div className="mt-1 text-sm text-red-600">{errors.email}</div>
                            )}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">電話番号</label>
                            <input
                                type="text"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                className="w-full rounded-md border px-3 py-2"
                            />
                            {errors.phone && (
                                <div className="mt-1 text-sm text-red-600">{errors.phone}</div>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">備考</label>
                        <textarea
                            value={data.note}
                            onChange={(e) => setData('note', e.target.value)}
                            className="w-full rounded-md border px-3 py-2"
                            rows={5}
                        />
                        {errors.note && (
                            <div className="mt-1 text-sm text-red-600">{errors.note}</div>
                        )}
                    </div>

                    <div className="flex gap-3">
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-md bg-black px-4 py-2 text-sm text-white disabled:opacity-50"
                        >
                            更新
                        </button>

                        <Link
                            href="/admin/candidates"
                            className="rounded-md border px-4 py-2 text-sm"
                        >
                            キャンセル
                        </Link>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}