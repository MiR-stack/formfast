# Effortless Form Creation with Built-in Validation

Formfast is a powerful npm package designed to streamline the process of creating dynamic React forms with ease. Whether you're a seasoned developer or just starting out, our package empowers you to effortlessly convert JavaScript objects into fully functional forms, complete with built-in handling for form values, default validations, and much more.

With formfast, you can rapidly create complex forms without the hassle of manually managing state or writing repetitive validation logic. Our intuitive API allows you to define your form structure using a simple schema, saving you time and effort in the development process.

## Key Benefits:

- **Reduced Development Time:** Convert data objects to HTML forms with built-in validation rules, saving you time and lines of code.

- **Improved User Experience:** Ensure data integrity and guide users with clear error messages for a smooth form completion process.

- **Flexibility:** Supports various input elements (text, email, password, etc.) and allows customization for specific validation needs.

- **Easy Integration:** Integrates seamlessly with popular frameworks and libraries, enhancing your development workflow.

## Formfast empowers you to:

- Create robust and secure forms with minimal code.
- Enhance the user experience with clear and informative validation.
- Increase development efficiency by focusing on core application logic.

**Ready to experience the power of Formfast? Get started today!**

# Getting Started

Getting started with formfast is quick and easy. Follow these simple steps to integrate it into your React application:

## Installation

```
npm install formfast
```

or

```
yarn add formfast
```

## Defining Form Schema

Define your form schema as a JavaScript object. Each key in the object represents a HTML element, and the corresponding value defines the elements attributes. it support almost all html element attributes.

```
const formSchema = {
  "": {
    el: "div",
    className:'your-class-name',  //optional
    childrens: {
      "first name": {
        name:'firstName,
        placeholder:'Enter your first name',
        required:true,
      },
      "last name": {},
    },
  },
  email: {
    type: 'email',
    error:'custom error message'
  },
  password:{
    type:'password'
    error:{
        el:'span',
        label:'error message'
    }
  },
   submit: {
    el: "button",
    type: "submit",
  },
};
```

> here **key** will be input **label** and also **name** if you didn't add name property. default el is input and type is text.

## Importing Components

```
import { Form, useForm } from "formfast";
```

## Creating a Form

Use the Form component to create a form in your React component:

```
function MyFormComponent() {

  const { schema, onSubmit } = useForm({formSchema});

  return (
    <div>
      <Form schema={schema} onSubmit={onSubmit} />
    </div>
  );
}

export default MyFormComponent;
```

## Handling Form Submission

Implement a function to handle form submission

```
function MyFormComponent() {

  //++
  const handleSubmit = (values) =>{
    // handle submition logic here
  }

  const { schema, onSubmit } = useForm({
    formSchema,
    onSubmit:handleSubmit  //++
  });

  return (
    <div>
      <Form schema={schema} onSubmit={onSubmit} />
    </div>
  );
}

export default MyFormComponent;
```

Congratulations! You've now successfully integrated formfast into your React application. Start building powerful, dynamic forms with ease!

# Customization

Formfast offers extensive customization options to tailor your forms according to your specific design and functionality needs. Whether it's adjusting the appearance, behavior, or validation rules, Formfast provides the flexibility to create forms that seamlessly integrate with your application.

## Styling

formfast provides default styles to help you get started quickly with your forms. These styles are designed to be minimalistic and easily customizable to fit your project's design requirements.

### Default Styles:

By default, formfast applies basic styling to form elements, ensuring consistency and a pleasant user experience. However, these styles are minimal and may need to be further customized to align with your project's visual design.

```

import 'formfast/styles/form.css'

```

### Applying Class Names:

To apply custom styles using class names, simply pass the appropriate class names to the form elements within the schema object.

```

const formSchema = {
    "": {
        el: "div",
        className:'your-class-name', // Add class name for div
        childrens: {
        "first name": {
            className:'your-class-name', // Add class name for input
            required:true
            },
        "last name": {},
        },
    },
    email: {
        className:'your-class-name', // Add class name for input
        type: 'email',
        error:'custom error message'
    },
    password:{
        className:'your-class-name', // Add class name for input
        type:'password'
    },
    submit: {
        el: "button",
        className:'your-class-name', // Add class name for button
        type: "submit",
    },
};

```

By default, Formfast automatically generates a section for each input element, comprising a label and an error element. If you wish to apply custom styling to these elements, you can do so by passing the following properties:

- **wraperClass:** This property allows you to specify a class name for the wraper element associated with the input.

- **labelClass:** This property allows you to specify a class name for the label element associated with the input.

