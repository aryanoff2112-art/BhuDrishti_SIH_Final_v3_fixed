import type { FeatureCollection } from 'geojson';

export const CADASTRAL_FEATURE_COLLECTION: FeatureCollection = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      id: "plot-214-2",
      properties: {
        khasraNumber: "214/2",
        khataNumber: "104",
        village: "Rampur Kalan",
        tehsil: "Sadar",
        district: "Lucknow",
        ownerName: "Rameshwar Dayal & Brothers",
        areaHectares: 1.425,
        landType: "Agricultural (Chahi)",
        status: "Discrepancy Detected",
        fillColor: "#f59e0b", // amber warning
        strokeColor: "#d97706"
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [80.9421, 26.8485],
            [80.9465, 26.8492],
            [80.9458, 26.8458],
            [80.9415, 26.8452],
            [80.9421, 26.8485]
          ]
        ]
      }
    },
    {
      type: "Feature",
      id: "plot-108",
      properties: {
        khasraNumber: "108",
        khataNumber: "45",
        village: "Mauje Baramati",
        tehsil: "Baramati",
        district: "Pune",
        ownerName: "Anand Dattatray Patil",
        areaHectares: 2.15,
        landType: "Irrigated Bagayat",
        status: "Verified Clear",
        fillColor: "#10b981", // emerald green
        strokeColor: "#059669"
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [80.9468, 26.8493],
            [80.9515, 26.8501],
            [80.9508, 26.8465],
            [80.9461, 26.8460],
            [80.9468, 26.8493]
          ]
        ]
      }
    },
    {
      type: "Feature",
      id: "plot-432-1",
      properties: {
        khasraNumber: "432/1",
        khataNumber: "78",
        village: "Goharganj",
        tehsil: "Goharganj",
        district: "Raisen",
        ownerName: "Kunwar Balwant Singh",
        areaHectares: 3.85,
        landType: "Barani (Unirrigated)",
        status: "Pending Re-survey",
        fillColor: "#3b82f6",
        strokeColor: "#2563eb"
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [80.9415, 26.8450],
            [80.9458, 26.8456],
            [80.9452, 26.8415],
            [80.9408, 26.8410],
            [80.9415, 26.8450]
          ]
        ]
      }
    },
    {
      type: "Feature",
      id: "plot-public-pasture",
      properties: {
        khasraNumber: "GS-01",
        khataNumber: "GS-Govt",
        village: "Rampur Kalan",
        tehsil: "Sadar",
        district: "Lucknow",
        ownerName: "Gram Sabha Pasture (Charagah - Section 132 UPZA)",
        areaHectares: 4.12,
        landType: "Public Utility / Pasture",
        status: "Protected Public Land",
        fillColor: "#8b5cf6", // purple
        strokeColor: "#7c3aed"
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [80.9365, 26.8480],
            [80.9418, 26.8484],
            [80.9412, 26.8448],
            [80.9358, 26.8442],
            [80.9365, 26.8480]
          ]
        ]
      }
    },
    {
      type: "Feature",
      id: "plot-waterbody",
      properties: {
        khasraNumber: "GS-02",
        khataNumber: "GS-Pond",
        village: "Rampur Kalan",
        tehsil: "Sadar",
        district: "Lucknow",
        ownerName: "Pokhar / Natural Water Reservoir",
        areaHectares: 1.85,
        landType: "Water Body (Non-transferable)",
        status: "Protected Water Body",
        fillColor: "#06b6d4", // cyan water
        strokeColor: "#0891b2"
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [80.9460, 26.8457],
            [80.9505, 26.8463],
            [80.9500, 26.8425],
            [80.9453, 26.8418],
            [80.9460, 26.8457]
          ]
        ]
      }
    }
  ]
};
