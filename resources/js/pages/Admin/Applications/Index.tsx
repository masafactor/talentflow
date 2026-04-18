import FlashMessage from '@/components/flash-message';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';

type Application = {
    id: number;
    status:
        | 'applied'
        | 'screening'
        | 'first_interview'
        | 'second_interview'
        | 'final_interview'
        | 'offered'
        | 'hired'
        | 'rejected'
        | 'declined';
    applied_on: string;
    candidate: {
        id: number;
        last_name: string;
        first_name: string;
    };
    job_posting: {
        id: number;
        title: string;
    };
    recruitment_route: {
        id: number;
        name: string;
    } | null;
    referrer_employee: {
        id: number;
        employee_number: string;
        last_name: string;
        first_name: string;
    } | null;
};

type Props = {
    applications: Application[];
};

const statusLabels: Record<Application['status'], string> = {
    applied: '応募済み',
    screening: '書類選考中',
    first_interview: '一次面接',
    second_interview: '二次面接',
    final_interview: '最終面接',
    offered: '内定',
    hired: '採用',
    rejected: '不採用',
    declined: '辞退',
};

export default function Index({ applications }: Props) {
    return (
        <AppLayout>
            <Head title="応募管理" />

            <div className="p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">応募管理</h1>

                    <Link
                        href="/admin/applications/create"
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
                                <th className="px-4 py-3">応募日</th>
                                <th className="px-4 py-3">応募者</th>
                                <th className="px-4 py-3">求人</th>
                                <th className="px-4 py-3">採用経路</th>
                                <th className="px-4 py-3">紹介者</th>
                                <th className="px-4 py-3">ステータス</th>
                                <th className="px-4 py-3">操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications.map((application) => (
                                <tr key={application.id} className="border-t">
                                    <td className="px-4 py-3">{application.applied_on}</td>
                                    <td className="px-4 py-3">
                                        {application.candidate.last_name} {application.candidate.first_name}
                                    </td>
                                    <td className="px-4 py-3">{application.job_posting.title}</td>
                                    <td className="px-4 py-3">
                                        {application.recruitment_route?.name ?? '-'}
                                    </td>
                                    <td className="px-4 py-3">
                                        {application.referrer_employee
                                            ? `${application.referrer_employee.employee_number} ${application.referrer_employee.last_name} ${application.referrer_employee.first_name}`
                                            : '-'}
                                    </td>
                                    <td className="px-4 py-3">{statusLabels[application.status]}</td>
                                    <td className="px-4 py-3">
                                        <Link
                                            href={`/admin/applications/${application.id}/edit`}
                                            className="text-sm text-blue-600 underline"
                                        >
                                            編集
                                        </Link>
                                    </td>
                                </tr>
                            ))}

                            {applications.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="px-4 py-6 text-center text-gray-500">
                                        応募情報が登録されていません。
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