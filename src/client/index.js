import "./styles/base.scss";
import { renderTripList } from "./js/renderer";

window.addEventListener("load", () => {
  renderTripList();
});

export { validateFormData } from "./js/validateFormData";
export { handleSubmit } from "./js/formHandler";
