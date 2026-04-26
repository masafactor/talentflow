import FlashMessage from '@/components/flash-message';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEventHandler } from 'react';

type EvaluationCycle = {
    id: number;
    name: string;
    status: string;
};

type Employee = {
    id: number;
    employee_number: string;
    last_name: string;
    first_name: string;
};

type EvaluationTemplate = {
    id: number;
    name: string;
};

type Props = {
    evaluationCycles: EvaluationCycle[];
    employees: Employee[];
    evaluationTemplates: EvaluationTemplate[];
};

export default function Create({
    evaluationCycles,
    employees,
    evaluationTemplates,
}: Props) {
    const { data, setData, post, processing, errors } = useForm({
        evaluation_cycle_id: '',
        employee_id: '',
        evaluation_template_id: '',
        status: 'draft',
        overall_comment: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/admin/evaluations');
    };

    return (
        <AppLayout>
            <Head title="評価設定登録" />

            <div className="p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">評価設定登録</h1>

                    <Link
                        href="/admin/evaluations"
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
                        <label className="mb-2 block text-sm font-medium">評価期間</label>
                        <select
                            value={data.evaluation_cycle_id}
                            onChange={(e) => setData('evaluation_cycle_id', e.target.value)}
                            className="w-full rounded-md border px-3 py-2"
                        >
                            <option value="">選択してください</option>
                            {evaluationCycles.map((cycle) => (
                                <option key={cycle.id} value={cycle.id}>
                                    {cycle.name}
                                </option>
                            ))}
                        </select>
                        {errors.evaluation_cycle_id && (
                            <div className="mt-1 text-sm text-red-600">{errors.evaluation_cycle_id}</div>
                        )}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">被評価者</label>
                        <select
                            value={data.employee_id}
                            onChange={(e) => setData('employee_id', e.target.value)}
                            className="w-full rounded-md border px-3 py-2"
                        >
                            <option value="">選択してください</option>
                            {employees.map((employee) => (
                                <option key={employee.id} value={employee.id}>
                                    {employee.employee_number} {employee.last_name} {employee.first_name}
                                </option>
                            ))}
                        </select>
                        {errors.employee_id && (
                            <div className="mt-1 text-sm text-red-600">{errors.employee_id}</div>
                        )}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">評価テンプレート</label>
                        <select
                            value={data.evaluation_template_id}
                            onChange={(e) => setData('evaluation_template_id', e.target.value)}
                            className="w-full rounded-md border px-3 py-2"
                        >
                            <option value="">選択してください</option>
                            {evaluationTemplates.map((template) => (
                                <option key={template.id} value={template.id}>
                                    {template.name}
                                </option>
                            ))}
                        </select>
                        {errors.evaluation_template_id && (
                            <div className="mt-1 text-sm text-red-600">{errors.evaluation_template_id}</div>
                        )}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">状態</label>
                        <select
                            value={data.status}
                            onChange={(e) => setData('status', e.target.value as 'draft' | 'in_progress' | 'completed')}
                            className="w-full rounded-md border px-3 py-2"
                        >
                            <option value="draft">下書き</option>
                            <option value="in_progress">評価中</option>
                            <option value="completed">完了</option>
                        </select>
                        {errors.status && (
                            <div className="mt-1 text-sm text-red-600">{errors.status}</div>
                        )}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">総評メモ</label>
                        <textarea
                            value={data.overall_comment}
                            onChange={(e) => setData('overall_comment', e.target.value)}
                            rows={4}
                            className="w-full rounded-md border px-3 py-2"
                        />
                        {errors.overall_comment && (
                            <div className="mt-1 text-sm text-red-600">{errors.overall_comment}</div>
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
                            href="/admin/evaluations"
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