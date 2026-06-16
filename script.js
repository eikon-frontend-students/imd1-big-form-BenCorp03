const checkbox = document.getElementById("terms");
const button = document.getElementById("register-btn");

checkbox.addEventListener("change", () => {
  button.disabled = !checkbox.checked;
});

const zipInput = document.getElementById("zip");
const cityInput = document.getElementById("city");

zipInput.addEventListener("input", async () => {
  const zip = zipInput.value.trim();

  if (zip.length < 4) return;

  try {
    const response = await fetch(
      `https://openplzapi.org/ch/Localities?postalCode=${zip}`,
    );
    const data = await response.json();

    if (data.length > 0) {
      cityInput.value = data[0].name;
    }
  } catch (error) {
    console.error("Erreur API ZIP → City :", error);
  }
});

button.addEventListener("click", (e) => {
  e.preventDefault();

  const firstname = document.getElementById("firstname").value.trim();
  const lastname = document.getElementById("lastname").value.trim();
  const email = document.getElementById("email").value.trim();
  const dob = document.getElementById("dob").value.trim();
  const address = document.getElementById("address").value.trim();
  const zip = document.getElementById("zip").value.trim();
  const city = document.getElementById("city").value.trim();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirm = document.getElementById("confirm").value.trim();

  if (
    !firstname ||
    !lastname ||
    !email ||
    !dob ||
    !address ||
    !zip ||
    !city ||
    !username ||
    !password ||
    !confirm
  ) {
    alert("Please fill in all fields.");
    return;
  }

  if (!email.includes("@") || !email.includes(".")) {
    alert("Please enter a valid email address.");
    return;
  }

  if (password !== confirm) {
    alert("Passwords do not match.");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || []; //charger la base de donnée

  users.push({
    username: username,
    password: password,
    email: email,
  });

  localStorage.setItem("users", JSON.stringify(users));

  window.location.href = "success.html";
});
