import FlashMessage from '@/components/flash-message';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEventHandler } from 'react';

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
    interviewer_employee_id: number | null;
    summary: string | null;
    discussion: string | null;
    action_plan: string | null;
    next_check: string | null;
    note: string | null;
};

type Props = {
    employee: Employee;
    interview: Interview;
    employees: Employee[];
};

export default function Edit({ employee, interview, employees }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        interview_date: interview.interview_date,
        interview_type: interview.interview_type,
        interviewer_employee_id: interview.interviewer_employee_id ? String(interview.interviewer_employee_id) : '',
        summary: interview.summary ?? '',
        discussion: interview.discussion ?? '',
        action_plan: interview.action_plan ?? '',
        next_check: interview.next_check ?? '',
        note: interview.note ?? '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(`/admin/employees/${employee.id}/interviews/${interview.id}`);
    };

    return (
        <AppLayout>
            <Head title="面談記録編集" />

            <div className="p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">面談記録編集</h1>

                    <Link
                        href={`/admin/employees/${employee.id}/interviews`}
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
                            value={data.interview_date}
                            onChange={(e) => setData('interview_date', e.target.value)}
                            className="w-full rounded-md border px-3 py-2"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">面談種別</label>
                        <select
                            value={data.interview_type}
                            onChange={(e) => setData('interview_type', e.target.value as 'regular' | 'one_on_one' | 'follow_up' | 'return_to_work' | 'transfer_follow_up' | 'other')}
                            className="w-full rounded-md border px-3 py-2"
                        >
                            <option value="regular">定期面談</option>
                            <option value="one_on_one">1on1</option>
                            <option value="follow_up">フォロー面談</option>
                            <option value="return_to_work">復職面談</option>
                            <option value="transfer_follow_up">異動後面談</option>
                            <option value="other">その他</option>
                        </select>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">面談担当者</label>
                        <select
                            value={data.interviewer_employee_id}
                            onChange={(e) => setData('interviewer_employee_id', e.target.value)}
                            className="w-full rounded-md border px-3 py-2"
                        >
                            <option value="">未設定</option>
                            {employees.map((interviewer) => (
                                <option key={interviewer.id} value={interviewer.id}>
                                    {interviewer.employee_number} {interviewer.last_name} {interviewer.first_name}
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
                        <label className="mb-2 block text-sm font-medium">相談内容</label>
                        <textarea
                            value={data.discussion}
                            onChange={(e) => setData('discussion', e.target.value)}
                            rows={4}
                            className="w-full rounded-md border px-3 py-2"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">対応方針</label>
                        <textarea
                            value={data.action_plan}
                            onChange={(e) => setData('action_plan', e.target.value)}
                            rows={4}
                            className="w-full rounded-md border px-3 py-2"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">次回確認事項</label>
                        <textarea
                            value={data.next_check}
                            onChange={(e) => setData('next_check', e.target.value)}
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
                            href={`/admin/employees/${employee.id}/interviews`}
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