const baseUrl = `http://localhost:5000`;

const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  try {
    const formData = {
      email: event.target.email.value,
      password: event.target.password.value,
    };

    console.log(formData);

    const res = await axios.post(`${baseUrl}/api/auth/login`, formData);

    if (res.status !== 200) {
      console.log(res.response);
      return;
    }

    console.log(res);

    localStorage.setItem("user", JSON.stringify(res.data.user));
    window.location.href = `${baseUrl}/app`;
  } catch (err) {
    window.alert(err.response.data.error);
  }
});
