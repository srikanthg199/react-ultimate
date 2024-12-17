import React from 'react';
import './App.css';
import UserTable from './components/UserTable';
function App() {
	return (
		<div className='App'>
			<h1 className='text-3xl font-bold underline'>User Module!</h1>
			<UserTable />
		</div>
	);
}

export default App;
