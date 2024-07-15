const months = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

const weekdays = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();
let events = [];

const calendarDays = document.getElementById("days");
const monthYearText = document.getElementById("month-year");

function generateCalendar() {
    let days = "";

    // Obtener el primer día del mes y el último día del mes
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);

    // Calcular el número de días en el mes anterior
    const lastDayOfPreviousMonth = new Date(currentYear, currentMonth, 0).getDate();

    // Calcular el día de la semana del primer día del mes
    const startDayOfWeek = firstDayOfMonth.getDay();

    // Calcular el número de días en el mes actual
    const numDays = lastDayOfMonth.getDate();

    // Generar días del mes anterior que aparecen en la primera semana
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
        days += `<div class="day prev-month">${lastDayOfPreviousMonth - i}</div>`;
    }

    // Generar días del mes actual
    for (let day = 1; day <= numDays; day++) {
        const today = new Date();
        const isToday = currentMonth === today.getMonth() && currentYear === today.getFullYear() && day === today.getDate();
        const event = events.find(event => event.date === `${currentYear}-${currentMonth + 1}-${day}`);
        days += `<div class="day ${isToday ? 'today' : ''}">${day}${event ? `<div class="event">${event.description}</div>` : ''}</div>`;
    }

    // Mostrar los días en el calendario
    calendarDays.innerHTML = days;

    // Actualizar el texto del mes y año
    monthYearText.textContent = `${months[currentMonth]} ${currentYear}`;
}

function prevMonth() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    generateCalendar();
}

function nextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    generateCalendar();
}

function addEvent(event) {
    event.preventDefault();
    const eventDate = document.getElementById('event-date').value;
    const eventDescription = document.getElementById('event-description').value;

    if (eventDate && eventDescription) {
        events.push({
            date: eventDate,
            description: eventDescription
        });
        generateCalendar();
        document.getElementById('event-form').reset();
    }
}

// Generar calendario al cargar la página
generateCalendar();

// Agregar evento al formulario
document.getElementById('event-form').addEventListener('submit', addEvent);
