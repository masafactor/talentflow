import FlashMessage from '@/components/flash-message';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';

type Application = {
    id: number;
    applied_on: string;
    candidate: {
        id: number;
        last_name: string;
        first_name: string;
    };
    job_posting: {
        id: number;
        title: string;
        department: {
            id: number;
            name: string;
        } | null;
        employment_type: {
            id: number;
            name: string;
        } | null;
    };
    recruitment_route: {
        id: number;
        name: string;
    } | null;
};

type Props = {
    applications: Application[];
};

export default function HiredIndex({ applications }: Props) {
    return (
        <AppLayout>
            <Head title="採用通過者一覧" />

            <div className="p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">採用通過者一覧</h1>

                    <Link
                        href="/admin/applications"
                        className="rounded-md border px-4 py-2 text-sm"
                    >
                        応募一覧へ戻る
                    </Link>
                </div>

                <div className="mt-4">
                    <FlashMessage />
                </div>

                <div className="mt-6 rounded-lg border p-4 text-sm text-gray-600">
                    採用ステータスが「採用」で、まだ従業員登録されていない応募のみ表示しています。
                </div>

                <div className="mt-6 overflow-hidden rounded-lg border">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3">応募日</th>
                                <th className="px-4 py-3">応募者</th>
                                <th className="px-4 py-3">求人</th>
                                <th className="px-4 py-3">部署</th>
                                <th className="px-4 py-3">雇用形態</th>
                                <th className="px-4 py-3">採用経路</th>
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
                                        {application.job_posting.department?.name ?? '-'}
                                    </td>
                                    <td className="px-4 py-3">
                                        {application.job_posting.employment_type?.name ?? '-'}
                                    </td>
                                    <td className="px-4 py-3">
                                        {application.recruitment_route?.name ?? '-'}
                                    </td>
                                    <td className="px-4 py-3 space-x-3">
                                        <Link
                                            href={`/admin/applications/${application.id}`}
                                            className="text-sm text-sky-600 underline"
                                        >
                                            詳細
                                        </Link>
                                        <Link
                                            href={`/admin/applications/${application.id}/employee-create`}
                                            className="text-sm text-emerald-600 underline"
                                        >
                                            従業員登録
                                        </Link>
                                    </td>
                                </tr>
                            ))}

                            {applications.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="px-4 py-6 text-center text-gray-500">
                                        従業員登録待ちの採用通過者はいません。
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