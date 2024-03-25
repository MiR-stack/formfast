import React from 'react';
import Field from './field.js';

const Form = ({ initData, onSubmit }) => {
    return (React.createElement("form", { "aria-label": "formfast", onSubmit: onSubmit }, initData.map((element, index) => (React.createElement(Field, { ...element, key: index })))));
};

export { Form as default };
//# sourceMappingURL=form.js.map
