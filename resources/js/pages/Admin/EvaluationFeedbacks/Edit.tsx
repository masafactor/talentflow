import FlashMessage from '@/components/flash-message';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEventHandler } from 'react';

type Evaluation = {
    id: number;
};

type Employee = {
    id: number;
    employee_number: string;
    last_name: string;
    first_name: string;
};

type Feedback = {
    id: number;
    feedback_date: string;
    feedbacker_employee_id: number | null;
    summary: string | null;
    strengths: string | null;
    improvement_points: string | null;
    next_goals: string | null;
    note: string | null;
};

type Props = {
    evaluation: Evaluation;
    feedback: Feedback;
    employees: Employee[];
};

export default function Edit({ evaluation, feedback, employees }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        feedback_date: feedback.feedback_date,
        feedbacker_employee_id: feedback.feedbacker_employee_id ? String(feedback.feedbacker_employee_id) : '',
        summary: feedback.summary ?? '',
        strengths: feedback.strengths ?? '',
        improvement_points: feedback.improvement_points ?? '',
        next_goals: feedback.next_goals ?? '',
        note: feedback.note ?? '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(`/admin/evaluations/${evaluation.id}/feedbacks/${feedback.id}`);
    };

    return (
        <AppLayout>
            <Head title="フィードバック記録編集" />

            <div className="p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">フィードバック記録編集</h1>

                    <Link
                        href={`/admin/evaluations/${evaluation.id}/feedbacks`}
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
                        <label className="mb-2 block text-sm font-medium">面談日</label>
                        <input
                            type="date"
                            value={data.feedback_date}
                            onChange={(e) => setData('feedback_date', e.target.value)}
                            className="w-full rounded-md border px-3 py-2"
                        />
                        {errors.feedback_date && <div className="mt-1 text-sm text-red-600">{errors.feedback_date}</div>}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">担当者</label>
                        <select
                            value={data.feedbacker_employee_id}
                            onChange={(e) => setData('feedbacker_employee_id', e.target.value)}
                            className="w-full rounded-md border px-3 py-2"
                        >
                            <option value="">未設定</option>
                            {employees.map((employee) => (
                                <option key={employee.id} value={employee.id}>
                                    {employee.employee_number} {employee.last_name} {employee.first_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">概要</label>
                        <textarea
                            value={data.summary}
                            onChange={(e) => setData('summary', e.target.value)}
                            rows={3}
                            className="w-full rounded-md border px-3 py-2"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">強み</label>
                        <textarea
                            value={data.strengths}
                            onChange={(e) => setData('strengths', e.target.value)}
                            rows={4}
                            className="w-full rounded-md border px-3 py-2"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">改善点</label>
                        <textarea
                            value={data.improvement_points}
                            onChange={(e) => setData('improvement_points', e.target.value)}
                            rows={4}
                            className="w-full rounded-md border px-3 py-2"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">次回までの目標</label>
                        <textarea
                            value={data.next_goals}
                            onChange={(e) => setData('next_goals', e.target.value)}
                            rows={4}
                            className="w-full rounded-md border px-3 py-2"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">備考</label>
                        <textarea
                            value={data.note}
                            onChange={(e) => setData('note', e.target.value)}
                            rows={3}
                            className="w-full rounded-md border px-3 py-2"
                        />
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
                            href={`/admin/evaluations/${evaluation.id}/feedbacks`}
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