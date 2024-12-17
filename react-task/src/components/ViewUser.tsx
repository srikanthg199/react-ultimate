import React from 'react';
import { formattedDate } from '../helpers/commonHelper';
import { User } from '../graphQL/grphql';

interface ViewUserProps {
	selectedUser: User | null;
}

const ViewUser: React.FC<ViewUserProps> = ({ selectedUser }) => {
	if (!selectedUser) {
		return <p className='text-red-500 text-center'>No user selected</p>;
	}

	return (
		<div className='bg-white shadow-lg rounded-lg p-6 w-full max-w-md mx-auto'>
			<h2 className='text-2xl font-semibold text-gray-800 mb-4 text-center'>User Details</h2>
			<div className='grid grid-cols-2 gap-y-4 text-sm text-gray-700'>
				<div className='font-semibold'>Full Name:</div>
				<div>{`${selectedUser.first_name} ${selectedUser.last_name}`}</div>

				<div className='font-semibold'>Username:</div>
				<div>{selectedUser.user_name}</div>

				<div className='font-semibold'>Email:</div>
				<div>{selectedUser.email}</div>

				<div className='font-semibold'>Gender:</div>
				<div>{selectedUser.gender ? 'Male' : 'Female'}</div>

				<div className='font-semibold'>Date of Birth:</div>
				<div>{selectedUser.date_of_birth ? formattedDate(selectedUser.date_of_birth) : 'N/A'}</div>

				<div className='font-semibold'>Status:</div>
				<div>
					<span className={`px-2 py-1 rounded-md text-white ${selectedUser.status ? 'bg-green-500' : 'bg-red-500'}`}>{selectedUser.status ? 'Active' : 'Inactive'}</span>
				</div>

				<div className='font-semibold'>Created At:</div>
				<div>{selectedUser.created_at ? formattedDate(selectedUser.created_at) : 'N/A'}</div>
			</div>
		</div>
	);
};

export default ViewUser;
