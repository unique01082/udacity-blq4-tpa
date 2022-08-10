import axios from "axios";
import { renderTripList } from "./renderer";
import { validateFormData } from "./validateFormData";

const form = document.querySelector("form");
const submitButton = document.querySelector("#submitButton");

async function handleSubmit(event) {
  event.preventDefault();

  const formData = Object.fromEntries(new FormData(form));
  try {
    validateFormData(formData);
  } catch (error) {
    alert(error);
    return;
  }

  try {
    submitButton.innerHTML = "Submitting...";
    const data = await (
      await axios.post("http://localhost:9099/trips", formData)
    ).data;

    renderTripList();
    submitButton.innerHTML = "Add";
  } catch (error) {
    alert("Some thing went wrong. Please check your input data and try again.");
  }
}

export { handleSubmit };
