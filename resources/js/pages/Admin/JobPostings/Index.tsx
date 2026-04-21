import FlashMessage from '@/components/flash-message';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';

type JobPosting = {
    id: number;
    title: string;
    number_of_positions: number;
    status: 'draft' | 'open' | 'closed';
    opened_on: string | null;
    closed_on: string | null;
    department: {
        id: number;
        name: string;
    } | null;
    employment_type: {
        id: number;
        name: string;
    } | null;
};

type Props = {
    jobPostings: JobPosting[];
};

const statusLabels: Record<JobPosting['status'], string> = {
    draft: '下書き',
    open: '募集中',
    closed: '募集終了',
};

export default function Index({ jobPostings }: Props) {
    return (
        <AppLayout>
            <Head title="求人管理" />

            <div className="p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">求人管理</h1>

                    <Link
                        href="/admin/job-postings/create"
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
                                <th className="px-4 py-3">求人名</th>
                                <th className="px-4 py-3">募集部署</th>
                                <th className="px-4 py-3">雇用形態</th>
                                <th className="px-4 py-3">募集人数</th>
                                <th className="px-4 py-3">状態</th>
                                <th className="px-4 py-3">募集開始日</th>
                                <th className="px-4 py-3">募集終了日</th>
                                <th className="px-4 py-3">操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobPostings.map((jobPosting) => (
                                <tr key={jobPosting.id} className="border-t">
                                    <td className="px-4 py-3">{jobPosting.title}</td>
                                    <td className="px-4 py-3">{jobPosting.department?.name ?? '-'}</td>
                                    <td className="px-4 py-3">{jobPosting.employment_type?.name ?? '-'}</td>
                                    <td className="px-4 py-3">{jobPosting.number_of_positions}</td>
                                    <td className="px-4 py-3">{statusLabels[jobPosting.status]}</td>
                                    <td className="px-4 py-3">{jobPosting.opened_on ?? '-'}</td>
                                    <td className="px-4 py-3">{jobPosting.closed_on ?? '-'}</td>
                                    <td className="px-4 py-3 space-x-3">
                                        <Link
                                            href={`/admin/job-postings/${jobPosting.id}`}
                                            className="text-sm text-sky-600 underline"
                                        >
                                            詳細
                                        </Link>
                                        <Link
                                            href={`/admin/job-postings/${jobPosting.id}/edit`}
                                            className="text-sm text-blue-600 underline"
                                        >
                                            編集
                                        </Link>
                                    </td>
                                </tr>
                            ))}

                            {jobPostings.length === 0 && (
                                <tr>
                                    <td colSpan={8} className="px-4 py-6 text-center text-gray-500">
                                        求人が登録されていません。
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