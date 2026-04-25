import FlashMessage from '@/components/flash-message';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEventHandler } from 'react';

type EvaluationTemplate = {
    id: number;
    name: string;
};

type Props = {
    evaluationTemplate: EvaluationTemplate;
};

export default function Create({ evaluationTemplate }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        category: '',
        question: '',
        input_type: 'score',
        sort_order: 0,
        is_required: true,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(`/admin/evaluation-templates/${evaluationTemplate.id}/items`);
    };

    return (
        <AppLayout>
            <Head title="評価設問登録" />

            <div className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">評価設問登録</h1>
                        <p className="mt-1 text-sm text-gray-500">
                            テンプレート: {evaluationTemplate.name}
                        </p>
                    </div>

                    <Link
                        href={`/admin/evaluation-templates/${evaluationTemplate.id}/items`}
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
                        <label className="mb-2 block text-sm font-medium">カテゴリ</label>
                        <input
                            type="text"
                            value={data.category}
                            onChange={(e) => setData('category', e.target.value)}
                            className="w-full rounded-md border px-3 py-2"
                            placeholder="協調性 / コミュニケーション など"
                        />
                        {errors.category && (
                            <div className="mt-1 text-sm text-red-600">{errors.category}</div>
                        )}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">設問</label>
                        <input
                            type="text"
                            value={data.question}
                            onChange={(e) => setData('question', e.target.value)}
                            className="w-full rounded-md border px-3 py-2"
                        />
                        {errors.question && (
                            <div className="mt-1 text-sm text-red-600">{errors.question}</div>
                        )}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">入力形式</label>
                        <select
                            value={data.input_type}
                            onChange={(e) => setData('input_type', e.target.value as 'score' | 'text')}
                            className="w-full rounded-md border px-3 py-2"
                        >
                            <option value="score">点数</option>
                            <option value="text">自由記述</option>
                        </select>
                        {errors.input_type && (
                            <div className="mt-1 text-sm text-red-600">{errors.input_type}</div>
                        )}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">並び順</label>
                        <input
                            type="number"
                            value={data.sort_order}
                            onChange={(e) => setData('sort_order', Number(e.target.value))}
                            className="w-full rounded-md border px-3 py-2"
                            min={0}
                        />
                        {errors.sort_order && (
                            <div className="mt-1 text-sm text-red-600">{errors.sort_order}</div>
                        )}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">必須</label>
                        <select
                            value={data.is_required ? '1' : '0'}
                            onChange={(e) => setData('is_required', e.target.value === '1')}
                            className="w-full rounded-md border px-3 py-2"
                        >
                            <option value="1">必須</option>
                            <option value="0">任意</option>
                        </select>
                        {errors.is_required && (
                            <div className="mt-1 text-sm text-red-600">{errors.is_required}</div>
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
                            href={`/admin/evaluation-templates/${evaluationTemplate.id}/items`}
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