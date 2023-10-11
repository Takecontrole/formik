import * as yup from "yup";


export const basicSchema = yup.object().shape({
  name: yup.string().nullable()
  .required("Required"),
  surname: yup.string().nullable()
  .required("Required"),
  option: yup.string().nullable()
  .required("Required"),
});

export const advancedSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, "Username must be at least 3 characters long")
    .required("Required"),
    surname: yup
    .string()
    .min(3, "surname must be at least 3 characters long")
    .required("Required"),
  option: yup
    .string()
    .oneOf(["designer", "developer", "manager", "other"], "Invalid Job Type")
    .required("Required"),
    suboption: yup
    .string()
    ,
});