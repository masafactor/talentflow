import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import FormEventHandler = React.FormEventHandler;

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        code: '',
        name: '',
        display_order: 0,
        is_active: true,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/admin/departments');
    };

    return (
        <AppLayout>
            <Head title="部署登録" />

            <div className="p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">部署登録</h1>

                    <Link
                        href="/admin/departments"
                        className="rounded-md border px-4 py-2 text-sm"
                    >
                        一覧へ戻る
                    </Link>
                </div>

                <form onSubmit={submit} className="mt-6 space-y-6 rounded-lg border p-6">
                    <div>
                        <label className="mb-2 block text-sm font-medium">コード</label>
                        <input
                            type="text"
                            value={data.code}
                            onChange={(e) => setData('code', e.target.value)}
                            className="w-full rounded-md border px-3 py-2"
                        />
                        {errors.code && (
                            <div className="mt-1 text-sm text-red-600">{errors.code}</div>
                        )}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">部署名</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="w-full rounded-md border px-3 py-2"
                        />
                        {errors.name && (
                            <div className="mt-1 text-sm text-red-600">{errors.name}</div>
                        )}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">表示順</label>
                        <input
                            type="number"
                            value={data.display_order}
                            onChange={(e) => setData('display_order', Number(e.target.value))}
                            className="w-full rounded-md border px-3 py-2"
                        />
                        {errors.display_order && (
                            <div className="mt-1 text-sm text-red-600">{errors.display_order}</div>
                        )}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">状態</label>
                        <select
                            value={data.is_active ? '1' : '0'}
                            onChange={(e) => setData('is_active', e.target.value === '1')}
                            className="w-full rounded-md border px-3 py-2"
                        >
                            <option value="1">有効</option>
                            <option value="0">無効</option>
                        </select>
                        {errors.is_active && (
                            <div className="mt-1 text-sm text-red-600">{errors.is_active}</div>
                        )}
                    </div>

                    <div className="flex gap-3">
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-md bg-black px-4 py-2 text-sm text-white disabled:opacity-50"
                        >
                            登録
                        </button>

                        <Link
                            href="/admin/departments"
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