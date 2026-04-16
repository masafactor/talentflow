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
    positions: Option[];
    employmentTypes: Option[];
};

export default function Create({ departments, positions, employmentTypes }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        department_id: '',
        position_id: '',
        employment_type_id: '',
        employee_number: '',
        last_name: '',
        first_name: '',
        last_name_kana: '',
        first_name_kana: '',
        email: '',
        phone: '',
        joined_on: '',
        retired_on: '',
        status: 'active',
        note: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/admin/employees');
    };

    return (
        <AppLayout>
            <Head title="社員登録" />

            <div className="p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">社員登録</h1>

                    <Link
                        href="/admin/employees"
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
                            <label className="mb-2 block text-sm font-medium">社員番号</label>
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
                            <label className="mb-2 block text-sm font-medium">状態</label>
                            <select
                                value={data.status}
                                onChange={(e) => setData('status', e.target.value as 'active' | 'on_leave' | 'retired')}
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
                            <label className="mb-2 block text-sm font-medium">姓</label>
                            <input
                                type="text"
                                value={data.last_name}
                                onChange={(e) => setData('last_name', e.target.value)}
                                className="w-full rounded-md border px-3 py-2"
                            />
                            {errors.last_name && (
                                <div className="mt-1 text-sm text-red-600">{errors.last_name}</div>
                            )}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">名</label>
                            <input
                                type="text"
                                value={data.first_name}
                                onChange={(e) => setData('first_name', e.target.value)}
                                className="w-full rounded-md border px-3 py-2"
                            />
                            {errors.first_name && (
                                <div className="mt-1 text-sm text-red-600">{errors.first_name}</div>
                            )}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">姓カナ</label>
                            <input
                                type="text"
                                value={data.last_name_kana}
                                onChange={(e) => setData('last_name_kana', e.target.value)}
                                className="w-full rounded-md border px-3 py-2"
                            />
                            {errors.last_name_kana && (
                                <div className="mt-1 text-sm text-red-600">{errors.last_name_kana}</div>
                            )}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">名カナ</label>
                            <input
                                type="text"
                                value={data.first_name_kana}
                                onChange={(e) => setData('first_name_kana', e.target.value)}
                                className="w-full rounded-md border px-3 py-2"
                            />
                            {errors.first_name_kana && (
                                <div className="mt-1 text-sm text-red-600">{errors.first_name_kana}</div>
                            )}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">メールアドレス</label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="w-full rounded-md border px-3 py-2"
                            />
                            {errors.email && (
                                <div className="mt-1 text-sm text-red-600">{errors.email}</div>
                            )}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">電話番号</label>
                            <input
                                type="text"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                className="w-full rounded-md border px-3 py-2"
                            />
                            {errors.phone && (
                                <div className="mt-1 text-sm text-red-600">{errors.phone}</div>
                            )}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">部署</label>
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
                            <label className="mb-2 block text-sm font-medium">役職</label>
                            <select
                                value={data.position_id}
                                onChange={(e) => setData('position_id', e.target.value)}
                                className="w-full rounded-md border px-3 py-2"
                            >
                                <option value="">未選択</option>
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
                            <label className="mb-2 block text-sm font-medium">退職日</label>
                            <input
                                type="date"
                                value={data.retired_on}
                                onChange={(e) => setData('retired_on', e.target.value)}
                                className="w-full rounded-md border px-3 py-2"
                            />
                            {errors.retired_on && (
                                <div className="mt-1 text-sm text-red-600">{errors.retired_on}</div>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">備考</label>
                        <textarea
                            value={data.note}
                            onChange={(e) => setData('note', e.target.value)}
                            className="w-full rounded-md border px-3 py-2"
                            rows={4}
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
                            登録
                        </button>

                        <Link
                            href="/admin/employees"
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