import FlashMessage from '@/components/flash-message';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';

type EmploymentType = {
    id: number;
    name: string;
    display_order: number;
    is_active: boolean;
};

type Props = {
    employmentTypes: EmploymentType[];
};

export default function Index({ employmentTypes }: Props) {
    return (
        <AppLayout>
            <Head title="雇用形態管理" />

            <div className="p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">雇用形態管理</h1>

                    <Link
                        href="/admin/employment-types/create"
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
                                <th className="px-4 py-3">雇用形態名</th>
                                <th className="px-4 py-3">表示順</th>
                                <th className="px-4 py-3">状態</th>
                                <th className="px-4 py-3">操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employmentTypes.map((employmentType) => (
                                <tr key={employmentType.id} className="border-t">
                                    <td className="px-4 py-3">{employmentType.name}</td>
                                    <td className="px-4 py-3">{employmentType.display_order}</td>
                                    <td className="px-4 py-3">
                                        {employmentType.is_active ? '有効' : '無効'}
                                    </td>
                                    <td className="px-4 py-3">
                                        <Link
                                            href={`/admin/employment-types/${employmentType.id}/edit`}
                                            className="text-sm text-blue-600 underline"
                                        >
                                            編集
                                        </Link>
                                    </td>
                                </tr>
                            ))}

                            {employmentTypes.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-4 py-6 text-center text-gray-500">
                                        雇用形態が登録されていません。
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