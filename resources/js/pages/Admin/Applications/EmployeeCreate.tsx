import FlashMessage from '@/components/flash-message';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEventHandler } from 'react';

type Position = {
    id: number;
    name: string;
};

type Application = {
    id: number;
    candidate: {
        last_name: string;
        first_name: string;
        last_name_kana: string | null;
        first_name_kana: string | null;
        email: string | null;
        phone: string | null;
    };
    job_posting: {
        title: string;
        department: { id: number; name: string } | null;
        employment_type: { id: number; name: string } | null;
    };
};

type Props = {
    application: Application;
    positions: Position[];
};

export default function EmployeeCreate({ application, positions }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        employee_number: '',
        position_id: '',
        joined_on: '',
        status: 'active',
        note: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(`/admin/applications/${application.id}/employee-register`);
    };

    return (
        <AppLayout>
            <Head title="従業員登録" />

            <div className="p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">採用通過者からの従業員登録</h1>

                    <Link
                        href={`/admin/applications/${application.id}`}
                        className="rounded-md border px-4 py-2 text-sm"
                    >
                        応募詳細へ戻る
                    </Link>
                </div>

                <div className="mt-4">
                    <FlashMessage />
                </div>

                <div className="mt-6 rounded-lg border p-6">
                    <h2 className="text-lg font-semibold">応募情報からの初期反映</h2>

                    <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 text-sm">
                        <div>
                            <div className="text-gray-500">応募者名</div>
                            <div>
                                {application.candidate.last_name} {application.candidate.first_name}
                            </div>
                        </div>

                        <div>
                            <div className="text-gray-500">応募者カナ</div>
                            <div>
                                {application.candidate.last_name_kana ?? ''}{' '}
                                {application.candidate.first_name_kana ?? ''}
                            </div>
                        </div>

                        <div>
                            <div className="text-gray-500">メールアドレス</div>
                            <div>{application.candidate.email ?? '-'}</div>
                        </div>

                        <div>
                            <div className="text-gray-500">電話番号</div>
                            <div>{application.candidate.phone ?? '-'}</div>
                        </div>

                        <div>
                            <div className="text-gray-500">求人</div>
                            <div>{application.job_posting.title}</div>
                        </div>

                        <div>
                            <div className="text-gray-500">部署 / 雇用形態</div>
                            <div>
                                {application.job_posting.department?.name ?? '-'} /{' '}
                                {application.job_posting.employment_type?.name ?? '-'}
                            </div>
                        </div>
                    </div>
                </div>

                <form onSubmit={submit} className="mt-6 space-y-6 rounded-lg border p-6">
                    <div>
                        <label className="mb-2 block text-sm font-medium">従業員番号</label>
                        <input
                            type="text"
                            value={data.employee_number}
                            onChange={(e) => setData('employee_number', e.target.value)}
                            className="w-full rounded-md border px-3 py-2"
                        />
                        {errors.employee_number && (
                            <div className="mt-1 text-sm text-red-600">{errors.employee_number}</div>
                        )}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">役職</label>
                        <select
                            value={data.position_id}
                            onChange={(e) => setData('position_id', e.target.value)}
                            className="w-full rounded-md border px-3 py-2"
                        >
                            <option value="">未設定</option>
                            {positions.map((position) => (
                                <option key={position.id} value={position.id}>
                                    {position.name}
                                </option>
                            ))}
                        </select>
                        {errors.position_id && (
                            <div className="mt-1 text-sm text-red-600">{errors.position_id}</div>
                        )}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">入社日</label>
                        <input
                            type="date"
                            value={data.joined_on}
                            onChange={(e) => setData('joined_on', e.target.value)}
                            className="w-full rounded-md border px-3 py-2"
                        />
                        {errors.joined_on && (
                            <div className="mt-1 text-sm text-red-600">{errors.joined_on}</div>
                        )}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">状態</label>
                        <select
                            value={data.status}
                            onChange={(e) =>
                                setData('status', e.target.value as 'active' | 'on_leave' | 'retired')
                            }
                            className="w-full rounded-md border px-3 py-2"
                        >
                            <option value="active">在籍</option>
                            <option value="on_leave">休職中</option>
                            <option value="retired">退職</option>
                        </select>
                        {errors.status && (
                            <div className="mt-1 text-sm text-red-600">{errors.status}</div>
                        )}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">備考</label>
                        <textarea
                            value={data.note}
                            onChange={(e) => setData('note', e.target.value)}
                            rows={4}
                            className="w-full rounded-md border px-3 py-2"
                        />
                        {errors.note && (
                            <div className="mt-1 text-sm text-red-600">{errors.note}</div>
                        )}
                    </div>

                    <div className="flex gap-3">
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-md bg-emerald-600 px-4 py-2 text-sm text-white disabled:opacity-50"
                        >
                            従業員登録する
                        </button>

                        <Link
                            href={`/admin/applications/${application.id}`}
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