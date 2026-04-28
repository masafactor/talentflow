import FlashMessage from '@/components/flash-message';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';

type Evaluation = {
    id: number;
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

type Reviewer = {
    id: number;
    reviewer_type: 'manager' | 'peer' | 'subordinate' | 'self';
    status: 'pending' | 'submitted';
    submitted_at: string | null;
    reviewer_employee: {
        id: number;
        employee_number: string;
        last_name: string;
        first_name: string;
    };
};

type Props = {
    evaluation: Evaluation;
    reviewers: Reviewer[];
};

const reviewerTypeLabels: Record<Reviewer['reviewer_type'], string> = {
    manager: '上司',
    peer: '同僚',
    subordinate: '部下',
    self: '自己評価',
};

const statusLabels: Record<Reviewer['status'], string> = {
    pending: '未回答',
    submitted: '回答済み',
};

export default function Index({ evaluation, reviewers }: Props) {
    return (
        <AppLayout>
            <Head title="評価者割当管理" />

            <div className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">評価者割当管理</h1>
                        <p className="mt-1 text-sm text-gray-500">
                            評価期間: {evaluation.cycle.name} / 被評価者: {evaluation.employee.employee_number} {evaluation.employee.last_name} {evaluation.employee.first_name}
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <Link
                            href={`/admin/evaluations/${evaluation.id}/reviewers/create`}
                            className="rounded-md bg-black px-4 py-2 text-sm text-white"
                        >
                            評価者追加
                        </Link>
                        <Link
                            href="/admin/evaluations"
                            className="rounded-md border px-4 py-2 text-sm"
                        >
                            評価設定一覧へ戻る
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
                                <th className="px-4 py-3">評価者</th>
                                <th className="px-4 py-3">区分</th>
                                <th className="px-4 py-3">状態</th>
                                <th className="px-4 py-3">回答日時</th>
                                <th className="px-4 py-3">操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reviewers.map((reviewer) => (
                                <tr key={reviewer.id} className="border-t">
                                    <td className="px-4 py-3">
                                        {reviewer.reviewer_employee.employee_number} {reviewer.reviewer_employee.last_name} {reviewer.reviewer_employee.first_name}
                                    </td>
                                    <td className="px-4 py-3">{reviewerTypeLabels[reviewer.reviewer_type]}</td>
                                    <td className="px-4 py-3">{statusLabels[reviewer.status]}</td>
                                    <td className="px-4 py-3">{reviewer.submitted_at ?? '-'}</td>
                                    <td className="px-4 py-3 space-x-3">
                                        <Link
                                            href={`/admin/evaluations/${evaluation.id}/reviewers/${reviewer.id}/answer`}
                                            className="text-sm text-sky-600 underline"
                                        >
                                            回答
                                        </Link>
                                        <Link
                                            href={`/admin/evaluations/${evaluation.id}/reviewers/${reviewer.id}/edit`}
                                            className="text-sm text-blue-600 underline"
                                        >
                                            編集
                                        </Link>
                                    </td>
                                </tr>
                            ))}

                            {reviewers.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                                        評価者が割り当てられていません。
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