import React, { Suspense } from 'react';
import './App.css';
import { BounceLoader } from 'react-spinners';
const LazyUserTable = React.lazy(() => import('./components/UserTable'));
function App() {
	return (
		<div className='App'>
			<Suspense
				fallback={
					<div>
						<BounceLoader />
					</div>
				}
			>
				<h1 className='text-2xl font-semibold text-gray-800 mb-4 text-center'>User Module!!</h1>
				<LazyUserTable />
			</Suspense>
		</div>
	);
}

export default App;
