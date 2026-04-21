import FlashMessage from '@/components/flash-message';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';

type JobPosting = {
    id: number;
    title: string;
    description: string | null;
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

type Application = {
    id: number;
    applied_on: string;
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
    candidate: {
        id: number;
        last_name: string;
        first_name: string;
    };
    recruitment_route: {
        id: number;
        name: string;
    } | null;
    employee: {
        id: number;
    } | null;
};

type Summary = {
    total: number;
    screening: number;
    first_interview: number;
    second_interview: number;
    final_interview: number;
    offered: number;
    hired: number;
    rejected: number;
    declined: number;
};

type Props = {
    jobPosting: JobPosting;
    applications: Application[];
    summary: Summary;
};

const jobStatusLabels: Record<JobPosting['status'], string> = {
    draft: '下書き',
    open: '募集中',
    closed: '募集終了',
};

const applicationStatusLabels: Record<Application['status'], string> = {
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

export default function Show({ jobPosting, applications, summary }: Props) {
    const filledCount = summary.hired;
    const remainingCount = Math.max(jobPosting.number_of_positions - filledCount, 0);

    return (
        <AppLayout>
            <Head title="求人詳細" />

            <div className="p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">求人詳細</h1>

                    <div className="flex gap-3">
                        <Link
                            href={`/admin/job-postings/${jobPosting.id}/edit`}
                            className="rounded-md bg-black px-4 py-2 text-sm text-white"
                        >
                            編集
                        </Link>
                        <Link
                            href="/admin/job-postings"
                            className="rounded-md border px-4 py-2 text-sm"
                        >
                            一覧へ戻る
                        </Link>
                    </div>
                </div>

                <div className="mt-4">
                    <FlashMessage />
                </div>

                <div className="mt-6 rounded-lg border">
                    <div className="border-b px-4 py-3">
                        <h2 className="text-lg font-semibold">求人基本情報</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <div className="border-b p-4 md:border-r">
                            <div className="text-sm text-gray-500">求人名</div>
                            <div className="mt-1">{jobPosting.title}</div>
                        </div>

                        <div className="border-b p-4">
                            <div className="text-sm text-gray-500">状態</div>
                            <div className="mt-1">{jobStatusLabels[jobPosting.status]}</div>
                        </div>

                        <div className="border-b p-4 md:border-r">
                            <div className="text-sm text-gray-500">募集部署</div>
                            <div className="mt-1">{jobPosting.department?.name ?? '-'}</div>
                        </div>

                        <div className="border-b p-4">
                            <div className="text-sm text-gray-500">雇用形態</div>
                            <div className="mt-1">{jobPosting.employment_type?.name ?? '-'}</div>
                        </div>

                        <div className="border-b p-4 md:border-r">
                            <div className="text-sm text-gray-500">募集人数</div>
                            <div className="mt-1">{jobPosting.number_of_positions}</div>
                        </div>

                        <div className="border-b p-4">
                            <div className="text-sm text-gray-500">採用済み / 未充足</div>
                            <div className="mt-1">
                                {filledCount} / {remainingCount}
                            </div>
                        </div>

                        <div className="border-b p-4 md:border-r">
                            <div className="text-sm text-gray-500">募集開始日</div>
                            <div className="mt-1">{jobPosting.opened_on ?? '-'}</div>
                        </div>

                        <div className="border-b p-4">
                            <div className="text-sm text-gray-500">募集終了日</div>
                            <div className="mt-1">{jobPosting.closed_on ?? '-'}</div>
                        </div>

                        <div className="p-4 md:col-span-2">
                            <div className="text-sm text-gray-500">求人説明</div>
                            <div className="mt-1 whitespace-pre-wrap">{jobPosting.description ?? '-'}</div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 rounded-lg border">
                    <div className="border-b px-4 py-3">
                        <h2 className="text-lg font-semibold">応募状況サマリー</h2>
                    </div>

                    <div className="grid grid-cols-2 gap-0 md:grid-cols-5">
                        <div className="border-b p-4 md:border-r">
                            <div className="text-sm text-gray-500">応募総数</div>
                            <div className="mt-1 text-xl font-semibold">{summary.total}</div>
                        </div>
                        <div className="border-b p-4 md:border-r">
                            <div className="text-sm text-gray-500">書類選考中</div>
                            <div className="mt-1 text-xl font-semibold">{summary.screening}</div>
                        </div>
                        <div className="border-b p-4 md:border-r">
                            <div className="text-sm text-gray-500">一次面接</div>
                            <div className="mt-1 text-xl font-semibold">{summary.first_interview}</div>
                        </div>
                        <div className="border-b p-4 md:border-r">
                            <div className="text-sm text-gray-500">二次面接</div>
                            <div className="mt-1 text-xl font-semibold">{summary.second_interview}</div>
                        </div>
                        <div className="border-b p-4">
                            <div className="text-sm text-gray-500">最終面接</div>
                            <div className="mt-1 text-xl font-semibold">{summary.final_interview}</div>
                        </div>

                        <div className="border-b p-4 md:border-r">
                            <div className="text-sm text-gray-500">内定</div>
                            <div className="mt-1 text-xl font-semibold">{summary.offered}</div>
                        </div>
                        <div className="border-b p-4 md:border-r">
                            <div className="text-sm text-gray-500">採用</div>
                            <div className="mt-1 text-xl font-semibold">{summary.hired}</div>
                        </div>
                        <div className="border-b p-4 md:border-r">
                            <div className="text-sm text-gray-500">不採用</div>
                            <div className="mt-1 text-xl font-semibold">{summary.rejected}</div>
                        </div>
                        <div className="border-b p-4 md:border-r">
                            <div className="text-sm text-gray-500">辞退</div>
                            <div className="mt-1 text-xl font-semibold">{summary.declined}</div>
                        </div>
                        <div className="border-b p-4">
                            <div className="text-sm text-gray-500">充足率</div>
                            <div className="mt-1 text-xl font-semibold">
                                {jobPosting.number_of_positions > 0
                                    ? `${Math.round((summary.hired / jobPosting.number_of_positions) * 100)}%`
                                    : '0%'}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 rounded-lg border">
                    <div className="border-b px-4 py-3">
                        <h2 className="text-lg font-semibold">この求人への応募一覧</h2>
                    </div>

                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3">応募日</th>
                                <th className="px-4 py-3">応募者</th>
                                <th className="px-4 py-3">採用経路</th>
                                <th className="px-4 py-3">ステータス</th>
                                <th className="px-4 py-3">登録状況</th>
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
                                    <td className="px-4 py-3">
                                        {application.recruitment_route?.name ?? '-'}
                                    </td>
                                    <td className="px-4 py-3">
                                        {applicationStatusLabels[application.status]}
                                    </td>
                                    <td className="px-4 py-3">
                                        {application.employee ? '従業員登録済み' : '未登録'}
                                    </td>
                                    <td className="px-4 py-3 space-x-3">
                                        <Link
                                            href={`/admin/applications/${application.id}`}
                                            className="text-sm text-sky-600 underline"
                                        >
                                            詳細
                                        </Link>
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
                                    <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                                        この求人への応募はまだありません。
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