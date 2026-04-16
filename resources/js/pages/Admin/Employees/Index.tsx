import FlashMessage from '@/components/flash-message';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';

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

type Props = {
    employees: Employee[];
};

const statusLabels: Record<Employee['status'], string> = {
    active: '在籍',
    on_leave: '休職中',
    retired: '退職',
};

export default function Index({ employees }: Props) {
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
                                    <td className="px-4 py-3">
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
                                        社員が登録されていません。
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