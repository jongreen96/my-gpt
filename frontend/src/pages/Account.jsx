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
		window.location.reload();
	};

	return (
		<main className='mx-auto flex w-full max-w-3xl grow flex-col gap-10 p-2 pt-10'>
			<h1 className='text-4xl font-semibold uppercase'>Account</h1>

			<section className='flex flex-col gap-3'>
				<h2 className='text-2xl font-semibold uppercase'>Usage</h2>

				{/* Tokens used based off remaining tokens at begining of month plus tokens added */}
				<div>
					<div>
						<p>{usage[0]?.tokens_used} used this month</p>
					</div>
					<div className='mb-2 h-5 w-full rounded-lg bg-gray-300'>
						<div
							className='h-full rounded-lg bg-teal-700'
							style={{
								width: `${
									(usage[0]?.tokens_used /
										(usage[1]?.tokens_remaining + usage[0]?.tokens_added)) *
									100
								}%`,
							}}
						></div>
					</div>
				</div>

				<table className='w-full'>
					<thead>
						<tr>
							<th className='text-left'>Month</th>
							<th className='text-right'>Used</th>
							<th className='text-right'>Added</th>
							<th className='text-right'>Remaining</th>
						</tr>
					</thead>
					<tbody>
						{usage.map((item, index) => {
							const date = new Date(item.date + '-01');
							const formattedDate = date.toLocaleDateString('en-US', {
								month: 'long',
								year: 'numeric',
							});

							const largestRemainingTokens = Math.max(
								...usage.map((item) => item.tokens_remaining)
							);

							return (
								<>
									<tr key={item.date} className='border-t-2'>
										<td>{formattedDate}</td>
										<td className='text-right'>{item.tokens_used}</td>
										<td className='text-right'>{item.tokens_added}</td>
										<td className='text-right'>{item.tokens_remaining}</td>
									</tr>
									<div className='mb-2 mt-1 h-2 w-[299%] rounded-lg bg-gray-300'>
										<div
											className='h-full rounded-lg bg-teal-700'
											style={{
												width: `${
													(item.tokens_used / largestRemainingTokens) * 100
												}%`,
											}}
										></div>
									</div>
								</>
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
