import FlashMessage from '@/components/flash-message';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';

type Option = {
    id: number;
    name: string;
};

type Employee = {
    id: number;
    employee_number: string;
    last_name: string;
    first_name: string;
    status: 'active' | 'on_leave' | 'retired';
    department: {
        id: number;
        name: string;
    } | null;
    position: {
        id: number;
        name: string;
    } | null;
    employment_type: {
        id: number;
        name: string;
    } | null;
};

type Filters = {
    keyword?: string;
    department_id?: string;
    employment_type_id?: string;
    status?: string;
};

type Props = {
    employees: Employee[];
    filters: Filters;
    departments: Option[];
    employmentTypes: Option[];
};

const statusLabels: Record<Employee['status'], string> = {
    active: '在籍',
    on_leave: '休職中',
    retired: '退職',
};

export default function Index({
    employees,
    filters,
    departments,
    employmentTypes,
}: Props) {
    const search = () => {
        router.get(
            '/admin/employees',
            {
                keyword: filters.keyword ?? '',
                department_id: filters.department_id ?? '',
                employment_type_id: filters.employment_type_id ?? '',
                status: filters.status ?? '',
            },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    const reset = () => {
        router.get(
            '/admin/employees',
            {},
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    return (
        <AppLayout>
            <Head title="社員管理" />

            <div className="p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">社員管理</h1>

                    <Link
                        href="/admin/employees/create"
                        className="rounded-md bg-black px-4 py-2 text-sm text-white"
                    >
                        新規登録
                    </Link>
                </div>

                <div className="mt-4">
                    <FlashMessage />
                </div>

                <div className="mt-6 rounded-lg border p-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                        <div>
                            <label className="mb-2 block text-sm font-medium">キーワード</label>
                            <input
                                type="text"
                                defaultValue={filters.keyword ?? ''}
                                onChange={(e) => {
                                    filters.keyword = e.target.value;
                                }}
                                className="w-full rounded-md border px-3 py-2"
                                placeholder="社員番号・氏名・メール"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">部署</label>
                            <select
                                defaultValue={filters.department_id ?? ''}
                                onChange={(e) => {
                                    filters.department_id = e.target.value;
                                }}
                                className="w-full rounded-md border px-3 py-2"
                            >
                                <option value="">すべて</option>
                                {departments.map((department) => (
                                    <option key={department.id} value={department.id}>
                                        {department.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">雇用形態</label>
                            <select
                                defaultValue={filters.employment_type_id ?? ''}
                                onChange={(e) => {
                                    filters.employment_type_id = e.target.value;
                                }}
                                className="w-full rounded-md border px-3 py-2"
                            >
                                <option value="">すべて</option>
                                {employmentTypes.map((employmentType) => (
                                    <option key={employmentType.id} value={employmentType.id}>
                                        {employmentType.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">状態</label>
                            <select
                                defaultValue={filters.status ?? ''}
                                onChange={(e) => {
                                    filters.status = e.target.value;
                                }}
                                className="w-full rounded-md border px-3 py-2"
                            >
                                <option value="">すべて</option>
                                <option value="active">在籍</option>
                                <option value="on_leave">休職中</option>
                                <option value="retired">退職</option>
                            </select>
                        </div>
                    </div>

                    <div className="mt-4 flex gap-3">
                        <button
                            type="button"
                            onClick={search}
                            className="rounded-md bg-black px-4 py-2 text-sm text-white"
                        >
                            検索
                        </button>
                        <button
                            type="button"
                            onClick={reset}
                            className="rounded-md border px-4 py-2 text-sm"
                        >
                            リセット
                        </button>
                    </div>
                </div>

                <div className="mt-6 overflow-hidden rounded-lg border">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3">社員番号</th>
                                <th className="px-4 py-3">氏名</th>
                                <th className="px-4 py-3">部署</th>
                                <th className="px-4 py-3">役職</th>
                                <th className="px-4 py-3">雇用形態</th>
                                <th className="px-4 py-3">状態</th>
                                <th className="px-4 py-3">操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map((employee) => (
                                <tr key={employee.id} className="border-t">
                                    <td className="px-4 py-3">{employee.employee_number}</td>
                                    <td className="px-4 py-3">
                                        {employee.last_name} {employee.first_name}
                                    </td>
                                    <td className="px-4 py-3">{employee.department?.name ?? '-'}</td>
                                    <td className="px-4 py-3">{employee.position?.name ?? '-'}</td>
                                    <td className="px-4 py-3">
                                        {employee.employment_type?.name ?? '-'}
                                    </td>
                                    <td className="px-4 py-3">{statusLabels[employee.status]}</td>
                                    <td className="px-4 py-3 space-x-3">
                                        <Link
                                            href={`/admin/employees/${employee.id}`}
                                            className="text-sm text-sky-600 underline"
                                        >
                                            詳細
                                        </Link>
                                        <Link
                                            href={`/admin/employees/${employee.id}/edit`}
                                            className="text-sm text-blue-600 underline"
                                        >
                                            編集
                                        </Link>
                                    </td>
                                </tr>
                            ))}

                            {employees.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="px-4 py-6 text-center text-gray-500">
                                        条件に一致する社員がいません。
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}