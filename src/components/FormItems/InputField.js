import React from 'react';

const InputField = React.forwardRef(({label, defaultValue}, ref) => (
  <div className="col-12 col-md-6 col-lg-12 col-xl-6">
    <div className="form__group">
        <label className="form__label" htmlFor="username">{label}</label>
        <input id="username" type="text" name="username" className="form__input" defaultValue={defaultValue} ref={ref}/>
    </div>
  </div>
));

InputField.displayName = 'InputField';

export default InputField;