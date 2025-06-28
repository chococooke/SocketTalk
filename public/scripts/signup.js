const baseUrl = `http://localhost:5000`;

const signupForm = document.getElementById("signup-form");

signupForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  try {
    const formData = {
      name: event.target.name.value,
      email: event.target.email.value,
      password: event.target.password.value,
    };

    const res = await axios.post(`${baseUrl}/api/auth/signup`, formData);

    if (res.status !== 200) {
      console.log(res);
    }

    localStorage.setItem("user", res.data.user);
    window.location.href = `${baseUrl}/app`;
  } catch (err) {
    console.error(err);
    window.alert(err.response.data.error);
  }
});
