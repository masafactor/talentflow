import FlashMessage from '@/components/flash-message';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';

type Evaluation = {
    id: number;
    status: 'draft' | 'in_progress' | 'completed';
    overall_comment: string | null;
    cycle: {
        id: number;
        name: string;
    };
    employee: {
        id: number;
        employee_number: string;
        last_name: string;
        first_name: string;
        department: {
            id: number;
            name: string;
        } | null;
        position: {
            id: number;
            name: string;
        } | null;
    };
    template: {
        id: number;
        name: string;
    };
};

type ReviewerResult = {
    id: number;
    reviewer_type: 'manager' | 'peer' | 'subordinate' | 'self';
    status: 'pending' | 'submitted';
    submitted_at: string | null;
    average_score: number | null;
    reviewer_employee: {
        id: number;
        employee_number: string;
        last_name: string;
        first_name: string;
    } | null;
    answers: {
        id: number;
        score_value: number | null;
        text_value: string | null;
        template_item: {
            id: number;
            question: string;
            input_type: 'score' | 'text';
        };
    }[];
};

type ItemSummary = {
    id: number;
    category: string | null;
    question: string;
    input_type: 'score' | 'text';
    average_score: number | null;
    answer_count: number;
    self_average: number | null;
    others_average: number | null;
    gap: number | null;
};

type CategorySummary = {
    category: string;
    overall_average: number | null;
    self_average: number | null;
    others_average: number | null;
    gap: number | null;
    item_count: number;
};

type Props = {
    evaluation: Evaluation;
    typeAverages: {
        manager: number | null;
        peer: number | null;
        subordinate: number | null;
        self: number | null;
    };
    itemSummaries: ItemSummary[];
    reviewerResults: ReviewerResult[];
    gapSummary: {
        self_average: number | null;
        others_average: number | null;
        overall_gap: number | null;
    };
    categorySummaries: CategorySummary[];
};

const statusLabels: Record<Evaluation['status'], string> = {
    draft: '下書き',
    in_progress: '評価中',
    completed: '完了',
};

const reviewerTypeLabels: Record<ReviewerResult['reviewer_type'], string> = {
    manager: '上司',
    peer: '同僚',
    subordinate: '部下',
    self: '自己評価',
};



