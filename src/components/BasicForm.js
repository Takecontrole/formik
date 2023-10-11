import { useFormik } from "formik";
import { basicSchema } from "../schemas";
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';

const onSubmit = async (values, actions) => {
  console.log(values);
  console.log(actions);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  actions.resetForm();
};

const BasicForm = () => {
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      name: null,
      surname: null,
      option: "value",
      suboption: null,
      items: [
        {name: "элемент 1"},
        {name: "элемент 2"}
      ]
    },
    validationSchema: basicSchema,
    onSubmit,
  });
  
  const resetSuboption = () => {
    setFieldValue("suboption", "");
  };

  console.log(values);
  
  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <label htmlFor="name">Name</label>
      <input
        value={values.name}
        onChange={handleChange}
        id="name"
        type="name"
        placeholder="Enter your name"
        onBlur={handleBlur}
        className={errors.name && touched.name ? "input-error" : ""}
      />
      {errors.name && touched.name && <p className="error">{errors.name}</p>}

      <label htmlFor="surname">Surname</label>
      <input
        value={values.surname}
        onChange={handleChange}
        id="surname"
        type="surname"
        placeholder="Enter your surname"
        onBlur={handleBlur}
        className={errors.surname && touched.surname ? "input-error" : ""}
      />
      {errors.surname && touched.surname && <p className="error">{errors.surname}</p>}
      
      <label htmlFor="option">Option</label>
      <select
        name="option"
        value={values.option}
        //onChange={handleChange}
        onChange={(event) => {
          handleChange(event);
          resetSuboption();
        }}
        onBlur={handleBlur}
        
        style={{ display: "block" }}
      >
        <option value="" label="Select an option">
          Select an option{" "}
        </option>
        <option value="Developer" label="Developer">
          {" "}
          Developer
        </option>
        <option value="Designer" label="Designer">
        Designer
        </option>
        
        <option value="Manager" label="Manager">
        Manager
        </option>
      </select>
      {errors.option && <div className="input-feedback">{errors.option}</div>}

      <label htmlFor="option">Suboption</label>
      <select
        name="suboption"
        value={values.suboption}
        onChange={handleChange}
        onBlur={handleBlur}
        style={{ display: "block" }}
      >
        <option value="" label="Select an option">
          Select a suboption{" "}
        </option>
        <option value="Developer" label="Developer">
          {" "}
          Developer
        </option>
        <option value="Designer" label="Designer">
        Designer
        </option>
        
        <option value="Manager" label="Manager">
        Manager
        </option>
      </select>
      {errors.suboption && <div className="input-feedback">{errors.suboption}</div>}
      <div>
  <h1>Items</h1>
  <Formik
    initialValues={{     
      items: [
        {name: "элемент 1"},
        {name: "элемент 2"}
      ]
    }}
    onSubmit={async (values) => {
      await new Promise((r) => setTimeout(r, 500));
      alert(JSON.stringify(values, null, 2));
    }}
  >
    {({ values }) => (
      <Form>
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
        {/*<button type="submit"></button>*/}
      </Form>
    )}
  </Formik>
</div>
      <button disabled={isSubmitting} type="submit">
        Submit
      </button>
      
    
    </form>
  );
};

export default BasicForm;
