import FlashMessage from '@/components/flash-message';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';

type Employee = {
    id: number;
    employee_number: string;
    last_name: string;
    first_name: string;
};

type Interview = {
    id: number;
    interview_date: string;
    interview_type: 'regular' | 'one_on_one' | 'follow_up' | 'return_to_work' | 'transfer_follow_up' | 'other';
    summary: string | null;
    interviewer_employee: {
        id: number;
        employee_number: string;
        last_name: string;
        first_name: string;
    } | null;
};

type Props = {
    employee: Employee;
    interviews: Interview[];
};

const typeLabels: Record<Interview['interview_type'], string> = {
    regular: '定期面談',
    one_on_one: '1on1',
    follow_up: 'フォロー面談',
    return_to_work: '復職面談',
    transfer_follow_up: '異動後面談',
    other: 'その他',
};

export default function Index({ employee, interviews }: Props) {
    return (
        <AppLayout>
            <Head title="面談記録" />

            <div className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">面談記録</h1>
                        <p className="mt-1 text-sm text-gray-500">
                            対象: {employee.employee_number} {employee.last_name} {employee.first_name}
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <Link
                            href={`/admin/employees/${employee.id}/interviews/create`}
                            className="rounded-md bg-black px-4 py-2 text-sm text-white"
                        >
                            面談記録追加
                        </Link>
                        <Link
                            href={`/admin/employees/${employee.id}`}
                            className="rounded-md border px-4 py-2 text-sm"
                        >
                            従業員詳細へ戻る
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
                                <th className="px-4 py-3">種別</th>
                                <th className="px-4 py-3">担当者</th>
                                <th className="px-4 py-3">概要</th>
                                <th className="px-4 py-3">操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            {interviews.map((interview) => (
                                <tr key={interview.id} className="border-t">
                                    <td className="px-4 py-3">{interview.interview_date}</td>
                                    <td className="px-4 py-3">{typeLabels[interview.interview_type]}</td>
                                    <td className="px-4 py-3">
                                        {interview.interviewer_employee
                                            ? `${interview.interviewer_employee.employee_number} ${interview.interviewer_employee.last_name} ${interview.interviewer_employee.first_name}`
                                            : '-'}
                                    </td>
                                    <td className="px-4 py-3">{interview.summary ?? '-'}</td>
                                    <td className="px-4 py-3">
                                        <Link
                                            href={`/admin/employees/${employee.id}/interviews/${interview.id}/edit`}
                                            className="text-sm text-blue-600 underline"
                                        >
                                            編集
                                        </Link>
                                    </td>
                                </tr>
                            ))}

                            {interviews.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                                        面談記録がありません。
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