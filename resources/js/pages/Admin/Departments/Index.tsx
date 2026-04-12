import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

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
                <h1 className="text-2xl font-bold">部署管理</h1>

                <div className="mt-6 overflow-hidden rounded-lg border">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3">コード</th>
                                <th className="px-4 py-3">部署名</th>
                                <th className="px-4 py-3">表示順</th>
                                <th className="px-4 py-3">状態</th>
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
                                </tr>
                            ))}

                            {departments.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-4 py-6 text-center text-gray-500">
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