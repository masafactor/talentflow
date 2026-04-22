import FlashMessage from '@/components/flash-message';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';

type Assignment = {
    id: number;
    start_date: string;
    end_date: string | null;
    change_reason: string | null;
    note: string | null;
    department: { id: number; name: string } | null;
    position: { id: number; name: string } | null;
    employment_type: { id: number; name: string } | null;
    changed_by: { id: number; name: string } | null;
};

type Employee = {
    id: number;
    employee_number: string;
    last_name: string;
    first_name: string;
    last_name_kana: string | null;
    first_name_kana: string | null;
    email: string | null;
    phone: string | null;
    joined_on: string;
    retired_on: string | null;
    status: 'active' | 'on_leave' | 'retired';
    note: string | null;
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
    employee: Employee;
    assignments: Assignment[];
};

const statusLabels: Record<Employee['status'], string> = {
    active: '在籍',
    on_leave: '休職中',
    retired: '退職',
};

export default function Show({ employee ,assignments}: Props) {
    return (
        <AppLayout>
            <Head title="社員詳細" />

            <div className="p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">社員詳細</h1>

                    <div className="flex gap-3">
                        <Link
                            href={`/admin/employees/${employee.id}/assignments/create`}
                            className="rounded-md border px-4 py-2 text-sm"
                        >
                            異動登録
                        </Link>
                        <Link
                            href={`/admin/employees/${employee.id}/edit`}
                            className="rounded-md bg-black px-4 py-2 text-sm text-white"
                        >
                            編集
                        </Link>
                        <Link
                            href="/admin/employees"
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
                    <div className="grid grid-cols-1 gap-0 md:grid-cols-2">
                        <div className="border-b p-4 md:border-r">
                            <div className="text-sm text-gray-500">社員番号</div>
                            <div className="mt-1">{employee.employee_number}</div>
                        </div>
                        <div className="border-b p-4">
                            <div className="text-sm text-gray-500">状態</div>
                            <div className="mt-1">{statusLabels[employee.status]}</div>
                        </div>

                        <div className="border-b p-4 md:border-r">
                            <div className="text-sm text-gray-500">氏名</div>
                            <div className="mt-1">
                                {employee.last_name} {employee.first_name}
                            </div>
                        </div>
                        <div className="border-b p-4">
                            <div className="text-sm text-gray-500">氏名カナ</div>
                            <div className="mt-1">
                                {(employee.last_name_kana ?? '')} {(employee.first_name_kana ?? '')}
                            </div>
                        </div>

                        <div className="border-b p-4 md:border-r">
                            <div className="text-sm text-gray-500">メールアドレス</div>
                            <div className="mt-1">{employee.email ?? '-'}</div>
                        </div>
                        <div className="border-b p-4">
                            <div className="text-sm text-gray-500">電話番号</div>
                            <div className="mt-1">{employee.phone ?? '-'}</div>
                        </div>

                        <div className="border-b p-4 md:border-r">
                            <div className="text-sm text-gray-500">部署</div>
                            <div className="mt-1">{employee.department?.name ?? '-'}</div>
                        </div>
                        <div className="border-b p-4">
                            <div className="text-sm text-gray-500">役職</div>
                            <div className="mt-1">{employee.position?.name ?? '-'}</div>
                        </div>

                        <div className="border-b p-4 md:border-r">
                            <div className="text-sm text-gray-500">雇用形態</div>
                            <div className="mt-1">{employee.employment_type?.name ?? '-'}</div>
                        </div>
                        <div className="border-b p-4">
                            <div className="text-sm text-gray-500">入社日</div>
                            <div className="mt-1">{employee.joined_on}</div>
                        </div>

                        <div className="border-b p-4 md:border-r">
                            <div className="text-sm text-gray-500">退職日</div>
                            <div className="mt-1">{employee.retired_on ?? '-'}</div>
                        </div>
                        <div className="border-b p-4">
                            <div className="text-sm text-gray-500">備考</div>
                            <div className="mt-1 whitespace-pre-wrap">{employee.note ?? '-'}</div>
                        </div>
                    </div>
                </div>
                <div className="mt-8 rounded-lg border">
                    <div className="border-b px-4 py-3">
                        <h2 className="text-lg font-semibold">所属履歴</h2>
                    </div>

                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3">開始日</th>
                                <th className="px-4 py-3">終了日</th>
                                <th className="px-4 py-3">部署</th>
                                <th className="px-4 py-3">役職</th>
                                <th className="px-4 py-3">雇用形態</th>
                                <th className="px-4 py-3">異動理由</th>
                                <th className="px-4 py-3">変更者</th>
                            </tr>
                        </thead>
                        <tbody>
                            {assignments.map((assignment) => (
                                <tr key={assignment.id} className="border-t">
                                    <td className="px-4 py-3">{assignment.start_date}</td>
                                    <td className="px-4 py-3">{assignment.end_date ?? '現在'}</td>
                                    <td className="px-4 py-3">{assignment.department?.name ?? '-'}</td>
                                    <td className="px-4 py-3">{assignment.position?.name ?? '-'}</td>
                                    <td className="px-4 py-3">{assignment.employment_type?.name ?? '-'}</td>
                                    <td className="px-4 py-3">{assignment.change_reason ?? '-'}</td>
                                    <td className="px-4 py-3">{assignment.changed_by?.name ?? '-'}</td>
                                </tr>
                            ))}

                            {assignments.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="px-4 py-6 text-center text-gray-500">
                                        所属履歴がありません。
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