export default function Show({
    evaluation,
    typeAverages,
    itemSummaries,
    reviewerResults,
    gapSummary,
    categorySummaries,
}: Props) {
    return (
        <AppLayout>
            <Head title="評価結果" />

            <div className="p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">評価結果</h1>

                    <div className="flex gap-3">
                        <Link
                            href={`/admin/evaluations/${evaluation.id}/reviewers`}
                            className="rounded-md border px-4 py-2 text-sm"
                        >
                            評価者割当
                        </Link>
                        <Link
                            href="/admin/evaluations"
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
                        <h2 className="text-lg font-semibold">基本情報</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <div className="border-b p-4 md:border-r">
                            <div className="text-sm text-gray-500">評価期間</div>
                            <div className="mt-1">{evaluation.cycle.name}</div>
                        </div>
                        <div className="border-b p-4">
                            <div className="text-sm text-gray-500">状態</div>
                            <div className="mt-1">{statusLabels[evaluation.status]}</div>
                        </div>

                        <div className="border-b p-4 md:border-r">
                            <div className="text-sm text-gray-500">被評価者</div>
                            <div className="mt-1">
                                {evaluation.employee.employee_number} {evaluation.employee.last_name} {evaluation.employee.first_name}
                            </div>
                        </div>
                        <div className="border-b p-4">
                            <div className="text-sm text-gray-500">テンプレート</div>
                            <div className="mt-1">{evaluation.template.name}</div>
                        </div>

                        <div className="border-b p-4 md:border-r">
                            <div className="text-sm text-gray-500">部署</div>
                            <div className="mt-1">{evaluation.employee.department?.name ?? '-'}</div>
                        </div>
                        <div className="border-b p-4">
                            <div className="text-sm text-gray-500">役職</div>
                            <div className="mt-1">{evaluation.employee.position?.name ?? '-'}</div>
                        </div>

                        <div className="p-4 md:col-span-2">
                            <div className="text-sm text-gray-500">総評メモ</div>
                            <div className="mt-1 whitespace-pre-wrap">{evaluation.overall_comment ?? '-'}</div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 rounded-lg border">
                    <div className="border-b px-4 py-3">
                        <h2 className="text-lg font-semibold">区分別平均</h2>
                    </div>

                    <div className="mt-8 rounded-lg border">
    <div className="border-b px-4 py-3">
        <h2 className="text-lg font-semibold">自己評価と他者評価の差分</h2>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="border-b p-4 md:border-r">
            <div className="text-sm text-gray-500">自己評価平均</div>
            <div className="mt-1 text-xl font-semibold">{gapSummary.self_average ?? '-'}</div>
        </div>
        <div className="border-b p-4 md:border-r">
            <div className="text-sm text-gray-500">他者平均</div>
            <div className="mt-1 text-xl font-semibold">{gapSummary.others_average ?? '-'}</div>
        </div>
        <div className="border-b p-4">
            <div className="text-sm text-gray-500">差分（自己 - 他者）</div>
            <div className="mt-1 text-xl font-semibold">
                {gapSummary.overall_gap ?? '-'}
            </div>
        </div>
    </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4">
                        <div className="border-b p-4 md:border-r">
                            <div className="text-sm text-gray-500">上司</div>
                            <div className="mt-1 text-xl font-semibold">{typeAverages.manager ?? '-'}</div>
                        </div>
                        <div className="border-b p-4 md:border-r">
                            <div className="text-sm text-gray-500">同僚</div>
                            <div className="mt-1 text-xl font-semibold">{typeAverages.peer ?? '-'}</div>
                        </div>
                        <div className="border-b p-4 md:border-r">
                            <div className="text-sm text-gray-500">部下</div>
                            <div className="mt-1 text-xl font-semibold">{typeAverages.subordinate ?? '-'}</div>
                        </div>
                        <div className="border-b p-4">
                            <div className="text-sm text-gray-500">自己評価</div>
                            <div className="mt-1 text-xl font-semibold">{typeAverages.self ?? '-'}</div>
                        </div>
                    </div>
                </div>

              <div className="mt-8 rounded-lg border">
                <div className="border-b px-4 py-3">
                    <h2 className="text-lg font-semibold">設問別平均</h2>
                </div>

                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-3">カテゴリ</th>
                            <th className="px-4 py-3">設問</th>
                            <th className="px-4 py-3">入力形式</th>
                            <th className="px-4 py-3">全体平均</th>
                            <th className="px-4 py-3">自己評価</th>
                            <th className="px-4 py-3">他者平均</th>
                            <th className="px-4 py-3">差分</th>
                            <th className="px-4 py-3">回答数</th>
                        </tr>
                    </thead>
                    <tbody>
                        {itemSummaries.map((item) => (
                            <tr key={item.id} className="border-t">
                                <td className="px-4 py-3">{item.category ?? '-'}</td>
                                <td className="px-4 py-3">{item.question}</td>
                                <td className="px-4 py-3">
                                    {item.input_type === 'score' ? '点数' : '自由記述'}
                                </td>
                                <td className="px-4 py-3">
                                    {item.input_type === 'score' ? (item.average_score ?? '-') : '-'}
                                </td>
                                <td className="px-4 py-3">
                                    {item.input_type === 'score' ? (item.self_average ?? '-') : '-'}
                                </td>
                                <td className="px-4 py-3">
                                    {item.input_type === 'score' ? (item.others_average ?? '-') : '-'}
                                </td>
                                <td className="px-4 py-3">
                                    {item.input_type === 'score' ? (item.gap ?? '-') : '-'}
                                </td>
                                <td className="px-4 py-3">{item.answer_count}</td>
                            </tr>
                        ))}

                        {itemSummaries.length === 0 && (
                            <tr>
                                <td colSpan={8} className="px-4 py-6 text-center text-gray-500">
                                    設問がありません。
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
              </div>

              <div className="mt-8 rounded-lg border">
                <div className="border-b px-4 py-3">
                    <h2 className="text-lg font-semibold">カテゴリ別集計</h2>
                </div>

                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3">カテゴリ</th>
                                <th className="px-4 py-3">全体平均</th>
                                <th className="px-4 py-3">自己評価</th>
                                <th className="px-4 py-3">他者平均</th>
                                <th className="px-4 py-3">差分</th>
                                <th className="px-4 py-3">設問数</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categorySummaries.map((category) => (
                                <tr key={category.category} className="border-t">
                                    <td className="px-4 py-3">{category.category}</td>
                                    <td className="px-4 py-3">{category.overall_average ?? '-'}</td>
                                    <td className="px-4 py-3">{category.self_average ?? '-'}</td>
                                    <td className="px-4 py-3">{category.others_average ?? '-'}</td>
                                    <td className="px-4 py-3">{category.gap ?? '-'}</td>
                                    <td className="px-4 py-3">{category.item_count}</td>
                                </tr>
                            ))}

                            {categorySummaries.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                                        カテゴリ別集計データがありません。
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="mt-8 rounded-lg border">
                    <div className="border-b px-4 py-3">
                        <h2 className="text-lg font-semibold">評価者別結果</h2>
                    </div>

                    <div className="space-y-6 p-4">
                        {reviewerResults.map((reviewer) => (
                            <div key={reviewer.id} className="rounded-lg border">
                                <div className="border-b px-4 py-3">
                                    <div className="font-medium">
                                        {reviewer.reviewer_employee
                                            ? `${reviewer.reviewer_employee.employee_number} ${reviewer.reviewer_employee.last_name} ${reviewer.reviewer_employee.first_name}`
                                            : '不明'}
                                    </div>
                                    <div className="mt-1 text-sm text-gray-500">
                                        区分: {reviewerTypeLabels[reviewer.reviewer_type]} / 平均点: {reviewer.average_score ?? '-'} / 状態: {reviewer.status === 'submitted' ? '回答済み' : '未回答'}
                                    </div>
                                </div>

                                <table className="w-full text-left text-sm">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-4 py-3">設問</th>
                                            <th className="px-4 py-3">点数</th>
                                            <th className="px-4 py-3">コメント</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {reviewer.answers.map((answer) => (
                                            <tr key={answer.id} className="border-t">
                                                <td className="px-4 py-3">{answer.template_item.question}</td>
                                                <td className="px-4 py-3">{answer.score_value ?? '-'}</td>
                                                <td className="px-4 py-3 whitespace-pre-wrap">{answer.text_value ?? '-'}</td>
                                            </tr>
                                        ))}

                                        {reviewer.answers.length === 0 && (
                                            <tr>
                                                <td colSpan={3} className="px-4 py-6 text-center text-gray-500">
                                                    回答がありません。
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        ))}

                        {reviewerResults.length === 0 && (
                            <div className="py-6 text-center text-gray-500">
                                評価者結果がありません。
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}