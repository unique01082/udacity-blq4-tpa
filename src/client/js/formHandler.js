import axios from "axios";
import { renderTripList } from "./renderer";
import { validateFormData } from "./validateFormData";

const form = document.querySelector("form");
const submitButton = document.querySelector("#submitButton");

/**
 * Handle form submission
 * @param {SubmitEvent} event
 * @returns Promise<void>
 */
async function handleSubmit(event) {
  event.preventDefault();

  // Get form data
  const formData = Object.fromEntries(new FormData(form));
  try {
    // Validate form data
    validateFormData(formData);
  } catch (error) {
    // If form data are invalid, show error message and break
    alert(error);
    return;
  }

  try {
    // Change label of submit button
    submitButton.innerHTML = "Submitting...";

    // Create new trip
    const data = await (
      await axios.post("http://localhost:9099/trips", formData)
    ).data;

    // Re-render trip list after add new new trip successfully
    renderTripList();

    // Change label of submit button back
    submitButton.innerHTML = "Add";
  } catch (error) {
    // Handle error
    alert("Some thing went wrong. Please check your input data and try again.");
  }
}

export { handleSubmit };
