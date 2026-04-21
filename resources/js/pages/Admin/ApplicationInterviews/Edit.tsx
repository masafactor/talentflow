import FlashMessage from '@/components/flash-message';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEventHandler } from 'react';

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

type Employee = {
    id: number;
    employee_number: string;
    last_name: string;
    first_name: string;
};

type Interview = {
    id: number;
    stage: 'document_screening' | 'first_interview' | 'second_interview' | 'final_interview';
    interviewed_at: string | null;
    interviewer_employee_id: number | null;
    result: 'pass' | 'fail' | 'hold';
    score: number | null;
    evaluation_comment: string | null;
    decision_reason: string | null;
    next_action: string | null;
};

type Props = {
    application: Application;
    interview: Interview;
    employees: Employee[];
};

export default function Edit({ application, interview, employees }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        stage: interview.stage,
        interviewed_at: interview.interviewed_at ?? '',
        interviewer_employee_id: interview.interviewer_employee_id ? String(interview.interviewer_employee_id) : '',
        result: interview.result,
        score: interview.score !== null ? String(interview.score) : '',
        evaluation_comment: interview.evaluation_comment ?? '',
        decision_reason: interview.decision_reason ?? '',
        next_action: interview.next_action ?? '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(`/admin/applications/${application.id}/interviews/${interview.id}`);
    };

    return (
        <AppLayout>
            <Head title="選考記録編集" />

            <div className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">選考記録編集</h1>
                        <p className="mt-1 text-sm text-gray-500">
                            応募者: {application.candidate.last_name} {application.candidate.first_name} / 求人: {application.job_posting.title}
                        </p>
                    </div>

                    <Link
                        href={`/admin/applications/${application.id}/interviews`}
                        className="rounded-md border px-4 py-2 text-sm"
                    >
                        一覧へ戻る
                    </Link>
                </div>

                <div className="mt-4">
                    <FlashMessage />
                </div>

                <form onSubmit={submit} className="mt-6 space-y-6 rounded-lg border p-6">
                    <div>
                        <label className="mb-2 block text-sm font-medium">ステージ</label>
                        <select
                            value={data.stage}
                            onChange={(e) => setData('stage', e.target.value as 'document_screening' | 'first_interview' | 'second_interview' | 'final_interview')}
                            className="w-full rounded-md border px-3 py-2"
                        >
                            <option value="document_screening">書類選考</option>
                            <option value="first_interview">一次面接</option>
                            <option value="second_interview">二次面接</option>
                            <option value="final_interview">最終面接</option>
                        </select>
                        {errors.stage && <div className="mt-1 text-sm text-red-600">{errors.stage}</div>}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">日時</label>
                        <input
                            type="datetime-local"
                            value={data.interviewed_at}
                            onChange={(e) => setData('interviewed_at', e.target.value)}
                            className="w-full rounded-md border px-3 py-2"
                        />
                        {errors.interviewed_at && <div className="mt-1 text-sm text-red-600">{errors.interviewed_at}</div>}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">面接担当</label>
                        <select
                            value={data.interviewer_employee_id}
                            onChange={(e) => setData('interviewer_employee_id', e.target.value)}
                            className="w-full rounded-md border px-3 py-2"
                        >
                            <option value="">未選択</option>
                            {employees.map((employee) => (
                                <option key={employee.id} value={employee.id}>
                                    {employee.employee_number} {employee.last_name} {employee.first_name}
                                </option>
                            ))}
                        </select>
                        {errors.interviewer_employee_id && <div className="mt-1 text-sm text-red-600">{errors.interviewer_employee_id}</div>}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">判定</label>
                        <select
                            value={data.result}
                            onChange={(e) => setData('result', e.target.value as 'pass' | 'fail' | 'hold')}
                            className="w-full rounded-md border px-3 py-2"
                        >
                            <option value="pass">通過</option>
                            <option value="fail">不通過</option>
                            <option value="hold">保留</option>
                        </select>
                        {errors.result && <div className="mt-1 text-sm text-red-600">{errors.result}</div>}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">点数</label>
                        <input
                            type="number"
                            value={data.score}
                            onChange={(e) => setData('score', e.target.value)}
                            className="w-full rounded-md border px-3 py-2"
                        />
                        {errors.score && <div className="mt-1 text-sm text-red-600">{errors.score}</div>}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">評価コメント</label>
                        <textarea
                            value={data.evaluation_comment}
                            onChange={(e) => setData('evaluation_comment', e.target.value)}
                            rows={4}
                            className="w-full rounded-md border px-3 py-2"
                        />
                        {errors.evaluation_comment && <div className="mt-1 text-sm text-red-600">{errors.evaluation_comment}</div>}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">判定理由</label>
                        <textarea
                            value={data.decision_reason}
                            onChange={(e) => setData('decision_reason', e.target.value)}
                            rows={4}
                            className="w-full rounded-md border px-3 py-2"
                        />
                        {errors.decision_reason && <div className="mt-1 text-sm text-red-600">{errors.decision_reason}</div>}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">次アクション</label>
                        <textarea
                            value={data.next_action}
                            onChange={(e) => setData('next_action', e.target.value)}
                            rows={3}
                            className="w-full rounded-md border px-3 py-2"
                        />
                        {errors.next_action && <div className="mt-1 text-sm text-red-600">{errors.next_action}</div>}
                    </div>

                    <div className="flex gap-3">
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-md bg-black px-4 py-2 text-sm text-white disabled:opacity-50"
                        >
                            更新
                        </button>

                        <Link
                            href={`/admin/applications/${application.id}/interviews`}
                            className="rounded-md border px-4 py-2 text-sm"
                        >
                            キャンセル
                        </Link>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}