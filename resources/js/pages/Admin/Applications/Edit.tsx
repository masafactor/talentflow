import FlashMessage from '@/components/flash-message';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import FormEventHandler = React.FormEventHandler;

type Candidate = {
    id: number;
    last_name: string;
    first_name: string;
};

type JobPosting = {
    id: number;
    title: string;
};

type RecruitmentRoute = {
    id: number;
    name: string;
    type: string | null;
};

type Employee = {
    id: number;
    employee_number: string;
    last_name: string;
    first_name: string;
};

type Application = {
    id: number;
    candidate_id: number;
    job_posting_id: number;
    recruitment_route_id: number | null;
    referrer_employee_id: number | null;
    connection_name: string | null;
    relationship_note: string | null;
    is_incentive_target: boolean;
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
    note: string | null;
};

type Props = {
    application: Application;
    candidates: Candidate[];
    jobPostings: JobPosting[];
    recruitmentRoutes: RecruitmentRoute[];
    employees: Employee[];
};

export default function Edit({
    application,
    candidates,
    jobPostings,
    recruitmentRoutes,
    employees,
}: Props) {
    const { data, setData, put, processing, errors } = useForm({
        candidate_id: String(application.candidate_id),
        job_posting_id: String(application.job_posting_id),
        recruitment_route_id: application.recruitment_route_id
            ? String(application.recruitment_route_id)
            : '',
        referrer_employee_id: application.referrer_employee_id
            ? String(application.referrer_employee_id)
            : '',
        connection_name: application.connection_name ?? '',
        relationship_note: application.relationship_note ?? '',
        is_incentive_target: application.is_incentive_target,
        status: application.status,
        applied_on: application.applied_on ?? '',
        note: application.note ?? '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(`/admin/applications/${application.id}`);
    };

    return (
        <AppLayout>
            <Head title="応募編集" />

            <div className="p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">応募編集</h1>

                    <Link
                        href="/admin/applications"
                        className="rounded-md border px-4 py-2 text-sm"
                    >
                        一覧へ戻る
                    </Link>
                </div>

                <div className="mt-4">
                    <FlashMessage />
                </div>

                <form onSubmit={submit} className="mt-6 space-y-6 rounded-lg border p-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div>
                            <label className="mb-2 block text-sm font-medium">応募者</label>
                            <select
                                value={data.candidate_id}
                                onChange={(e) => setData('candidate_id', e.target.value)}
                                className="w-full rounded-md border px-3 py-2"
                            >
                                {candidates.map((candidate) => (
                                    <option key={candidate.id} value={candidate.id}>
                                        {candidate.last_name} {candidate.first_name}
                                    </option>
                                ))}
                            </select>
                            {errors.candidate_id && (
                                <div className="mt-1 text-sm text-red-600">{errors.candidate_id}</div>
                            )}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">求人</label>
                            <select
                                value={data.job_posting_id}
                                onChange={(e) => setData('job_posting_id', e.target.value)}
                                className="w-full rounded-md border px-3 py-2"
                            >
                                {jobPostings.map((jobPosting) => (
                                    <option key={jobPosting.id} value={jobPosting.id}>
                                        {jobPosting.title}
                                    </option>
                                ))}
                            </select>
                            {errors.job_posting_id && (
                                <div className="mt-1 text-sm text-red-600">{errors.job_posting_id}</div>
                            )}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">採用経路</label>
                            <select
                                value={data.recruitment_route_id}
                                onChange={(e) => setData('recruitment_route_id', e.target.value)}
                                className="w-full rounded-md border px-3 py-2"
                            >
                                <option value="">未選択</option>
                                {recruitmentRoutes.map((route) => (
                                    <option key={route.id} value={route.id}>
                                        {route.name}
                                    </option>
                                ))}
                            </select>
                            {errors.recruitment_route_id && (
                                <div className="mt-1 text-sm text-red-600">{errors.recruitment_route_id}</div>
                            )}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">紹介者社員</label>
                            <select
                                value={data.referrer_employee_id}
                                onChange={(e) => setData('referrer_employee_id', e.target.value)}
                                className="w-full rounded-md border px-3 py-2"
                            >
                                <option value="">未選択</option>
                                {employees.map((employee) => (
                                    <option key={employee.id} value={employee.id}>
                                        {employee.employee_number} {employee.last_name} {employee.first_name}
                                    </option>
                                ))}
                            </select>
                            {errors.referrer_employee_id && (
                                <div className="mt-1 text-sm text-red-600">{errors.referrer_employee_id}</div>
                            )}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">関係者名</label>
                            <input
                                type="text"
                                value={data.connection_name}
                                onChange={(e) => setData('connection_name', e.target.value)}
                                className="w-full rounded-md border px-3 py-2"
                            />
                            {errors.connection_name && (
                                <div className="mt-1 text-sm text-red-600">{errors.connection_name}</div>
                            )}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">関係性メモ</label>
                            <input
                                type="text"
                                value={data.relationship_note}
                                onChange={(e) => setData('relationship_note', e.target.value)}
                                className="w-full rounded-md border px-3 py-2"
                            />
                            {errors.relationship_note && (
                                <div className="mt-1 text-sm text-red-600">{errors.relationship_note}</div>
                            )}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">ステータス</label>
                            <select
                                value={data.status}
                                onChange={(e) =>
                                    setData(
                                        'status',
                                        e.target.value as
                                            | 'applied'
                                            | 'screening'
                                            | 'first_interview'
                                            | 'second_interview'
                                            | 'final_interview'
                                            | 'offered'
                                            | 'hired'
                                            | 'rejected'
                                            | 'declined',
                                    )
                                }
                                className="w-full rounded-md border px-3 py-2"
                            >
                                <option value="applied">応募済み</option>
                                <option value="screening">書類選考中</option>
                                <option value="first_interview">一次面接</option>
                                <option value="second_interview">二次面接</option>
                                <option value="final_interview">最終面接</option>
                                <option value="offered">内定</option>
                                <option value="hired">採用</option>
                                <option value="rejected">不採用</option>
                                <option value="declined">辞退</option>
                            </select>
                            {errors.status && (
                                <div className="mt-1 text-sm text-red-600">{errors.status}</div>
                            )}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">応募日</label>
                            <input
                                type="date"
                                value={data.applied_on}
                                onChange={(e) => setData('applied_on', e.target.value)}
                                className="w-full rounded-md border px-3 py-2"
                            />
                            {errors.applied_on && (
                                <div className="mt-1 text-sm text-red-600">{errors.applied_on}</div>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            id="is_incentive_target"
                            type="checkbox"
                            checked={data.is_incentive_target}
                            onChange={(e) => setData('is_incentive_target', e.target.checked)}
                        />
                        <label htmlFor="is_incentive_target" className="text-sm">
                            インセンティブ対象
                        </label>
                    </div>
                    {errors.is_incentive_target && (
                        <div className="text-sm text-red-600">{errors.is_incentive_target}</div>
                    )}

                    <div>
                        <label className="mb-2 block text-sm font-medium">備考</label>
                        <textarea
                            value={data.note}
                            onChange={(e) => setData('note', e.target.value)}
                            className="w-full rounded-md border px-3 py-2"
                            rows={5}
                        />
                        {errors.note && (
                            <div className="mt-1 text-sm text-red-600">{errors.note}</div>
                        )}
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
                            href="/admin/applications"
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