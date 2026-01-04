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

// 🔽 EXPORTAR PROGRESO
document.getElementById("exportar").addEventListener("click", () => {
  const data = localStorage.getItem("aprobados");
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "mi_progreso_malla.json";
  a.click();

  URL.revokeObjectURL(url);
});

// 🔼 IMPORTAR PROGRESO
const inputArchivo = document.getElementById("archivo");

document.getElementById("importar").addEventListener("click", () => {
  inputArchivo.click();
});

inputArchivo.addEventListener("change", e => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    localStorage.setItem("aprobados", reader.result);
    location.reload();
  };
  reader.readAsText(file);
});

