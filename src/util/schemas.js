import * as yup from 'yup';

export const extractErrors = err => {
    return err.inner.reduce((acc, err) => {
        return {
            ...acc,
            [err.path]: err.message
        };
    }, {});
};

export let characterRefSchema = yup.object().shape({
    name: yup.string().required('Please specify Full Name'),
    jobTitle: yup.string().required('Please specify the Job Title'),
    contactNo: yup.number().required('Please provide contact number').positive(),
    email: yup.string().email(`Email doesn't look right`).required('Please provide your email')
});


export let educationBGSchema = yup.object().shape({
    studyType: yup.string().required(),
    course: yup.string().nullable(),
    institution: yup.string().required(),
    location: yup.string().required(),
    startDate: yup.date().required('Please specify the Starting Date').max(new Date(), "Future date not allowed").typeError("Invalid Started date"),
    endDate: yup.date().nullable(true).min(
        yup.ref('startDate'),
        "End Date cannot be before Start Date"
    )
});


export let workHistorySchema = yup.object().shape({
    jobTitle: yup.string().required('Please specify the Job Title'),
    employer: yup.string().required('Please specify the Employer'),
    startDate: yup.date().required('Please specify the Starting Date').max(new Date(), "Future date not allowed").typeError("Invalid Started date"),
    endDate: yup.date().nullable(true).min(
        yup.ref('startDate'),
        "End Date cannot be before Start Date"
    ),
    currentWork: yup.array().nullable(true),
    location: yup.string().required('Please specify the location'),
    jobDescription: yup.string().required('Please specify the Job Description'),
});


export let personalInfoSchema = yup.object().shape({
    fName: yup.string().required('Please enter your first name'),
    mName: yup.string().nullable(true),
    lName: yup.string().required('Please enter your last name'),
    email: yup.string().email(`Email doesn't look right`).required('Please provide your email'),
    contactNo: yup.number().required('Please provide your contact number').positive(),
    birthDate: yup.date().required('Please provide your birth date'),
    address: yup.string().required('Please provde your address'),
    city: yup.string().required('Please provide your city'),
    province: yup.string().required('Please provide your province'),
    zipCode: yup.number().required('Please provide your zip code')
});

export let loginSchema = yup.object().shape({
    username: yup.string().required('Username is a mandatory field'),
    password: yup.string().required('Password is required'),
});

export let registerSchema = yup.object().shape({
    username: yup.string().required('Username is a mandatory field'),
    password: yup.string().required('Password is required'),
    confirmPassword: yup.string().required().oneOf([yup.ref('password'), null], 'Passwords do not match'),
});