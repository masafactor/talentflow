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
    connection_name: string | null;
    relationship_note: string | null;
    is_incentive_target: boolean;
    note: string | null;
    candidate: {
        id: number;
        last_name: string;
        first_name: string;
        last_name_kana: string | null;
        first_name_kana: string | null;
        birth_date: string | null;
        email: string | null;
        phone: string | null;
    };
    job_posting: {
        id: number;
        title: string;
        number_of_positions: number;
        status: string;
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
        type: string | null;
    } | null;
    referrer_employee: {
        id: number;
        employee_number: string;
        last_name: string;
        first_name: string;
    } | null;
};

type StatusHistory = {
    id: number;
    old_status: string | null;
    new_status: string;
    note: string | null;
    changed_at: string;
    changed_by: {
        id: number;
        name: string;
    } | null;
};

type Props = {
    application: Application;
    statusHistories: StatusHistory[];
};

const statusLabels: Record<
    | 'applied'
    | 'screening'
    | 'first_interview'
    | 'second_interview'
    | 'final_interview'
    | 'offered'
    | 'hired'
    | 'rejected'
    | 'declined',
    string
> = {
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

export default function Show({ application, statusHistories }: Props) {
    return (
        <AppLayout>
            <Head title="応募詳細" />

            <div className="p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">応募詳細</h1>

                    <div className="flex gap-3">
                        <Link
                            href={`/admin/applications/${application.id}/edit`}
                            className="rounded-md bg-black px-4 py-2 text-sm text-white"
                        >
                            編集
                        </Link>
                        <Link
                            href="/admin/applications"
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
                        <h2 className="text-lg font-semibold">応募情報</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <div className="border-b p-4 md:border-r">
                            <div className="text-sm text-gray-500">応募日</div>
                            <div className="mt-1">{application.applied_on}</div>
                        </div>
                        <div className="border-b p-4">
                            <div className="text-sm text-gray-500">ステータス</div>
                            <div className="mt-1">{statusLabels[application.status]}</div>
                        </div>

                        <div className="border-b p-4 md:border-r">
                            <div className="text-sm text-gray-500">応募者</div>
                            <div className="mt-1">
                                {application.candidate.last_name} {application.candidate.first_name}
                            </div>
                        </div>
                        <div className="border-b p-4">
                            <div className="text-sm text-gray-500">応募者カナ</div>
                            <div className="mt-1">
                                {(application.candidate.last_name_kana ?? '')}{' '}
                                {(application.candidate.first_name_kana ?? '')}
                            </div>
                        </div>

                        <div className="border-b p-4 md:border-r">
                            <div className="text-sm text-gray-500">メールアドレス</div>
                            <div className="mt-1">{application.candidate.email ?? '-'}</div>
                        </div>
                        <div className="border-b p-4">
                            <div className="text-sm text-gray-500">電話番号</div>
                            <div className="mt-1">{application.candidate.phone ?? '-'}</div>
                        </div>

                        <div className="border-b p-4 md:border-r">
                            <div className="text-sm text-gray-500">求人</div>
                            <div className="mt-1">{application.job_posting.title}</div>
                        </div>
                        <div className="border-b p-4">
                            <div className="text-sm text-gray-500">募集部署</div>
                            <div className="mt-1">{application.job_posting.department?.name ?? '-'}</div>
                        </div>

                        <div className="border-b p-4 md:border-r">
                            <div className="text-sm text-gray-500">雇用形態</div>
                            <div className="mt-1">
                                {application.job_posting.employment_type?.name ?? '-'}
                            </div>
                        </div>
                        <div className="border-b p-4">
                            <div className="text-sm text-gray-500">採用経路</div>
                            <div className="mt-1">{application.recruitment_route?.name ?? '-'}</div>
                        </div>

                        <div className="border-b p-4 md:border-r">
                            <div className="text-sm text-gray-500">紹介者社員</div>
                            <div className="mt-1">
                                {application.referrer_employee
                                    ? `${application.referrer_employee.employee_number} ${application.referrer_employee.last_name} ${application.referrer_employee.first_name}`
                                    : '-'}
                            </div>
                        </div>
                        <div className="border-b p-4">
                            <div className="text-sm text-gray-500">関係者名</div>
                            <div className="mt-1">{application.connection_name ?? '-'}</div>
                        </div>

                        <div className="border-b p-4 md:border-r">
                            <div className="text-sm text-gray-500">関係性メモ</div>
                            <div className="mt-1">{application.relationship_note ?? '-'}</div>
                        </div>
                        <div className="border-b p-4">
                            <div className="text-sm text-gray-500">インセンティブ対象</div>
                            <div className="mt-1">
                                {application.is_incentive_target ? '対象' : '対象外'}
                            </div>
                        </div>

                        <div className="p-4 md:col-span-2">
                            <div className="text-sm text-gray-500">備考</div>
                            <div className="mt-1 whitespace-pre-wrap">{application.note ?? '-'}</div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 rounded-lg border">
                    <div className="border-b px-4 py-3">
                        <h2 className="text-lg font-semibold">選考ステータス履歴</h2>
                    </div>

                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3">変更日時</th>
                                <th className="px-4 py-3">変更前</th>
                                <th className="px-4 py-3">変更後</th>
                                <th className="px-4 py-3">変更者</th>
                                <th className="px-4 py-3">備考</th>
                            </tr>
                        </thead>
                        <tbody>
                            {statusHistories.map((history) => (
                                <tr key={history.id} className="border-t">
                                    <td className="px-4 py-3">{history.changed_at}</td>
                                    <td className="px-4 py-3">
                                        {history.old_status
                                            ? statusLabels[
                                                  history.old_status as keyof typeof statusLabels
                                              ] ?? history.old_status
                                            : '-'}
                                    </td>
                                    <td className="px-4 py-3">
                                        {statusLabels[
                                            history.new_status as keyof typeof statusLabels
                                        ] ?? history.new_status}
                                    </td>
                                    <td className="px-4 py-3">{history.changed_by?.name ?? '-'}</td>
                                    <td className="px-4 py-3">{history.note ?? '-'}</td>
                                </tr>
                            ))}

                            {statusHistories.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                                        ステータス履歴がありません。
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