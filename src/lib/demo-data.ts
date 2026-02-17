export type ProjectStatus = "planning" | "analyzing" | "designing" | "deployment" | "monitoring";

export interface Project {
    id: string;
    name: string;
    location: string;
    client: string;
    status: ProjectStatus;
    progress: number;
    lastUpdated: string;
    coordinates: [number, number]; // Lat, Lng
    targetSpecies: string[];
    environmentType: string;
}

export interface SpeciesProfile {
    id: string;
    commonName: string;
    scientificName: string;
    growthRate: number; // cm/yr
    preferredDepth: [number, number]; // min, max meters
    resilienceScore: number; // 0-100
    imageUrl: string;
}

export interface CBrickType {
    id: string;
    name: string;
    description: string;
    suitability: string[]; // List of species IDs
    costPerUnit: number;
    co2Sequestration: number; // kg
}

export const MOCK_PROJECTS: Project[] = [
    {
        id: "proj_001",
        name: "Great Barrier Reef North - Sector A",
        location: "Queensland, Australia",
        client: "Marine Conservation Society",
        status: "designing",
        progress: 45,
        lastUpdated: "2 mins ago",
        coordinates: [-16.5003, 145.6338],
        targetSpecies: ["sp_acropora", "sp_pocillopora"],
        environmentType: "shallow_tropical"
    },
    {
        id: "proj_002",
        name: "Maldives Resort Restoration",
        location: "Baa Atoll, Maldives",
        client: "Six Senses Laamu",
        status: "monitoring",
        progress: 92,
        lastUpdated: "4 hours ago",
        coordinates: [5.3333, 73.0000],
        targetSpecies: ["sp_porites"],
        environmentType: "shallow_tropical"
    },
    {
        id: "proj_003",
        name: "Florida Keys Rehabilitation",
        location: "Key Largo, FL, USA",
        client: "NOAA",
        status: "analyzing",
        progress: 15,
        lastUpdated: "1 day ago",
        coordinates: [25.0865, -80.4473],
        targetSpecies: ["sp_acropora_cerv"],
        environmentType: "turbid_inshore"
    }
];

export const SPECIES_DB: SpeciesProfile[] = [
    {
        id: "sp_acropora",
        commonName: "Staghorn Coral",
        scientificName: "Acropora cervicornis",
        growthRate: 10,
        preferredDepth: [5, 20],
        resilienceScore: 65,
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuB9ndrekBrUxirrsSSV6SofpodkhHSO6GSuqh2iIBcm34CPsgUv397lluAZWfHSPap20VpPskAiMyTl2X52qnCDeOSKfx709s16bwdtjzmeRDvWR5MupN2VryKnbL3DLnjnVrQbdZNrCDC1qs4QkHpPZkBrFdpn0VgUMZq7IeJ-fkMlubbWTavmiTHvRpK7tu3Xb4IpO16ZJ8DCbkibKo3mwsogmzHmcM1OrH6nM6HjCpYTHsDsVQrFzBfLaPYcrpLymNzFTMGrexw" // Placeholder
    },
    {
        id: "sp_boulder",
        commonName: "Boulder Star Coral",
        scientificName: "Orbicella annularis",
        growthRate: 1.5,
        preferredDepth: [8, 40],
        resilienceScore: 85,
        imageUrl: ""
    },
    {
        id: "sp_elkhorn",
        commonName: "Elkhorn Coral",
        scientificName: "Acropora palmata",
        growthRate: 8,
        preferredDepth: [1, 12],
        resilienceScore: 60,
        imageUrl: ""
    }
];

export const C_BRICK_TYPES: CBrickType[] = [
    {
        id: "cb_hex_v4",
        name: "Hex-Lattice v4",
        description: "High surface area reticulated structure optimized for branching corals.",
        suitability: ["sp_acropora", "sp_elkhorn"],
        costPerUnit: 45,
        co2Sequestration: 18.5
    },
    {
        id: "cb_dome_v2",
        name: "Bio-Dome v2",
        description: "Solid base structure with micro-crevices for massive coral recruitment.",
        suitability: ["sp_boulder"],
        costPerUnit: 60,
        co2Sequestration: 24.0
    }
];
