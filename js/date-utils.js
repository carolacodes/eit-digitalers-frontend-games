export function formatDate(date) {
  // - Convertir la fecha en un objeto Date
  // const fecha = new Date(date)

  // const year = fecha.getFullYear();
  // const month = fecha.getMonth() + 1; // Los meses empiezan desde 0
  // const day = fecha.getDate();

  // return `${day}-${month}-${year}`;
  // - Formatear la fecha al estilo español (DD/MM/YYYY)
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const fechaFormateada = new Date(date).toLocaleDateString('es-ES', options);

    return fechaFormateada
  // - Convertir la fecha usando la API Intl.

  // const fecha = new Date(date);
  // const formatter = new Intl.DateTimeFormat("es-AR", {
  //   year: "numeric",
  //   month: "2-digit",
  //   day: "2-digit",
  // });

  // return formatter.format(fecha);
}


export function formatDateTime(date) {
  // - Formatear la fecha y hora al estilo español (DD/MM/YYYY HH:mm:ss)
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const fechaHoraFormateada = new Date(date).toLocaleString('es-ES', options);

    return fechaHoraFormateada;
}


export function saludarHora() {
  // Logica super interesante
}