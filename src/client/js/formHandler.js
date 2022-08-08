import axios from "axios";

const form = document.querySelector("form");

async function handleSubmit(event) {
  event.preventDefault();

  const formData = Object.fromEntries(new FormData(form));
  console.log("formData :>> ", formData);
  const data = await (
    await axios.post("http://localhost:8080/trips", formData)
  ).data;

  console.log("data :>> ", data);
}

export { handleSubmit };
