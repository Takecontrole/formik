import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
import { advancedSchema } from "../schemas";
import CustomInput from "./CustomInput";
import CustomSelect from "./CustomSelect";
const onSubmit = async (values, actions) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  actions.resetForm();
  console.log(values)
};

const AdvancedForm = () => {


  const initialValues = {
    name: "",
    surname: "",
    option: "value",
    suboption: "value",
    items: [
      {name: "элемент 1"},
      {name: "элемент 2"}
    ] 
};

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={advancedSchema}
      onSubmit={onSubmit}
    >
      {({values, setFieldValue, resetForm, isSubmitting }) => (
        <Form>
        <CustomInput
          label="Name"
          name="name"
          type="text"
          placeholder="Enter name"
        />
         <CustomInput
          label="Surname"
          name="surname"
          type="text"
          placeholder="Enter surname"
        />
        <CustomSelect
          label="Options"
          name="option"
          placeholder="Please select an option"
          value={values.option}
          onChange={async e => { 
            const { value } = e.target;
            setFieldValue("option", value);
            setFieldValue("suboption", "");
          }}
        >
          <option value=""></option>
          <option value="developer">Developer</option>
          <option value="designer">Designer</option>
          <option value="manager">Product Manager</option>
        </CustomSelect>

        <CustomSelect
          label="Suboptions"
          name="suboption"
          placeholder="Please select a suboption"
          
        >
          <option value=""></option>
          <option value="developer">Dvlpr</option>
          <option value="designer">Dsgnr</option>
          <option value="manager">Prdct Mngr</option>
        </CustomSelect>

        <FieldArray name="items">
          {({ insert, remove, push }) => (
            <div>
              {values.items.length > 0 &&
                values.items.map((item, index) => (
                  <div className="row" key={index}>
                    <div className="col">
                        <label htmlFor={`items.${index}.name`}>Name</label>
                        <Field
                          name={`items.${index}.name`}
                          placeholder="null"
                          type="text"
                        />
                        <ErrorMessage
                          name={`items.${index}.name`}
                          component="div"
                          className="field-error"
                        />
                      </div>
                   
                    <div className="col">
                      <button
                        type="button"
                        className="secondary"
                        onClick={() => remove(index)}
                      >
                        X
                      </button>
                    </div>
                  </div>
                ))}
              <button
                type="button"
                className="secondary"
                onClick={() => push({ name: null})}
              >
                Add item
              </button>
            </div>
          )}
        </FieldArray>

        <button type="reset" onClick={resetForm}>
                Reset form
              </button>

        <button disabled={isSubmitting} type="submit">
          Submit
        </button>
      </Form>
      )}
    </Formik>
  );
};
export default AdvancedForm;