document.addEventListener("DOMContentLoaded", () => {
  const ramos = document.querySelectorAll(".ramo");

  ramos.forEach(ramo => {
    ramo.addEventListener("click", () => {

      if (ramo.classList.contains("bloqueado")) return;

      ramo.classList.toggle("aprobado");

      ramos.forEach(r => {
        if (!r.dataset.prereq) return;

        const prereqs = r.dataset.prereq.split(",");
        const aprobados = [...document.querySelectorAll(".ramo.aprobado")]
          .map(x => x.dataset.id);

        if (prereqs.every(p => aprobados.includes(p))) {
          r.classList.remove("bloqueado");
        }
      });
    });
  });
});

