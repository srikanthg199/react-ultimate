import * as Yup from 'yup';
import useCommonValidationFields from './common';

const useValidation = () => {
    const {
        email,
        fullName,
    } = useCommonValidationFields();


    const AddEditUserValidartionSchema = Yup.object({
        email: email,
        fullName: fullName,
    });
    return {

        AddEditUserValidartionSchema,

    };
};
export default useValidation;
