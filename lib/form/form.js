import React from 'react';
import Field from './field.js';

const Form = ({ schema, onSubmit }) => {
    return (React.createElement("form", { "aria-label": "formfast", onSubmit: onSubmit }, schema.map((element, index) => (React.createElement(Field, { ...element, key: index })))));
};

export { Form as default };
//# sourceMappingURL=form.js.map
