import FlashMessage from '@/components/flash-message';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';

type EvaluationTemplate = {
    id: number;
    name: string;
    description: string | null;
    is_active: boolean;
};

type Props = {
    evaluationTemplates: EvaluationTemplate[];
};

export default function Index({ evaluationTemplates }: Props) {
    return (
        <AppLayout>
            <Head title="評価テンプレート管理" />

            <div className="p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">評価テンプレート管理</h1>

                    <Link
                        href="/admin/evaluation-templates/create"
                        className="rounded-md bg-black px-4 py-2 text-sm text-white"
                    >
                        新規登録
                    </Link>
                </div>

                <div className="mt-4">
                    <FlashMessage />
                </div>

                <div className="mt-6 overflow-hidden rounded-lg border">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3">名称</th>
                                <th className="px-4 py-3">説明</th>
                                <th className="px-4 py-3">状態</th>
                                <th className="px-4 py-3">操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            {evaluationTemplates.map((template) => (
                                <tr key={template.id} className="border-t">
                                    <td className="px-4 py-3">{template.name}</td>
                                    <td className="px-4 py-3">{template.description ?? '-'}</td>
                                    <td className="px-4 py-3">
                                        {template.is_active ? '有効' : '無効'}
                                    </td>
                                    <td className="px-4 py-3">
                                        <Link
                                            href={`/admin/evaluation-templates/${template.id}/edit`}
                                            className="text-sm text-blue-600 underline"
                                        >
                                            編集
                                        </Link>
                                    </td>
                                </tr>
                            ))}

                            {evaluationTemplates.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-4 py-6 text-center text-gray-500">
                                        評価テンプレートが登録されていません。
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