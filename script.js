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

      // 🔸 Ramos SIN prerrequisitos → siempre desbloqueados
      if (!ramo.dataset.prereq) {
        ramo.classList.remove("bloqueado");
        ramo.classList.add("desbloqueado");
        return;
      }

      const prereqs = ramo.dataset.prereq.split(",");
      const cumple = prereqs.every(p => aprob
