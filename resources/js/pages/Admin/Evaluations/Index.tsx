import FlashMessage from '@/components/flash-message';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';

type Evaluation = {
    id: number;
    status: 'draft' | 'in_progress' | 'completed';
    overall_comment: string | null;
    cycle: {
        id: number;
        name: string;
    };
    employee: {
        id: number;
        employee_number: string;
        last_name: string;
        first_name: string;
    };
    template: {
        id: number;
        name: string;
    };
};

type Props = {
    evaluations: Evaluation[];
};

const statusLabels: Record<Evaluation['status'], string> = {
    draft: '下書き',
    in_progress: '評価中',
    completed: '完了',
};

export default function Index({ evaluations }: Props) {
    return (
        <AppLayout>
            <Head title="評価設定管理" />

            <div className="p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">評価設定管理</h1>

                    <Link
                        href="/admin/evaluations/create"
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
                                <th className="px-4 py-3">評価期間</th>
                                <th className="px-4 py-3">被評価者</th>
                                <th className="px-4 py-3">テンプレート</th>
                                <th className="px-4 py-3">状態</th>
                                <th className="px-4 py-3">操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            {evaluations.map((evaluation) => (
                                <tr key={evaluation.id} className="border-t">
                                    <td className="px-4 py-3">{evaluation.cycle.name}</td>
                                    <td className="px-4 py-3">
                                        {evaluation.employee.employee_number} {evaluation.employee.last_name} {evaluation.employee.first_name}
                                    </td>
                                    <td className="px-4 py-3">{evaluation.template.name}</td>
                                    <td className="px-4 py-3">{statusLabels[evaluation.status]}</td>
                                    <td className="px-4 py-3">
                                        <Link
                                            href={`/admin/evaluations/${evaluation.id}/edit`}
                                            className="text-sm text-blue-600 underline"
                                        >
                                            編集
                                        </Link>
                                    </td>
                                </tr>
                            ))}

                            {evaluations.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                                        評価設定が登録されていません。
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