class Validator {
    name = '';
    email = '';
    password = '';
    income = '0';

    validateForm = () => {
        const setErrorMessage = (feild, message) => {
            feild.insertAdjacentHTML('afterend', `<span>${message}</span>`);
            document.getElementById('submit-button').disabled = true;

            feild.addEventListener('input', () => {
                const span = feild.nextElementSibling;
                span.setAttribute('class', 'inactive');
                document.getElementById('submit-button').disabled = false;
            });
        };

        const removeErrorMessage = () => {
            document.getElementById('submit-button').addEventListener('click', () => {
                const allSpans = document.querySelectorAll('span');
                allSpans.forEach(item => item.remove());
            });
        };

        const form = document.forms[0];
        form.setAttribute('novalidate', true);
        form && form.addEventListener('submit', (e) => {
            e.preventDefault()

            const isRequired = () => {
                const inputRequired = form.querySelectorAll('input[required]');
                inputRequired.forEach((item) => {
                    if (item.validity.valueMissing === true) {
                        item.classList.add('invalid');
                        setErrorMessage(item, 'Please, fill out this field');
                        removeErrorMessage();
                        return true;
                    } else {
                        item.classList.remove('invalid');
                        return false;
                    };
                });
            };

            const isName = () => {
                const inputName = document.getElementById('user-first-name');
                this.name = inputName.value;

                if (inputName.checkValidity() === true) {
                    inputName.classList.remove('invalid');
                    return true;
                } else if (inputName.validity.tooShort === true) {
                    inputName.classList.add('invalid');
                    setErrorMessage(inputName, 'The name is too short');
                    removeErrorMessage();
                    return false;
                } else if (this.name != '') {
                    setErrorMessage(inputName, 'You can use letters only');
                    removeErrorMessage();
                    return false;
                };
            };

            const isEmail = () => {
                const inputEmail = document.getElementById('email');
                this.email = inputEmail.value;
                const regex = /^[a-zA-Z0-9.!_]+@[a-zA-Z]+[.]+([a-zA-Z]+)*$/;

                if (this.email.match(regex)) {
                    inputEmail.classList.remove('invalid');
                    return true;
                } else if (this.email != '') {
                    inputEmail.classList.add('invalid');
                    setErrorMessage(inputEmail, 'Invalid email, please try again');
                    removeErrorMessage();
                    return false
                };
            };

            const isPassword = () => {
                const inputPassword = document.getElementById('user-pass');
                this.password = inputPassword.value;

                if (inputPassword.checkValidity() === true) {
                    inputPassword.classList.remove('invalid');
                    return true;
                } else if (this.password != '') {
                    inputPassword.classList.add('invalid');
                    setErrorMessage(inputPassword, 'You can use letters and numbers, at least 8 characters');
                    removeErrorMessage();
                    return
                };
            };

            const isConfirmPassword = () => {
                const inputConfirmPassword = document.getElementById('confirm-pass');

                if (inputConfirmPassword.value != this.password) {
                    inputConfirmPassword.classList.add('invalid');
                    setErrorMessage(inputConfirmPassword, 'Password is not the same. ');
                    removeErrorMessage();
                    return
                } else {
                    inputConfirmPassword.classList.remove('invalid');
                    return true;
                };
            };

            isRequired();
            isName();
            isEmail();
            isPassword();
            isConfirmPassword();

            if (!Object.values(form).some(item => item.classList.contains('invalid'))) {
                form.submit();
            };
        });

        const rangeOfIncome = () => {
            const inputRange = document.getElementById('amount-of-income');
            inputRange.value = this.income;
            const outputRange = document.getElementById('income');
            outputRange.innerHTML = (`${this.income} K`);

            inputRange.oninput = function() {
               outputRange.innerHTML = (`${this.value} K`);
            };
        };

        rangeOfIncome();
    };
};

new Validator().validateForm();
