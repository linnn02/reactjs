import { useState } from "react";

// проверка имени
function validateName(name) {
    if (!name.trim()) return "name is required";
    if (name.trim().length < 2) return "name must be at least 2 characters";
    return "";
}

// проверка email
function validateEmail(email) {
    if (!email.trim()) return "email is required";
    const re = /[^@\s]+@[^@\s]+\.[^@\s]+/;
    if (!re.test(email)) return "invalid email format";
    return "";
}

// проверка возраста
function validateAge(age) {
    if (!age.trim()) return "age is required";
    const num = Number(age);
    if (isNaN(num)) return "age must be a number";
    if (num < 18) return "must be 18 or older";
    return "";
}

export default function RegistrationForm() {
    // состояния полей
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");

    // состояния ошибок
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [ageError, setAgeError] = useState("");

    // состояние успеха
    const [success, setSuccess] = useState(false);

    // обработка отправки формы
    const handleSubmit = (e) => {
        e.preventDefault();

        // проверяем все поля
        const nErr = validateName(name);
        const eErr = validateEmail(email);
        const aErr = validateAge(age);

        setNameError(nErr);
        setEmailError(eErr);
        setAgeError(aErr);

        // если есть ошибки не отправляем
        if (nErr || eErr || aErr) {
            setSuccess(false);
            return;
        }

        // успех
        setSuccess(true);

        // очистка формы
        setName("");
        setEmail("");
        setAge("");
    };

    return (
        <div>
            <h2>registration</h2>
            <form onSubmit={handleSubmit}>
                <input type="text"
                placeholder="name"
                value={name}
                onChange={(e) => {
                    const value = e.target.value;
                    setName(value);
                    setNameError(validateName(value));
                    setSuccess(false);
                }}
                />
                {nameError && <p>{nameError}</p>}

                <input type="email"
                placeholder="email"
                value={email}
                onChange={(e) => {
                    const value = e.target.value;
                    setEmail(value);
                    setEmailError(validateEmail(value));
                    setSuccess(false);
                }}
                />
                {emailError && <p>{emailError}</p>}

                <input type="number"
                placeholder="age"
                value={age}
                onChange={(e) => {
                    const value = e.target.value;
                    setAge(value);
                    setAgeError(validateAge(value));
                    setSuccess(false);
                }}
                />
                {ageError && <p>{ageError}</p>}

                <button type="submit">submit</button></form>
                {success && <p>registration successful</p>}
                </div>);
}
