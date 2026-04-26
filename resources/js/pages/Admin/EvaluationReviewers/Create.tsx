import FlashMessage from '@/components/flash-message';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEventHandler } from 'react';

type Evaluation = {
    id: number;
    cycle: {
        id: number;
        name: string;
    };
    employee: {
        id: number;
        employee_number: string;
        last_name: string;
        first_name: string;
    };
    template: {
        id: number;
        name: string;
    };
};

type Employee = {
    id: number;
    employee_number: string;
    last_name: string;
    first_name: string;
};

type Props = {
    evaluation: Evaluation;
    employees: Employee[];
};

export default function Create({ evaluation, employees }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        reviewer_employee_id: '',
        reviewer_type: 'peer',
        status: 'pending',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(`/admin/evaluations/${evaluation.id}/reviewers`);
    };

    return (
        <AppLayout>
            <Head title="評価者追加" />

            <div className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">評価者追加</h1>
                        <p className="mt-1 text-sm text-gray-500">
                            被評価者: {evaluation.employee.employee_number} {evaluation.employee.last_name} {evaluation.employee.first_name}
                        </p>
                    </div>

                    <Link
                        href={`/admin/evaluations/${evaluation.id}/reviewers`}
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
                        <label className="mb-2 block text-sm font-medium">評価者</label>
                        <select
                            value={data.reviewer_employee_id}
                            onChange={(e) => setData('reviewer_employee_id', e.target.value)}
                            className="w-full rounded-md border px-3 py-2"
                        >
                            <option value="">選択してください</option>
                            {employees.map((employee) => (
                                <option key={employee.id} value={employee.id}>
                                    {employee.employee_number} {employee.last_name} {employee.first_name}
                                </option>
                            ))}
                        </select>
                        {errors.reviewer_employee_id && (
                            <div className="mt-1 text-sm text-red-600">{errors.reviewer_employee_id}</div>
                        )}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">区分</label>
                        <select
                            value={data.reviewer_type}
                            onChange={(e) => setData('reviewer_type', e.target.value as 'manager' | 'peer' | 'subordinate' | 'self')}
                            className="w-full rounded-md border px-3 py-2"
                        >
                            <option value="manager">上司</option>
                            <option value="peer">同僚</option>
                            <option value="subordinate">部下</option>
                            <option value="self">自己評価</option>
                        </select>
                        {errors.reviewer_type && (
                            <div className="mt-1 text-sm text-red-600">{errors.reviewer_type}</div>
                        )}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">状態</label>
                        <select
                            value={data.status}
                            onChange={(e) => setData('status', e.target.value as 'pending' | 'submitted')}
                            className="w-full rounded-md border px-3 py-2"
                        >
                            <option value="pending">未回答</option>
                            <option value="submitted">回答済み</option>
                        </select>
                        {errors.status && (
                            <div className="mt-1 text-sm text-red-600">{errors.status}</div>
                        )}
                    </div>

                    <div className="flex gap-3">
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-md bg-black px-4 py-2 text-sm text-white disabled:opacity-50"
                        >
                            登録
                        </button>

                        <Link
                            href={`/admin/evaluations/${evaluation.id}/reviewers`}
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