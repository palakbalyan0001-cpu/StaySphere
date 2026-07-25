export const roomfield = [
  {
    type: "text",
    name: "roomNumber",
    placeholder: "Room Number",
    col: 6,
  },
  {
    type: "select",
    name: "type",
    placeholder: "Room Type",
    options: ["Single", "Double", "Deluxe", "Suite", "Family"],
    col: 6,
  },
  {
    type: "number",
    name: "pricePerNight",
    placeholder: "Price / Night (€)",
    col: 4,
  },
  {
    type: "select",
    name: "acNonAc",
    placeholder: "AC / Non-AC",
    options: ["AC", "Non-AC"],
    col: 4,
  },
  {
    type: "select",
    name: "bedType",
    placeholder: "Bed Type",
    options: ["Single", "Double", "Queen", "King", "Twin"],
    col: 4,
  },
  {
    type: "number",
    name: "capacity",
    placeholder: "Capacity",
    col: 4,
  },
   {
    type: "select",
    name: "wifi",
    placeholder: "wifi",
    options: ["true","false"],
    col: 4,
  },
  {
    type: "select",
    name: "status",
    placeholder: "Status",
    options: ["Available", "Booked", "Maintenance"],
    col: 4,
  },
  {
    type: "textarea",
    name: "description",
    placeholder: "Description",
    col: 12,
  }
];