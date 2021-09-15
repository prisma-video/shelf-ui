import { shelf_ui } from "../../declarations/shelf_ui";

document.getElementById("clickMeBtn").addEventListener("click", async () => {
  const name = document.getElementById("name").value.toString();
  // Interact with shelf_ui actor, calling the greet method
  const greeting = await shelf_ui.greet(name);

  document.getElementById("greeting").innerText = greeting;
});
