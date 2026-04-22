import FlashMessage from '@/components/flash-message';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEventHandler } from 'react';

type Employee = {
    id: number;
    employee_number: string;
    last_name: string;
    first_name: string;
    department: { id: number; name: string } | null;
    position: { id: number; name: string } | null;
    employment_type: { id: number; name: string } | null;
};

type Option = {
    id: number;
    name: string;
};

type Props = {
    employee: Employee;
    departments: Option[];
    positions: Option[];
    employmentTypes: Option[];
};

export default function Create({
    employee,
    departments,
    positions,
    employmentTypes,
}: Props) {
    const { data, setData, post, processing, errors } = useForm({
        department_id: employee.department?.id ? String(employee.department.id) : '',
        position_id: employee.position?.id ? String(employee.position.id) : '',
        employment_type_id: employee.employment_type?.id ? String(employee.employment_type.id) : '',
        start_date: '',
        change_reason: '',
        note: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(`/admin/employees/${employee.id}/assignments`);
    };

    return (
        <AppLayout>
            <Head title="異動登録" />

            <div className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">異動登録</h1>
                        <p className="mt-1 text-sm text-gray-500">
                            対象: {employee.employee_number} {employee.last_name} {employee.first_name}
                        </p>
                    </div>

                    <Link
                        href={`/admin/employees/${employee.id}`}
                        className="rounded-md border px-4 py-2 text-sm"
                    >
                        従業員詳細へ戻る
                    </Link>
                </div>

                <div className="mt-4">
                    <FlashMessage />
                </div>

                <div className="mt-6 rounded-lg border p-6 text-sm">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div>
                            <div className="text-gray-500">現在部署</div>
                            <div>{employee.department?.name ?? '-'}</div>
                        </div>
                        <div>
                            <div className="text-gray-500">現在役職</div>
                            <div>{employee.position?.name ?? '-'}</div>
                        </div>
                        <div>
                            <div className="text-gray-500">現在雇用形態</div>
                            <div>{employee.employment_type?.name ?? '-'}</div>
                        </div>
                    </div>
                </div>

                <form onSubmit={submit} className="mt-6 space-y-6 rounded-lg border p-6">
                    <div>
                        <label className="mb-2 block text-sm font-medium">部署</label>
                        <select
                            value={data.department_id}
                            onChange={(e) => setData('department_id', e.target.value)}
                            className="w-full rounded-md border px-3 py-2"
                        >
                            <option value="">未設定</option>
                            {departments.map((department) => (
                                <option key={department.id} value={department.id}>
                                    {department.name}
                                </option>
                            ))}
                        </select>
                        {errors.department_id && <div className="mt-1 text-sm text-red-600">{errors.department_id}</div>}
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
                        {errors.position_id && <div className="mt-1 text-sm text-red-600">{errors.position_id}</div>}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">雇用形態</label>
                        <select
                            value={data.employment_type_id}
                            onChange={(e) => setData('employment_type_id', e.target.value)}
                            className="w-full rounded-md border px-3 py-2"
                        >
                            <option value="">未設定</option>
                            {employmentTypes.map((employmentType) => (
                                <option key={employmentType.id} value={employmentType.id}>
                                    {employmentType.name}
                                </option>
                            ))}
                        </select>
                        {errors.employment_type_id && <div className="mt-1 text-sm text-red-600">{errors.employment_type_id}</div>}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">発令日</label>
                        <input
                            type="date"
                            value={data.start_date}
                            onChange={(e) => setData('start_date', e.target.value)}
                            className="w-full rounded-md border px-3 py-2"
                        />
                        {errors.start_date && <div className="mt-1 text-sm text-red-600">{errors.start_date}</div>}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">異動理由</label>
                        <input
                            type="text"
                            value={data.change_reason}
                            onChange={(e) => setData('change_reason', e.target.value)}
                            className="w-full rounded-md border px-3 py-2"
                            placeholder="部署異動 / 昇進 / 雇用形態変更 など"
                        />
                        {errors.change_reason && <div className="mt-1 text-sm text-red-600">{errors.change_reason}</div>}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">備考</label>
                        <textarea
                            value={data.note}
                            onChange={(e) => setData('note', e.target.value)}
                            rows={4}
                            className="w-full rounded-md border px-3 py-2"
                        />
                        {errors.note && <div className="mt-1 text-sm text-red-600">{errors.note}</div>}
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
                            href={`/admin/employees/${employee.id}`}
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