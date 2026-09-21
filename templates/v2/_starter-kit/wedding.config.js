/**
 * Wedding Configuration File (Template v2 Schema Boilerplate)
 * Rellena este archivo con los datos reales del evento sin tocar el código HTML.
 */

export const weddingConfig = {
  couple: {
    bride: "",
    groom: "",
    fullBride: "",
    fullGroom: "",
    parentsBride: "",
    parentsGroom: ""
  },
  meta: {
    title: "Nuestra Boda",
    description: "Invitación Digital de Boda",
    coverImage: "./assets/couple-hero.jpg"
  },
  event: {
    date: "2026-12-31T18:00:00", // Formato ISO: YYYY-MM-DDTHH:mm:ss
    city: "",
    dressCode: {
      type: "",
      description: "",
      colors: []
    }
  },
  ceremony: {
    name: "",
    time: "",
    address: "",
    mapsUrl: ""
  },
  reception: {
    name: "",
    time: "",
    address: "",
    mapsUrl: ""
  },
  timeline: [
    // { time: "18:00", title: "Ceremonia", icon: "fa-church" }
  ],
  gifts: {
    bank: "",
    accountNumber: "",
    accountHolder: "",
    ci: "",
    qrImage: "./assets/qr-banco.jpg"
  },
  rsvp: {
    whatsappPhone: "+59100000000",
    deadline: ""
  },
  audio: {
    src: "../../shared_assets/audio/wedding-song.mp3",
    title: ""
  }
};
