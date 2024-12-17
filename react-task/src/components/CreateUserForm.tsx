import React, { useState, useEffect } from 'react';
import { User } from '../graphQL/grphql';

function CreateUserForm({ selectedUser, onSubmit }: { selectedUser: User | null; onSubmit: (value: any) => void }) {
	// Initialize the form data with selectedUser data if it's available
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		userName: '',
		email: '',
		password: '',
		confirmPassword: '',
		dateOfBirth: '',
		phoneNo: '',
		gender: '',
	});

	// Populate the form with the selectedUser's data if available
	useEffect(() => {
		if (selectedUser) {
			const formattedDateOfBirth = selectedUser.date_of_birth ? new Date(selectedUser.date_of_birth).toISOString().split('T')[0] : ''; // Format the date to yyyy-MM-dd
			setFormData({
				firstName: selectedUser.first_name || '',
				lastName: selectedUser.last_name || '',
				userName: selectedUser.user_name || '',
				email: selectedUser.email || '',
				password: '',
				confirmPassword: '',
				dateOfBirth: formattedDateOfBirth,
				phoneNo: selectedUser.phone_no || '',
				gender: selectedUser.gender?.toString() || '', // assuming gender is an integer
			});
		}
	}, [selectedUser]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		const processedValue = name === 'gender' ? parseInt(value) : value;
		setFormData({ ...formData, [name]: processedValue });
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		// Ensure the gender is an integer (this might be redundant since you're already parsing it in handleChange)
		const dataToSubmit = {
			...formData,
			gender: parseInt(formData.gender as string) || 0, // fallback to 0 if gender is invalid
		};

		onSubmit(dataToSubmit);
	};

	return (
		<form onSubmit={handleSubmit} className='space-y-6'>
			{/** Form fields */}
			<div className='grid grid-cols-3 items-center gap-4'>
				<label htmlFor='firstName' className='text-right text-gray-700 font-medium'>
					First Name
				</label>
				<input type='text' name='firstName' id='firstName' value={formData.firstName} onChange={handleChange} className='col-span-2 p-2 rounded border border-gray-300 focus:ring-blue-500 focus:border-blue-500' placeholder='Enter your first name' required />
			</div>
			<div className='grid grid-cols-3 items-center gap-4'>
				<label htmlFor='lastName' className='text-right text-gray-700 font-medium'>
					Last Name
				</label>
				<input type='text' name='lastName' id='lastName' value={formData.lastName} onChange={handleChange} className='col-span-2 p-2 rounded border border-gray-300 focus:ring-blue-500 focus:border-blue-500' placeholder='Enter your last name' required />
			</div>
			<div className='grid grid-cols-3 items-center gap-4'>
				<label htmlFor='userName' className='text-right text-gray-700 font-medium'>
					User Name
				</label>
				<input type='text' name='userName' id='userName' value={formData.userName} onChange={handleChange} className='col-span-2 p-2 rounded border border-gray-300 focus:ring-blue-500 focus:border-blue-500' placeholder='Enter your username' required />
			</div>
			<div className='grid grid-cols-3 items-center gap-4'>
				<label htmlFor='email' className='text-right text-gray-700 font-medium'>
					Email
				</label>
				<input type='email' name='email' id='email' value={formData.email} onChange={handleChange} className={`col-span-2 p-2 rounded border border-gray-300 focus:ring-blue-500 focus:border-blue-500 disabled:cursor-not-allowed ${selectedUser ? 'bg-slate-300' : ''}`} placeholder='Enter your email' required disabled={!!selectedUser} />
			</div>
			<div className='grid grid-cols-3 items-center gap-4'>
				<label htmlFor='gender' className='text-right text-gray-700 font-medium'>
					Gender
				</label>
				<select name='gender' id='gender' value={formData.gender} onChange={handleChange} className='col-span-2 p-2 rounded border border-gray-300 focus:ring-blue-500 focus:border-blue-500' required>
					<option value='' disabled>
						Select
					</option>
					<option value='1'>Male</option>
					<option value='2'>Female</option>
					<option value='3'>Others</option>
				</select>
			</div>
			{!selectedUser && (
				<>
					<div className='grid grid-cols-3 items-center gap-4'>
						<label htmlFor='password' className='text-right text-gray-700 font-medium'>
							Password
						</label>
						<input
							type='password'
							name='password'
							id='password'
							value={formData.password}
							onChange={handleChange}
							className='col-span-2 p-2 rounded border border-gray-300 focus:ring-blue-500 focus:border-blue-500'
							placeholder='Enter your password'
							required={!selectedUser} // Only required if updating user
						/>
					</div>
					<div className='grid grid-cols-3 items-center gap-4'>
						<label htmlFor='confirmPassword' className='text-right text-gray-700 font-medium'>
							Confirm Password
						</label>
						<input
							type='password'
							name='confirmPassword'
							id='confirmPassword'
							value={formData.confirmPassword}
							onChange={handleChange}
							className='col-span-2 p-2 rounded border border-gray-300 focus:ring-blue-500 focus:border-blue-500'
							placeholder='Confirm your password'
							required={!selectedUser} // Only required if updating user
						/>
					</div>
				</>
			)}
			<div className='grid grid-cols-3 items-center gap-4'>
				<label htmlFor='dateOfBirth' className='text-right text-gray-700 font-medium'>
					Date of Birth
				</label>
				<input type='date' name='dateOfBirth' id='dateOfBirth' value={formData.dateOfBirth} onChange={handleChange} className='col-span-2 p-2 rounded border border-gray-300 focus:ring-blue-500 focus:border-blue-500' required />
			</div>
			<div className='grid grid-cols-3 items-center gap-4'>
				<label htmlFor='phoneNo' className='text-right text-gray-700 font-medium'>
					Phone Number
				</label>
				<input type='text' name='phoneNo' id='phoneNo' value={formData.phoneNo} onChange={handleChange} className='col-span-2 p-2 rounded border border-gray-300 focus:ring-blue-500 focus:border-blue-500' placeholder='Enter your phone number' required />
			</div>
			<div className='flex justify-end mt-4'>
				<button type='submit' className='px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-800'>
					{selectedUser ? 'Update User' : 'Create User'}
				</button>
			</div>
		</form>
	);
}

export default CreateUserForm;
