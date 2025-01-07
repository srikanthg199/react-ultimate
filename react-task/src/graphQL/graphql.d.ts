export type User = {
	created_at: string;
	date_of_birth: string;
	email: string;
	first_name: string;
	gender: number;
	id: number;
	last_name: string;
	middle_name: string;
	phone_country_id: string;
	phone_no: string;
	profile_img: string;
	role: number;
	status: number;
	updated_at: string;
	user_name: string;
	user_role_id: number;
	uuid: string;
};

export type UserDataType = {
	userList: User[];
	count: number;
};
