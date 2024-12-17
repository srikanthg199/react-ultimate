import { gql } from '@apollo/client';

export const GET_USERS_LIST = gql`
	query FetchUsers($limit: Int, $sortBy: String, $sortOrder: String) {
		fetchUsers(limit: $limit, sortBy: $sortBy, sortOrder: $sortOrder) {
			data {
				userList {
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
				count
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
