import { gql } from '@apollo/client';

export const CHANGE_USER_STATUS = gql`
	mutation ChangeUserStatus($uuid: UUID, $status: Int) {
		changeUserStatus(uuid: $uuid, status: $status) {
			data {
				id
				uuid
				first_name
				middle_name
				last_name
				user_name
				email
				gender
				date_of_birth
				phone_no
				phone_country_id
				role
				user_type
				profile_img
				device_type
				device_token
				status
				created_at
				updated_at
				serialNo
			}
			meta {
				message
				messageCode
				statusCode
				status
				type
				errors {
					errorField
					error
				}
				errorType
			}
		}
	}
`;

export const DELETE_USER = gql`
	mutation DeleteUser($uuid: UUID) {
		deleteUser(uuid: $uuid) {
			meta {
				message
				messageCode
				statusCode
				status
				type
				errors {
					errorField
					error
				}
				errorType
			}
		}
	}
`;

export const CREATE_USER = gql`
	mutation CreateUser($firstName: String, $middleName: String, $lastName: String, $userName: String, $email: String, $gender: Int, $dateOfBirth: Date, $password: String, $deviceType: Int, $phoneCountryId: Int, $phoneNo: String, $profileImg: String) {
		createUser(first_name: $firstName, middle_name: $middleName, last_name: $lastName, user_name: $userName, email: $email, gender: $gender, date_of_birth: $dateOfBirth, password: $password, device_type: $deviceType, phone_country_id: $phoneCountryId, phone_no: $phoneNo, profile_img: $profileImg) {
			data {
				id
				uuid
				first_name
				middle_name
				last_name
				user_name
				email
				gender
				date_of_birth
				phone_no
				phone_country_id
				role
				user_type
				profile_img
				device_type
				device_token
				status
				created_at
				updated_at
				serialNo
			}
			meta {
				message
				messageCode
				statusCode
				status
				type
				errors {
					errorField
					error
				}
				errorType
			}
		}
	}
`;

export const UPDATE_USER = gql`
	mutation UpdateUser($uuid: UUID, $firstName: String, $middleName: String, $lastName: String, $userName: String, $email: String, $gender: Int, $dateOfBirth: Date, $phoneNo: String, $profileImg: String, $phoneCode: String, $deviceType: Int, $address: String, $pincode: Int, $stateId: Int, $countryId: Int) {
		updateUser(uuid: $uuid, first_name: $firstName, middle_name: $middleName, last_name: $lastName, user_name: $userName, email: $email, gender: $gender, date_of_birth: $dateOfBirth, phone_no: $phoneNo, profile_img: $profileImg, phone_code: $phoneCode, device_type: $deviceType, address: $address, pincode: $pincode, state_id: $stateId, country_id: $countryId) {
			data {
				id
				uuid
				first_name
				middle_name
				last_name
				user_name
				email
				gender
				date_of_birth
				phone_no
				phone_country_id
				role
				user_type
				profile_img
				device_type
				device_token
				status
				created_at
				updated_at
				serialNo
			}
			meta {
				message
				messageCode
				statusCode
				status
				type
				errors {
					errorField
					error
				}
				errorType
			}
		}
	}
`;
