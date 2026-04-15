import FlashMessage from '@/components/flash-message';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';

type Position = {
    id: number;
    name: string;
    is_manager: boolean;
    display_order: number;
    is_active: boolean;
};

type Props = {
    positions: Position[];
};

export default function Index({ positions }: Props) {
    return (
        <AppLayout>
            <Head title="役職管理" />

            <div className="p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">役職管理</h1>

                    <Link
                        href="/admin/positions/create"
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
                                <th className="px-4 py-3">役職名</th>
                                <th className="px-4 py-3">管理職</th>
                                <th className="px-4 py-3">表示順</th>
                                <th className="px-4 py-3">状態</th>
                                <th className="px-4 py-3">操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            {positions.map((position) => (
                                <tr key={position.id} className="border-t">
                                    <td className="px-4 py-3">{position.name}</td>
                                    <td className="px-4 py-3">
                                        {position.is_manager ? 'はい' : 'いいえ'}
                                    </td>
                                    <td className="px-4 py-3">{position.display_order}</td>
                                    <td className="px-4 py-3">
                                        {position.is_active ? '有効' : '無効'}
                                    </td>
                                    <td className="px-4 py-3">
                                        <Link
                                            href={`/admin/positions/${position.id}/edit`}
                                            className="text-sm text-blue-600 underline"
                                        >
                                            編集
                                        </Link>
                                    </td>
                                </tr>
                            ))}

                            {positions.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                                        役職が登録されていません。
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