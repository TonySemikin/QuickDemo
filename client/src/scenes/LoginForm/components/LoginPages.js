import React, { Fragment } from 'react';
import { Field, reduxForm } from 'redux-form';

function renderInput(field) {
  return (
    <Fragment>
      <div className="input">
        <input
          {...field.input}
          type="text"
          autoComplete="off"
          className={field.meta.touched && field.meta.error ? 'error' : ''}
          />
      </div>
      <span className="error">
        {field.meta.touched ? field.meta.error : ''}
      </span>
    </Fragment>
  );
}

function LoginPages(props) {
  const { handleSubmit, onSubmit, onClick, page, config } = props;
  return (
    <Fragment>
      <form
        className={`login_window ${page === 1 ? 'first' : ''}`}
        onSubmit={handleSubmit(onSubmit)}>
        <label>{config[page].label}</label>
        {page === 1 ? <Field name="username" component={renderInput} /> : null}
        <div className="actions">
          <button autoFocus="on">{config[page].buttonOne}</button>
          {config[page].buttonTwo ? (
            <button onClick={onClick}>{config[page].buttonTwo}</button>
          ) : null}
        </div>
      </form>
    </Fragment>
  );
}

function validation(values) {
  const errors = {};

  if (!values.username) {
    errors.username = 'any name will be fine';
  }

  return errors;
}

export default reduxForm({
  validate: validation,
  form: 'login',
  destroyOnUnmount: false,
  forceUndegisterOnUnmount: true,
})(LoginPages);
