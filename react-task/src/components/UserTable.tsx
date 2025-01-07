import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPenToSquare, faToggleOff, faToggleOn, faTrash } from '@fortawesome/free-solid-svg-icons';
import CreateUserForm from './CreateUserForm';
import { Popup } from './PopUp';
import { GET_USERS_LIST } from '../graphQL/queries/user';
import ViewUser from './ViewUser';
import { formattedDate } from '../helpers/commonHelper';
import { User, UserDataType } from '../graphQL/graphql';
import { CHANGE_USER_STATUS, CREATE_USER, DELETE_USER, UPDATE_USER } from '../graphQL/mutations/user';
import { BeatLoader } from 'react-spinners';

const sortOrder = 'desc';
const sortBy = 'created_at';

function UserTable() {
	const [users, setUsers] = useState<UserDataType | null>(null);
	const [selectedUser, setSelectedUser] = useState<User | null>(null);
	const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
	const [isAddUserPopupOpen, setIsAddUserPopupOpen] = useState<boolean>(false);
	const [isUpdateUserPopupOpen, setIsUpdateUserPopupOpen] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const { loading, error, data, refetch } = useQuery(GET_USERS_LIST, {
		variables: {
			sortBy: sortBy,
			sortOrder: sortOrder,
		},
		fetchPolicy: 'network-only',
	});

	// Use useEffect to set state when data changes
	useEffect(() => {
		if (data?.fetchUsers?.data) {
			setUsers(data.fetchUsers.data);
		}
	}, [data]);

	const [changeUserStatus, { loading: changeUserStatusLoader }] = useMutation(CHANGE_USER_STATUS);
	const [deleteUser, { loading: deleteUserLoader }] = useMutation(DELETE_USER);
	const [createUser, { loading: createUserLoader }] = useMutation(CREATE_USER);
	const [updateUser, { loading: updateUserLoader }] = useMutation(UPDATE_USER);

	// View user state
	const handleViewUser = (user: User) => {
		setSelectedUser(user);
		setIsPopupOpen(true);
	};

	const closePopup = () => {
		setIsPopupOpen(false);
		setSelectedUser(null);
	};

	// Create user States
	const handleAddUserClick = () => {
		setIsAddUserPopupOpen(true);
	};

	const closeAddUserPopup = () => {
		setIsAddUserPopupOpen(false);
	};

	//update user
	const handleEditUserClick = (user: User) => {
		setIsUpdateUserPopupOpen(true);
		setSelectedUser(user);
	};

	const closeUpdateUserPopup = () => {
		setIsUpdateUserPopupOpen(false);
		setSelectedUser(null);
	};

	const handleStatusToggle = (user: User) => {
		console.log('User before status change:', user);

		changeUserStatus({
			variables: {
				uuid: user.uuid,
				status: user.status === 1 ? 0 : 1, // Toggle status
			},
		})
			.then((res) => {
				if (res?.data) {
					refetch();
				}
			})
			.catch((error) => {
				setErrorMessage(error.message);
			});
	};

	const handleDeleteUser = (user: User) => {
		// Confirmation popup
		if (window.confirm('Are you sure you want to delete this user?')) {
			// Delete user logic
			deleteUser({
				variables: {
					uuid: user.uuid,
				},
			})
				.then((res) => {
					if (res?.data) {
						refetch();
					}
				})
				.catch((error) => {
					setErrorMessage(error.message);
				});
			console.log('User to be deleted:', user);
		}
	};

	// Handle create user form submission
	const handleCreateUser = (userData: any) => {
		createUser({ variables: userData })
			.then((res) => {
				if (res?.data) {
					refetch();
					setIsAddUserPopupOpen(false);
				}
			})
			.catch((error) => {
				setErrorMessage(error.message);
			});
	};

	const handleUpdateUser = (userData: any) => {
		updateUser({ variables: { ...userData, uuid: selectedUser?.uuid } })
			.then((res) => {
				if (res?.data) {
					refetch();
					setIsUpdateUserPopupOpen(false);
				}
			})
			.catch((error) => {
				setErrorMessage(error.message);
			});
	};

	if (loading || changeUserStatusLoader || deleteUserLoader || createUserLoader || updateUserLoader) return <BeatLoader className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' />;
	if (error || errorMessage) {
		return <p className='text-red-500 text-3xl'>Error: {error?.message ?? errorMessage ?? 'An unknown error occurred'}</p>;
	}

	return (
		<>
			<div className='flex justify-end'>
				<button className='p-2 ml-3 bg-blue-500 rounded-md' onClick={handleAddUserClick}>
					Add user
				</button>
			</div>

			<div className='relative overflow-x-auto mt-4'>
				<table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
					<thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border text-center'>
						<tr>
							<th scope='col' className='px-6 py-3 border'>
								Sr.No
							</th>
							<th scope='col' className='px-6 py-3 border'>
								Full Name
							</th>
							<th scope='col' className='px-6 py-3 border'>
								Username
							</th>
							<th scope='col' className='px-6 py-3 border'>
								Email
							</th>
							<th scope='col' className='px-6 py-3 border'>
								Gender
							</th>
							<th scope='col' className='px-6 py-3 border'>
								DOB
							</th>
							<th scope='col' className='px-6 py-3 border'>
								Status
							</th>
							<th scope='col' className='px-6 py-3 border'>
								Created At
							</th>
							<th scope='col' className='px-6 py-3 border'>
								Actions
							</th>
						</tr>
					</thead>
					<tbody>
						{users?.userList?.map((user, i: number) => (
							<tr key={user.id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 border text-center'>
								<th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white border'>
									{i + 1}
								</th>
								<th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white border'>
									{`${user.first_name} ${user.last_name}`}
								</th>
								<td className='px-6 py-4 border'>{user.user_name}</td>
								<td className='px-6 py-4 border'>{user.email}</td>
								<td className='px-6 py-4 border'>{user.gender ? 'Male' : 'Female'}</td>
								<td className='px-6 py-4 border'>{user?.date_of_birth ? formattedDate(user.date_of_birth) : ''}</td>
								<td className='px-6 py-4 border'>{user.status ? <p className='p-1 bg-green-400 rounded-md'>Active</p> : <p className='bg-red-400 rounded-md p-1'>In Active</p>}</td>
								<td className='px-6 py-4 border'>{user.created_at ? formattedDate(user.created_at) : ''}</td>
								<td>
									<div className='flex justify-around p-2'>
										<FontAwesomeIcon icon={faEye} className='hover:cursor-pointer' size='lg' onClick={() => handleViewUser(user)} />
										<FontAwesomeIcon icon={faPenToSquare} className='hover:cursor-pointer' size='lg' onClick={() => handleEditUserClick(user)} />
										{user.status ? <FontAwesomeIcon icon={faToggleOn} className='hover:cursor-pointer' size='lg' onClick={() => handleStatusToggle(user)} /> : <FontAwesomeIcon icon={faToggleOff} className='hover:cursor-pointer' size='lg' onClick={() => handleStatusToggle(user)} />}
										<FontAwesomeIcon icon={faTrash} className='hover:cursor-pointer' size='lg' onClick={() => handleDeleteUser(user)} />
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{/* Add User Popup */}
			{isAddUserPopupOpen && (
				<Popup closePopup={closeAddUserPopup}>
					<CreateUserForm selectedUser={selectedUser} onSubmit={handleCreateUser} />
				</Popup>
			)}

			{/* update User Popup */}
			{isUpdateUserPopupOpen && (
				<Popup closePopup={closeUpdateUserPopup}>
					<CreateUserForm selectedUser={selectedUser} onSubmit={handleUpdateUser} />
				</Popup>
			)}

			{/* View User Popup */}
			{isPopupOpen && (
				<Popup closePopup={closePopup}>
					<ViewUser selectedUser={selectedUser} />
				</Popup>
			)}
		</>
	);
}

export default UserTable;
