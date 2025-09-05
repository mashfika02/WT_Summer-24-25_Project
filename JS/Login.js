function showPassword() {
    const passwordInput = document.getElementById("password");
    const showPassCheckbox = document.getElementById("showpass");

    if (showPassCheckbox.checked) {
        passwordInput.type = "text";
    }
    else {
        passwordInput.type = "password";
    }
}

// Simple client-side validation: ensure fields are not empty
function validateLoginForm(event){
    const user = document.getElementById('username').value.trim();
    const pass = document.getElementById('password').value.trim();
    const errBox = document.getElementById('loginError');
    if(!errBox) return true; // nothing to show
    if(user === '' || pass === ''){
        errBox.textContent = 'Please fill both username and password.';
        errBox.style.display = 'block';
        event.preventDefault();
        return false;
    }
    // Client-side demo credential check (admin/admin)
    if(user !== 'admin' || pass !== 'admin'){
        errBox.textContent = 'Wrong username or password.';
        errBox.style.display = 'block';
        event.preventDefault();
        return false;
    }
    // hide error and allow submit
    errBox.style.display = 'none';
    return true;
}

window.validateLoginForm = validateLoginForm;