/**
 * Wedding Configuration File (Template v2 Standard)
 * Define all couple, event, schedule, and gift data in one single place.
 */

export const weddingConfig = {
  couple: {
    bride: "Camila",
    groom: "Sebastián",
    fullBride: "Camila Andrea Mendoza",
    fullGroom: "Sebastián Andrés Navarro",
    parentsBride: "Carlos Mendoza & María Elena Suárez",
    parentsGroom: "Fernando Navarro & Patricia Gómez"
  },
  meta: {
    title: "Camila & Sebastián · Nuestra Boda",
    description: "Te invitamos a celebrar nuestra unión matrimonial",
    coverImage: "./assets/couple-hero.jpg"
  },
  event: {
    date: "2026-11-28T17:30:00",
    city: "Santa Cruz de la Sierra, Bolivia",
    dressCode: {
      type: "Formal Guayabera / Traje Claro",
      description: "Damas: Vestido largo tonos pastel. Caballeros: Traje formal claro o guayabera blanca.",
      colors: ["#E8D8C8", "#D9C3B0", "#A89F91", "#4A5568"]
    }
  },
  ceremony: {
    name: "Parroquia La Sagrada Familia",
    time: "17:30 hrs",
    address: "Av. San Martín #450, Equipetrol",
    mapsUrl: "https://maps.google.com/?q=Santa+Cruz+Bolivia"
  },
  reception: {
    name: "Jardines de Las Palmas",
    time: "19:30 hrs",
    address: "Km 8 Doble Vía a La Guardia",
    mapsUrl: "https://maps.google.com/?q=Santa+Cruz+Bolivia"
  },
  timeline: [
    { time: "17:30", title: "Ceremonia Religiosa", icon: "fa-church" },
    { time: "19:00", title: "Cóctel de Bienvenida", icon: "fa-champagne-glasses" },
    { time: "20:30", title: "Cena & Brindis", icon: "fa-utensils" },
    { time: "22:00", title: "Fiesta & Celebración", icon: "fa-music" }
  ],
  gifts: {
    bank: "Banco Nacional de Bolivia (BNB)",
    accountNumber: "250-0987654-1",
    accountHolder: "Sebastián Navarro",
    ci: "7891234 SC",
    qrImage: "./assets/qr-banco.jpg"
  },
  rsvp: {
    whatsappPhone: "+59178912345",
    deadline: "10 de Noviembre, 2026"
  },
  audio: {
    src: "../../shared_assets/audio/wedding-song.mp3",
    title: "Perfect Symphony"
  }
};
