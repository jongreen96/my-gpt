import { useDispatch, useSelector } from 'react-redux';
import { selectUsage } from '../store/usage/usageSlice';
import { useEffect } from 'react';
import { fetchUsage } from '../store/usage/usageAPI';
export default function Account() {
	const dispatch = useDispatch();
	const usage = useSelector(selectUsage);

	useEffect(() => {
		dispatch(fetchUsage());
	}, [dispatch]);

	const handleLogout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('apikey');
		window.location.reload();
	};

	return (
		<main className='mx-auto flex w-full max-w-3xl grow flex-col gap-10 p-2 pt-10'>
			<h1 className='text-4xl font-semibold uppercase'>Account</h1>

			<section className='flex flex-col gap-3'>
				<h2 className='text-2xl font-semibold uppercase'>Usage</h2>

				{/* Bar chart */}
				{usage.length > 1 && (
					<div className='flex h-28 flex-row-reverse items-baseline justify-end gap-2'>
						{usage.map((item, index) => {
							const largestUsedTokens = Math.max(
								...usage.map((item) => item.tokens_used)
							);

							const date = new Date(item.date + '-01');
							const formattedDate = date.toLocaleDateString('en-US', {
								month: 'short',
							});

							if (index > 11) return null;

							return (
								<div className='w h-full' style={{ width: `${100 / 12}%` }}>
									<div
										className='rounded-t-md bg-teal-700'
										style={{
											height: `${
												(item.tokens_used / largestUsedTokens) * 100
											}%`,
										}}
									></div>
									<p className='text-center text-xs'>{formattedDate}</p>
								</div>
							);
						})}
					</div>
				)}

				{/* Listed months */}
				<table className='w-full'>
					<thead>
						<tr>
							<th className='text-left'>Month</th>
							<th className='text-right'>Used</th>
						</tr>
					</thead>
					<tbody>
						{usage.map((item, index) => {
							const date = new Date(item.date + '-01');
							const formattedDate = date.toLocaleDateString('en-US', {
								month: 'long',
								year: 'numeric',
							});

							return (
								<tr key={item.date} className='border-t-2'>
									<td>{formattedDate}</td>
									<td className='text-right'>{item.tokens_used}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</section>

			<button
				onClick={handleLogout}
				className='fixed bottom-2 w-[calc(100%-16px)] max-w-lg self-center rounded-lg rounded-br-none bg-teal-700 p-2 text-xl font-semibold uppercase text-white hover:bg-teal-800'
			>
				Logout
			</button>
		</main>
	);
}
