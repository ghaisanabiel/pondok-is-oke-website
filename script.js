// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// WhatsApp number for booking requests — update if this changes.
const WHATSAPP_NUMBER = "6282229570552";

function formatDate(value) {
  if (!value) return "-";
  const d = new Date(value + "T00:00:00");
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

const form = document.getElementById("booking-form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const checkin = document.getElementById("checkin").value;
  const checkout = document.getElementById("checkout").value;
  const guests = document.getElementById("guests").value;
  const roomType = document.getElementById("room-type").value;
  const name = document.getElementById("guest-name").value.trim();
  const notes = document.getElementById("notes").value.trim();

  if (!checkin || !checkout || !name) {
    alert("Please fill in check-in date, check-out date, and your name.");
    return;
  }

  if (new Date(checkout) <= new Date(checkin)) {
    alert("Check-out date should be after check-in date.");
    return;
  }

  const lines = [
    `Hi Pondok Isoke, I'd like to check availability.`,
    ``,
    `Name: ${name}`,
    `Check-in: ${formatDate(checkin)}`,
    `Check-out: ${formatDate(checkout)}`,
    `Guests: ${guests}`,
    `Room: ${roomType}`,
  ];

  if (notes) {
    lines.push(``, `Notes: ${notes}`);
  }

  const message = encodeURIComponent(lines.join("\n"));
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

  window.open(url, "_blank");
});

// Keep check-out date from being set before check-in
const checkinEl = document.getElementById("checkin");
const checkoutEl = document.getElementById("checkout");

checkinEl.addEventListener("change", function () {
  if (checkinEl.value) {
    checkoutEl.min = checkinEl.value;
  }
});