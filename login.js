const loginBtn = document.querySelector(".login-btn");

loginBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const username = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value.trim();

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const found = users.find(
    (u) => u.username === username && u.password === password,
  );

  if (found) {
    localStorage.setItem("loggedInUser", username);
    window.location.href = "dashboard.html";
  } else {
    alert("Invalid username or password.");
  }
});
