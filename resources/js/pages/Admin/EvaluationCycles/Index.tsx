import FlashMessage from '@/components/flash-message';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';

type EvaluationCycle = {
    id: number;
    name: string;
    start_date: string;
    end_date: string;
    status: 'draft' | 'open' | 'closed';
    description: string | null;
};

type Props = {
    evaluationCycles: EvaluationCycle[];
};

const statusLabels: Record<EvaluationCycle['status'], string> = {
    draft: '下書き',
    open: '実施中',
    closed: '終了',
};

export default function Index({ evaluationCycles }: Props) {
    return (
        <AppLayout>
            <Head title="評価期間管理" />

            <div className="p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">評価期間管理</h1>

                    <Link
                        href="/admin/evaluation-cycles/create"
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
                                <th className="px-4 py-3">開始日</th>
                                <th className="px-4 py-3">終了日</th>
                                <th className="px-4 py-3">状態</th>
                                <th className="px-4 py-3">操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            {evaluationCycles.map((cycle) => (
                                <tr key={cycle.id} className="border-t">
                                    <td className="px-4 py-3">{cycle.name}</td>
                                    <td className="px-4 py-3">{cycle.start_date}</td>
                                    <td className="px-4 py-3">{cycle.end_date}</td>
                                    <td className="px-4 py-3">{statusLabels[cycle.status]}</td>
                                    <td className="px-4 py-3">
                                        <Link
                                            href={`/admin/evaluation-cycles/${cycle.id}/edit`}
                                            className="text-sm text-blue-600 underline"
                                        >
                                            編集
                                        </Link>
                                    </td>
                                </tr>
                            ))}

                            {evaluationCycles.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                                        評価期間が登録されていません。
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