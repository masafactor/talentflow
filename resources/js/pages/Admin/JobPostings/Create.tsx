import FlashMessage from '@/components/flash-message';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import FormEventHandler = React.FormEventHandler;

type Option = {
    id: number;
    name: string;
};

type Props = {
    departments: Option[];
    employmentTypes: Option[];
};

export default function Create({ departments, employmentTypes }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        department_id: '',
        employment_type_id: '',
        title: '',
        description: '',
        number_of_positions: 1,
        status: 'draft',
        opened_on: '',
        closed_on: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/admin/job-postings');
    };

    return (
        <AppLayout>
            <Head title="求人登録" />

            <div className="p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">求人登録</h1>

                    <Link
                        href="/admin/job-postings"
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
                            <label className="mb-2 block text-sm font-medium">求人名</label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                className="w-full rounded-md border px-3 py-2"
                            />
                            {errors.title && (
                                <div className="mt-1 text-sm text-red-600">{errors.title}</div>
                            )}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">募集人数</label>
                            <input
                                type="number"
                                value={data.number_of_positions}
                                onChange={(e) => setData('number_of_positions', Number(e.target.value))}
                                className="w-full rounded-md border px-3 py-2"
                                min={1}
                            />
                            {errors.number_of_positions && (
                                <div className="mt-1 text-sm text-red-600">{errors.number_of_positions}</div>
                            )}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">募集部署</label>
                            <select
                                value={data.department_id}
                                onChange={(e) => setData('department_id', e.target.value)}
                                className="w-full rounded-md border px-3 py-2"
                            >
                                <option value="">未選択</option>
                                {departments.map((department) => (
                                    <option key={department.id} value={department.id}>
                                        {department.name}
                                    </option>
                                ))}
                            </select>
                            {errors.department_id && (
                                <div className="mt-1 text-sm text-red-600">{errors.department_id}</div>
                            )}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">雇用形態</label>
                            <select
                                value={data.employment_type_id}
                                onChange={(e) => setData('employment_type_id', e.target.value)}
                                className="w-full rounded-md border px-3 py-2"
                            >
                                <option value="">未選択</option>
                                {employmentTypes.map((employmentType) => (
                                    <option key={employmentType.id} value={employmentType.id}>
                                        {employmentType.name}
                                    </option>
                                ))}
                            </select>
                            {errors.employment_type_id && (
                                <div className="mt-1 text-sm text-red-600">{errors.employment_type_id}</div>
                            )}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">状態</label>
                            <select
                                value={data.status}
                                onChange={(e) => setData('status', e.target.value as 'draft' | 'open' | 'closed')}
                                className="w-full rounded-md border px-3 py-2"
                            >
                                <option value="draft">下書き</option>
                                <option value="open">募集中</option>
                                <option value="closed">募集終了</option>
                            </select>
                            {errors.status && (
                                <div className="mt-1 text-sm text-red-600">{errors.status}</div>
                            )}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">募集開始日</label>
                            <input
                                type="date"
                                value={data.opened_on}
                                onChange={(e) => setData('opened_on', e.target.value)}
                                className="w-full rounded-md border px-3 py-2"
                            />
                            {errors.opened_on && (
                                <div className="mt-1 text-sm text-red-600">{errors.opened_on}</div>
                            )}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">募集終了日</label>
                            <input
                                type="date"
                                value={data.closed_on}
                                onChange={(e) => setData('closed_on', e.target.value)}
                                className="w-full rounded-md border px-3 py-2"
                            />
                            {errors.closed_on && (
                                <div className="mt-1 text-sm text-red-600">{errors.closed_on}</div>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">求人説明</label>
                        <textarea
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            className="w-full rounded-md border px-3 py-2"
                            rows={5}
                        />
                        {errors.description && (
                            <div className="mt-1 text-sm text-red-600">{errors.description}</div>
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
                            href="/admin/job-postings"
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