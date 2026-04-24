import FlashMessage from '@/components/flash-message';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEventHandler } from 'react';

type EvaluationCycle = {
    id: number;
    name: string;
    start_date: string;
    end_date: string;
    status: 'draft' | 'open' | 'closed';
    description: string | null;
};

type Props = {
    evaluationCycle: EvaluationCycle;
};

export default function Edit({ evaluationCycle }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: evaluationCycle.name,
        start_date: evaluationCycle.start_date,
        end_date: evaluationCycle.end_date,
        status: evaluationCycle.status,
        description: evaluationCycle.description ?? '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(`/admin/evaluation-cycles/${evaluationCycle.id}`);
    };

    return (
        <AppLayout>
            <Head title="評価期間編集" />

            <div className="p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">評価期間編集</h1>

                    <Link
                        href="/admin/evaluation-cycles"
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
                        {errors.name && <div className="mt-1 text-sm text-red-600">{errors.name}</div>}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">開始日</label>
                        <input
                            type="date"
                            value={data.start_date}
                            onChange={(e) => setData('start_date', e.target.value)}
                            className="w-full rounded-md border px-3 py-2"
                        />
                        {errors.start_date && <div className="mt-1 text-sm text-red-600">{errors.start_date}</div>}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">終了日</label>
                        <input
                            type="date"
                            value={data.end_date}
                            onChange={(e) => setData('end_date', e.target.value)}
                            className="w-full rounded-md border px-3 py-2"
                        />
                        {errors.end_date && <div className="mt-1 text-sm text-red-600">{errors.end_date}</div>}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">状態</label>
                        <select
                            value={data.status}
                            onChange={(e) => setData('status', e.target.value as 'draft' | 'open' | 'closed')}
                            className="w-full rounded-md border px-3 py-2"
                        >
                            <option value="draft">下書き</option>
                            <option value="open">実施中</option>
                            <option value="closed">終了</option>
                        </select>
                        {errors.status && <div className="mt-1 text-sm text-red-600">{errors.status}</div>}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">説明</label>
                        <textarea
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            rows={4}
                            className="w-full rounded-md border px-3 py-2"
                        />
                        {errors.description && <div className="mt-1 text-sm text-red-600">{errors.description}</div>}
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
                            href="/admin/evaluation-cycles"
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