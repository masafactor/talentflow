import FlashMessage from '@/components/flash-message';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import FormEventHandler = React.FormEventHandler;

type RecruitmentRoute = {
    id: number;
    name: string;
    type: string | null;
    display_order: number;
    is_active: boolean;
};

type Props = {
    recruitmentRoute: RecruitmentRoute;
};

export default function Edit({ recruitmentRoute }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: recruitmentRoute.name ?? '',
        type: recruitmentRoute.type ?? '',
        display_order: recruitmentRoute.display_order,
        is_active: recruitmentRoute.is_active,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(`/admin/recruitment-routes/${recruitmentRoute.id}`);
    };

    return (
        <AppLayout>
            <Head title="採用経路編集" />

            <div className="p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">採用経路編集</h1>

                    <Link
                        href="/admin/recruitment-routes"
                        className="rounded-md border px-4 py-2 text-sm"
                    >
                        一覧へ戻る
                    </Link>
                </div>

                <div className="mt-4">
                    <FlashMessage />
                </div>

                <form onSubmit={submit} className="mt-6 space-y-6 rounded-lg border p-6">
                    <div>
                        <label className="mb-2 block text-sm font-medium">名称</label>
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
                        <label className="mb-2 block text-sm font-medium">種別</label>
                        <input
                            type="text"
                            value={data.type}
                            onChange={(e) => setData('type', e.target.value)}
                            className="w-full rounded-md border px-3 py-2"
                        />
                        {errors.type && (
                            <div className="mt-1 text-sm text-red-600">{errors.type}</div>
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
                            更新
                        </button>

                        <Link
                            href="/admin/recruitment-routes"
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