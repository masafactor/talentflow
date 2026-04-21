import FlashMessage from '@/components/flash-message';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';

type Application = {
    id: number;
    candidate: {
        last_name: string;
        first_name: string;
    };
    job_posting: {
        title: string;
    };
};

type Interview = {
    id: number;
    stage: 'document_screening' | 'first_interview' | 'second_interview' | 'final_interview';
    interviewed_at: string | null;
    result: 'pass' | 'fail' | 'hold';
    score: number | null;
    next_action: string | null;
    interviewer_employee: {
        id: number;
        employee_number: string;
        last_name: string;
        first_name: string;
    } | null;
};

type Props = {
    application: Application;
    interviews: Interview[];
};

const stageLabels: Record<Interview['stage'], string> = {
    document_screening: '書類選考',
    first_interview: '一次面接',
    second_interview: '二次面接',
    final_interview: '最終面接',
};

const resultLabels: Record<Interview['result'], string> = {
    pass: '通過',
    fail: '不通過',
    hold: '保留',
};

export default function Index({ application, interviews }: Props) {
    return (
        <AppLayout>
            <Head title="選考記録一覧" />

            <div className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">選考記録一覧</h1>
                        <p className="mt-1 text-sm text-gray-500">
                            応募者: {application.candidate.last_name} {application.candidate.first_name} / 求人: {application.job_posting.title}
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <Link
                            href={`/admin/applications/${application.id}/interviews/create`}
                            className="rounded-md bg-black px-4 py-2 text-sm text-white"
                        >
                            選考記録追加
                        </Link>
                        <Link
                            href={`/admin/applications/${application.id}`}
                            className="rounded-md border px-4 py-2 text-sm"
                        >
                            応募詳細へ戻る
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
                                <th className="px-4 py-3">ステージ</th>
                                <th className="px-4 py-3">日時</th>
                                <th className="px-4 py-3">面接担当</th>
                                <th className="px-4 py-3">判定</th>
                                <th className="px-4 py-3">点数</th>
                                <th className="px-4 py-3">次アクション</th>
                                <th className="px-4 py-3">操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            {interviews.map((interview) => (
                                <tr key={interview.id} className="border-t">
                                    <td className="px-4 py-3">{stageLabels[interview.stage]}</td>
                                    <td className="px-4 py-3">{interview.interviewed_at ?? '-'}</td>
                                    <td className="px-4 py-3">
                                        {interview.interviewer_employee
                                            ? `${interview.interviewer_employee.employee_number} ${interview.interviewer_employee.last_name} ${interview.interviewer_employee.first_name}`
                                            : '-'}
                                    </td>
                                    <td className="px-4 py-3">{resultLabels[interview.result]}</td>
                                    <td className="px-4 py-3">{interview.score ?? '-'}</td>
                                    <td className="px-4 py-3">{interview.next_action ?? '-'}</td>
                                    <td className="px-4 py-3">
                                        <Link
                                            href={`/admin/applications/${application.id}/interviews/${interview.id}/edit`}
                                            className="text-sm text-blue-600 underline"
                                        >
                                            編集
                                        </Link>
                                    </td>
                                </tr>
                            ))}

                            {interviews.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="px-4 py-6 text-center text-gray-500">
                                        選考記録が登録されていません。
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