import * as yup from 'yup';

export let personalInfoSchema = yup.object().shape({
    fName: yup.string().required(),
    mName: yup.string().nullable(true),
    lName: yup.string().required(),
    email: yup.string().email().required(),
    contactNo: yup.number().required().positive(),
    birthDate: yup.date().required(),
    address: yup.string().required(),
    city: yup.string().required(),
    province: yup.string().required(),
    zipCode: yup.number().required()
});