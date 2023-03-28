import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function RegexEmail({ name, label }) {
  const [value, setValue] = useState('');
  const [isValid, setIsValid] = useState(false);
  const { register } = useForm();

  useEffect(() => {
    register(name, {
      required: true,
      pattern: {
        value: emailRegex,
        message: 'Please enter a valid email address',
      },
    });
  }, [name, register, emailRegex]);

  const handleValueChange = (event) => {
    const inputValue = event.target.value;
    console.log(inputValue);
    setValue(inputValue);
    setIsValid(emailRegex.test(inputValue));
  };

  return (
    <div>
      <label htmlFor={name}>{label}:</label>
      <input
        type="text"
        className="input"
        id={name}
        name={name}
        value={value}
        onChange={handleValueChange}
        onBlur={handleValueChange}
        aria-invalid={!isValid}
        {...register(name)}
      />
      {!isValid && <p>{`Please enter a valid ${label.toLowerCase()} address`}</p>}
    </div>
  );
}

export default RegexEmail;
