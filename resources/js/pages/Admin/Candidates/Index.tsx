import FlashMessage from '@/components/flash-message';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';

type Candidate = {
    id: number;
    last_name: string;
    first_name: string;
    last_name_kana: string | null;
    first_name_kana: string | null;
    birth_date: string | null;
    email: string | null;
    phone: string | null;
};

type Props = {
    candidates: Candidate[];
};

export default function Index({ candidates }: Props) {
    return (
        <AppLayout>
            <Head title="応募者管理" />

            <div className="p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">応募者管理</h1>

                    <Link
                        href="/admin/candidates/create"
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
                                <th className="px-4 py-3">氏名</th>
                                <th className="px-4 py-3">氏名カナ</th>
                                <th className="px-4 py-3">生年月日</th>
                                <th className="px-4 py-3">メールアドレス</th>
                                <th className="px-4 py-3">電話番号</th>
                                <th className="px-4 py-3">操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            {candidates.map((candidate) => (
                                <tr key={candidate.id} className="border-t">
                                    <td className="px-4 py-3">
                                        {candidate.last_name} {candidate.first_name}
                                    </td>
                                    <td className="px-4 py-3">
                                        {(candidate.last_name_kana ?? '')} {(candidate.first_name_kana ?? '')}
                                    </td>
                                    <td className="px-4 py-3">{candidate.birth_date ?? '-'}</td>
                                    <td className="px-4 py-3">{candidate.email ?? '-'}</td>
                                    <td className="px-4 py-3">{candidate.phone ?? '-'}</td>
                                    <td className="px-4 py-3">
                                        <Link
                                            href={`/admin/candidates/${candidate.id}/edit`}
                                            className="text-sm text-blue-600 underline"
                                        >
                                            編集
                                        </Link>
                                    </td>
                                </tr>
                            ))}

                            {candidates.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                                        応募者が登録されていません。
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