- **errorClass:** Use this property to define a class name for the error element displayed in case of validation errors.

- **InputErrorClass:** Use this property to define a class name for the input element displayed in case of validation errors.

```

password:{
    className:'your-class-name', // Add class name for input
    wraperClass:'your-class-name', // Add class name for wraper
    labelClass:'your-class-name', // Add class name for label
    errorClass:'your-class-name', // Add class name for error
    inputErrorClass:'your-class-name', // Add class name for input in case of validation error
    type:'password'
},

```

By providing these class names, you can seamlessly integrate Formfast with your preferred styling approach, ensuring consistency with your project's design guidelines.

## Validation

Formfast provides built-in validation functionality to ensure data integrity and user input correctness. You can utilize default validation by setting the **required** property to **true** for mandatory fields or specifying an **error** property with **a string message or an error element object.**

Additionally, Formfast offers the flexibility to implement custom validation logic using the useForm hook. By passing a validate function to this hook, you can define custom validation rules tailored to your specific requirements.

### Default Validation

1. **Required Fields**

   To mark a field as required, simply set the required property to true in the schema object:

   ```
   const formSchema = {
   'first name': {
       name:'firstname'
       required: true
   },
   // Other form fields
   };
   ```

2. **Error Messages**

   You can provide an error message string or an error element object to display custom error messages for validation failures

   ```
   const formSchema = {
   password: {
       type: 'password',
       error: 'Please enter a valid password'
   },
   email:{
       type:'email',
       error:{
           el:'span',
           label:'please enter your email'
       }
   }
   ```

### Custom Validation

Formfast exposes a useForm hook that allows you to implement custom validation logic:

```
function MyFormComponent() {

    //++
    const validate = (values) =>{

        let error = {}

        if(!values.name){
            error.name = 'Please enter your name'
        }else if(values.name.length <3 ){
            error.name = 'name must be longer than 3 character'
        }

        return error
    }

  const { schema, onSubmit } = useForm({
    formSchema,
    validate //++
  });

  return (
    <div>
      <Form schema={schema} onSubmit={onSubmit} />
    </div>
  );
}

export default MyFormComponent;
```

In the example above, the validate function accepts the form values as input and returns an object containing validation errors, if any. You can define your custom validation rules within this function based on your specific validation requirements.

# Advanced Features

## Nested Elements

Formfast allows users to create nested form elements by adding children objects to their schema. This feature enables the creation of complex form structures with hierarchical organization, offering greater flexibility and control over form layout and composition.

```
 "": {
    el: "div",
    childrens: {
      "select your gender:": {
        el: "div",
        name: "gender",
        value: "female",
        type: "radioGroup",
        childrens: {
          male: {
            type: "radio",
            name: "gender",
            value: "male",
          },
          female: {
            type: "radio",
            name: "gender",
            value: "female",
          },
          others: {
            type: "radio",
            name: "gender",
            value: "others",
          },
        },
      },
      "select your country": {
        el: "select",
        name: "country",
        options: {
          bangladesh: {
            label: "bangladesh",
            value: "bangladesh",
          },
          india: {
            label: "india",
            value: "india",
          },
          japan: {
            label: "japan",
            value: "japan",
          },
        },
      },
    },
  },
```

> if your element is a div and you don't want a label then use empty string as object key **("")** or pass a property name **divLabel false**

## Disable Label and Error Elements

Users can disable label and error elements by passing options in the **useForm** hook. This feature allows for a more customized form layout, where labels and error messages can be displayed conditionally based on user preferences or application requirements.

```
 const { schema, onSubmit } = useForm({
    formSchema: data,
    options:{
        label:false // form won't create any label element
        error:false // form validation will be disable
    }
    onSubmit: handleSubmit,
  });
```

## Custom Value Handling

### Using useRef:

Users can handle form field values separately by passing an onChange function to useRef. This allows for fine-grained control over form state management and enables custom handling of form field values. you need to return a values object from onChange funciton

```
const onChange =(e)=>{

    let values = {}

        if(e.target.name === 'increament'){
            values.increament = e.target.value + 3
        }
    return values
}

const { schema, onSubmit } = useForm({
formSchema: data,
onSubmit: handleSubmit,
onChange
});
```

### Using onChange in Element Object:

Alternatively, users can handle form field values separately by passing an onChange function directly in the element object. This approach offers flexibility in value handling at the individual form field level.

```
const onChange =(e)=>{

    let values = {}

        if(e.target.name === 'increament'){
            values.increament = e.target.value + 3
        }
    return values
}

const formSchema = {
'first name':{
    name:'firstname'
    onChange
}
}
```
