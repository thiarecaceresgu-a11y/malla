document.addEventListener("DOMContentLoaded", () => {
  const ramos = document.querySelectorAll(".ramo");

  // 🔹 Cargar progreso guardado
  const aprobadosGuardados = JSON.parse(localStorage.getItem("aprobados")) || [];

  ramos.forEach(ramo => {
    if (aprobadosGuardados.includes(ramo.dataset.id)) {
      ramo.classList.add("aprobado");
    }
  });

  function actualizarBloqueos() {
    const aprobados = [...document.querySelectorAll(".ramo.aprobado")]
      .map(r => r.dataset.id);

    ramos.forEach(ramo => {
      if (!ramo.dataset.prereq) return;

      const prereqs = ramo.dataset.prereq.split(",");
      const cumple = prereqs.every(p => aprobados.includes(p));

      if (cumple) {
        ramo.classList.remove("bloqueado");
      } else {
        ramo.classList.add("bloqueado");
        ramo.classList.remove("aprobado");
      }
    });

    // 🔹 Guardar progreso
    localStorage.setItem("aprobados", JSON.stringify(aprobados));
  }

  ramos.forEach(ramo => {
    ramo.addEventListener("click", () => {
      if (ramo.classList.contains("bloqueado")) return;

      ramo.classList.toggle("aprobado");
      actualizarBloqueos();
    });
  });

  actualizarBloqueos(); // estado inicial
});


