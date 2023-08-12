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

	return (
		<main className='mx-auto flex w-full max-w-3xl grow flex-col gap-10 p-2 pt-10'>
			<h1 className='text-4xl font-semibold uppercase'>Account</h1>

			<section className='flex flex-col gap-3'>
				<h2 className='text-2xl font-semibold uppercase'>Usage</h2>

				<table className='w-full'>
					<thead>
						<tr>
							<th className='text-left'>Date</th>
							<th className='text-left'>Used</th>
							<th className='text-left'>Added</th>
							<th className='text-left'>Remaining</th>
						</tr>
					</thead>
					<tbody>
						{usage.map((item) => (
							<tr key={item.date}>
								<td>{item.date}</td>
								<td>{item.tokens_used}</td>
								<td>{item.tokens_added}</td>
								<td>{item.tokens_remaining}</td>
							</tr>
						))}
					</tbody>
				</table>
			</section>
		</main>
	);
}
