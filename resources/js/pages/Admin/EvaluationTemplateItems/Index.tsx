import FlashMessage from '@/components/flash-message';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';

type EvaluationTemplate = {
    id: number;
    name: string;
};

type Item = {
    id: number;
    category: string | null;
    question: string;
    input_type: 'score' | 'text';
    sort_order: number;
    is_required: boolean;
};

type Props = {
    evaluationTemplate: EvaluationTemplate;
    items: Item[];
};

const inputTypeLabels: Record<Item['input_type'], string> = {
    score: '点数',
    text: '自由記述',
};

export default function Index({ evaluationTemplate, items }: Props) {
    return (
        <AppLayout>
            <Head title="評価設問管理" />

            <div className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">評価設問管理</h1>
                        <p className="mt-1 text-sm text-gray-500">
                            テンプレート: {evaluationTemplate.name}
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <Link
                            href={`/admin/evaluation-templates/${evaluationTemplate.id}/items/create`}
                            className="rounded-md bg-black px-4 py-2 text-sm text-white"
                        >
                            新規登録
                        </Link>
                        <Link
                            href="/admin/evaluation-templates"
                            className="rounded-md border px-4 py-2 text-sm"
                        >
                            テンプレート一覧へ戻る
                        </Link>
                    </div>
                </div>

                <div className="mt-4">
                    <FlashMessage />
                </div>

                <div className="mt-6 overflow-hidden rounded-lg border">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3">カテゴリ</th>
                                <th className="px-4 py-3">設問</th>
                                <th className="px-4 py-3">入力形式</th>
                                <th className="px-4 py-3">並び順</th>
                                <th className="px-4 py-3">必須</th>
                                <th className="px-4 py-3">操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item) => (
                                <tr key={item.id} className="border-t">
                                    <td className="px-4 py-3">{item.category ?? '-'}</td>
                                    <td className="px-4 py-3">{item.question}</td>
                                    <td className="px-4 py-3">{inputTypeLabels[item.input_type]}</td>
                                    <td className="px-4 py-3">{item.sort_order}</td>
                                    <td className="px-4 py-3">{item.is_required ? '必須' : '任意'}</td>
                                    <td className="px-4 py-3">
                                        <Link
                                            href={`/admin/evaluation-templates/${evaluationTemplate.id}/items/${item.id}/edit`}
                                            className="text-sm text-blue-600 underline"
                                        >
                                            編集
                                        </Link>
                                    </td>
                                </tr>
                            ))}

                            {items.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                                        評価設問が登録されていません。
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}