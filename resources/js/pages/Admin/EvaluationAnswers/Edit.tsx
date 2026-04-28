import FlashMessage from '@/components/flash-message';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEventHandler } from 'react';

type TemplateItem = {
    id: number;
    category: string | null;
    question: string;
    input_type: 'score' | 'text';
    sort_order: number;
    is_required: boolean;
};

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
        items: TemplateItem[];
    };
};

type Reviewer = {
    id: number;
    reviewer_type: 'manager' | 'peer' | 'subordinate' | 'self';
    status: 'pending' | 'submitted';
    reviewer_employee: {
        id: number;
        employee_number: string;
        last_name: string;
        first_name: string;
    };
};

type ExistingAnswers = Record<
    number,
    {
        score_value: number | null;
        text_value: string | null;
    }
>;

type Props = {
    evaluation: Evaluation;
    reviewer: Reviewer;
    existingAnswers: ExistingAnswers;
};

type AnswerForm = {
    score_value: string;
    text_value: string;
};

export default function Edit({ evaluation, reviewer, existingAnswers }: Props) {
    const initialAnswers: Record<number, AnswerForm> = {};

    evaluation.template.items.forEach((item) => {
        const existing = existingAnswers[item.id];
        initialAnswers[item.id] = {
            score_value:
                existing?.score_value !== null && existing?.score_value !== undefined
                    ? String(existing.score_value)
                    : '',
            text_value: existing?.text_value ?? '',
        };
    });

    const { data, setData, post, processing, errors } = useForm({
        answers: initialAnswers,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(`/admin/evaluations/${evaluation.id}/reviewers/${reviewer.id}/answer`);
    };

    return (
        <AppLayout>
            <Head title="評価入力" />

            <div className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">評価入力</h1>
                        <p className="mt-1 text-sm text-gray-500">
                            評価期間: {evaluation.cycle.name}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                            被評価者: {evaluation.employee.employee_number} {evaluation.employee.last_name} {evaluation.employee.first_name}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                            評価者: {reviewer.reviewer_employee.employee_number} {reviewer.reviewer_employee.last_name} {reviewer.reviewer_employee.first_name}
                        </p>
                    </div>

                    <Link
                        href={`/admin/evaluations/${evaluation.id}/reviewers`}
                        className="rounded-md border px-4 py-2 text-sm"
                    >
                        評価者一覧へ戻る
                    </Link>
                </div>

                <div className="mt-4">
                    <FlashMessage />
                </div>

                <div className="mt-6 rounded-lg border p-4 text-sm text-gray-600">
                    テンプレート: {evaluation.template.name}
                </div>

                <form onSubmit={submit} className="mt-6 space-y-6">
                    {evaluation.template.items.map((item) => (
                        <div key={item.id} className="rounded-lg border p-6">
                            <div className="mb-2 text-sm text-gray-500">
                                {item.category ?? 'カテゴリなし'}
                            </div>

                            <div className="mb-4 font-medium">
                                {item.question}
                                {item.is_required && (
                                    <span className="ml-2 text-sm text-red-600">必須</span>
                                )}
                            </div>

                            {item.input_type === 'score' && (
                                <div>
                                    <select
                                        value={data.answers[item.id]?.score_value ?? ''}
                                        onChange={(e) =>
                                            setData('answers', {
                                                ...data.answers,
                                                [item.id]: {
                                                    ...data.answers[item.id],
                                                    score_value: e.target.value,
                                                },
                                            })
                                        }
                                        className="w-full rounded-md border px-3 py-2"
                                    >
                                        <option value="">選択してください</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select>

                                    {errors[`answers.${item.id}.score_value` as keyof typeof errors] && (
                                        <div className="mt-1 text-sm text-red-600">
                                            {errors[`answers.${item.id}.score_value` as keyof typeof errors]}
                                        </div>
                                    )}
                                </div>
                            )}

                            {item.input_type === 'text' && (
                                <div>
                                    <textarea
                                        value={data.answers[item.id]?.text_value ?? ''}
                                        onChange={(e) =>
                                            setData('answers', {
                                                ...data.answers,
                                                [item.id]: {
                                                    ...data.answers[item.id],
                                                    text_value: e.target.value,
                                                },
                                            })
                                        }
                                        rows={4}
                                        className="w-full rounded-md border px-3 py-2"
                                    />

                                    {errors[`answers.${item.id}.text_value` as keyof typeof errors] && (
                                        <div className="mt-1 text-sm text-red-600">
                                            {errors[`answers.${item.id}.text_value` as keyof typeof errors]}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}

                    <div className="flex gap-3">
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-md bg-black px-4 py-2 text-sm text-white disabled:opacity-50"
                        >
                            保存
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