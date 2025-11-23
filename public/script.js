

window.onload = function() {
  
const msg = document.getElementById("msg");
const btn = document.getElementById("btn");

btn.addEventListener("click", () => {
  const now = new Date().toLocaleString();
  msg.textContent = `Button clicked at ${now}`;
});
   
}

