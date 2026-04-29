import FlashMessage from '@/components/flash-message';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';

type Evaluation = {
    id: number;
    cycle: { id: number; name: string };
    employee: {
        id: number;
        employee_number: string;
        last_name: string;
        first_name: string;
    };
    template: { id: number; name: string };
};

type Feedback = {
    id: number;
    feedback_date: string;
    summary: string | null;
    feedbacker_employee: {
        id: number;
        employee_number: string;
        last_name: string;
        first_name: string;
    } | null;
};

type Props = {
    evaluation: Evaluation;
    feedbacks: Feedback[];
};

export default function Index({ evaluation, feedbacks }: Props) {
    return (
        <AppLayout>
            <Head title="フィードバック記録" />

            <div className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">フィードバック記録</h1>
                        <p className="mt-1 text-sm text-gray-500">
                            被評価者: {evaluation.employee.employee_number} {evaluation.employee.last_name} {evaluation.employee.first_name}
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <Link
                            href={`/admin/evaluations/${evaluation.id}/feedbacks/create`}
                            className="rounded-md bg-black px-4 py-2 text-sm text-white"
                        >
                            記録追加
                        </Link>
                        <Link
                            href={`/admin/evaluations/${evaluation.id}`}
                            className="rounded-md border px-4 py-2 text-sm"
                        >
                            評価結果へ戻る
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
                                <th className="px-4 py-3">面談日</th>
                                <th className="px-4 py-3">担当者</th>
                                <th className="px-4 py-3">概要</th>
                                <th className="px-4 py-3">操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            {feedbacks.map((feedback) => (
                                <tr key={feedback.id} className="border-t">
                                    <td className="px-4 py-3">{feedback.feedback_date}</td>
                                    <td className="px-4 py-3">
                                        {feedback.feedbacker_employee
                                            ? `${feedback.feedbacker_employee.employee_number} ${feedback.feedbacker_employee.last_name} ${feedback.feedbacker_employee.first_name}`
                                            : '-'}
                                    </td>
                                    <td className="px-4 py-3">{feedback.summary ?? '-'}</td>
                                    <td className="px-4 py-3">
                                        <Link
                                            href={`/admin/evaluations/${evaluation.id}/feedbacks/${feedback.id}/edit`}
                                            className="text-sm text-blue-600 underline"
                                        >
                                            編集
                                        </Link>
                                    </td>
                                </tr>
                            ))}

                            {feedbacks.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-4 py-6 text-center text-gray-500">
                                        フィードバック記録がありません。
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