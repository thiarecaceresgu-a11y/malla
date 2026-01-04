document.addEventListener("DOMContentLoaded", function () {
  const ramos = document.querySelectorAll(".ramo");

  ramos.forEach(function (ramo) {
    ramo.addEventListener("click", function () {
      ramo.classList.toggle("aprobado");
    });
  });
});
