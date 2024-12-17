import * as Yup from 'yup';
import { NAMEVALIDATION } from '../../config/regex';


const useCommonValidationFields = () => {
    const email = Yup.string().email('Please enter valid email').required('Please enter email');
    const fullName = Yup.string().required('Please enter name').min(3, 'Name should not be less than 3 characters').max(50, 'Name should not be greater than 50 characters').matches(NAMEVALIDATION, 'Please enter valid name (only character allow)');
    return {
        email,
        fullName,
    }
}

export default useCommonValidationFields;