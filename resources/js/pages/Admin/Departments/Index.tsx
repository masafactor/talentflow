import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';

type Department = {
    id: number;
    code: string;
    name: string;
    display_order: number;
    is_active: boolean;
};

type Props = {
    departments: Department[];
};

export default function Index({ departments }: Props) {
    return (
        <AppLayout>
            <Head title="部署管理" />

            <div className="p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">部署管理</h1>

                    <Link
                        href="/admin/departments/create"
                        className="rounded-md bg-black px-4 py-2 text-sm text-white"
                    >
                        新規登録
                    </Link>
                </div>

                <div className="mt-6 overflow-hidden rounded-lg border">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3">コード</th>
                                <th className="px-4 py-3">部署名</th>
                                <th className="px-4 py-3">表示順</th>
                                <th className="px-4 py-3">状態</th>
                                <th className="px-4 py-3">操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            {departments.map((department) => (
                                <tr key={department.id} className="border-t">
                                    <td className="px-4 py-3">{department.code}</td>
                                    <td className="px-4 py-3">{department.name}</td>
                                    <td className="px-4 py-3">{department.display_order}</td>
                                    <td className="px-4 py-3">
                                        {department.is_active ? '有効' : '無効'}
                                    </td>
                                    <td className="px-4 py-3">
                                        <Link
                                            href={`/admin/departments/${department.id}/edit`}
                                            className="text-sm text-blue-600 underline"
                                        >
                                            編集
                                        </Link>
                                    </td>
                                </tr>
                            ))}

                            {departments.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                                        部署が登録されていません。
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