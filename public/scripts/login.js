const baseUrl = `http://localhost:5000`;

const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  try {
    const formData = {
      email: event.target.email.value,
      password: event.target.password.value,
    };

    const res = await axios.post(`${baseUrl}/api/auth/login`, formData);
    
    if (res.status !== 200) {
      console.log(res);
      return;
    }

    localStorage.setItem("user", res.data.user);
  } catch (err) {
    console.error(err);
  }
});
