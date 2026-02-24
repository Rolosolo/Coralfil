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
    diseaseVulnerability: {
        diseaseName: string;
        riskLevel: "low" | "medium" | "high";
        recommendedStrain?: string;
    }[];
}

export interface ProbioticConsortium {
    name: string;
    strains: string[];
    targetDisease?: string;
    geographicFocus: string[];
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
    },
    {
        id: "proj_004",
        name: "Red Sea Resilience Project",
        location: "Sharm El-Sheikh, Egypt",
        client: "HEPCA",
        status: "planning",
        progress: 5,
        lastUpdated: "Just now",
        coordinates: [27.9158, 34.3299],
        targetSpecies: ["sp_stylophora", "sp_platygyra"],
        environmentType: "high_salinity_tropical"
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
        imageUrl: "https://images.unsplash.com/photo-1546026423-cc4642628d2b?auto=format&fit=crop&q=80&w=800",
        diseaseVulnerability: [
            { diseaseName: "SCTLD", riskLevel: "high", recommendedStrain: "Pseudoalteromonas McH1-7" },
            { diseaseName: "White Band Disease", riskLevel: "medium", recommendedStrain: "Cytobacillus firmus" }
        ]
    },
    {
        id: "sp_boulder",
        commonName: "Boulder Star Coral",
        scientificName: "Orbicella annularis",
        growthRate: 1.5,
        preferredDepth: [8, 40],
        resilienceScore: 85,
        imageUrl: "https://images.unsplash.com/photo-1582967788606-a171c1080cb0?auto=format&fit=crop&q=80&w=800",
        diseaseVulnerability: [
            { diseaseName: "SCTLD", riskLevel: "high", recommendedStrain: "Pseudoalteromonas McH1-7" }
        ]
    },
    {
        id: "sp_elkhorn",
        commonName: "Elkhorn Coral",
        scientificName: "Acropora palmata",
        growthRate: 8,
        preferredDepth: [1, 12],
        resilienceScore: 60,
        imageUrl: "https://images.unsplash.com/photo-1544551763-47a0159f9234?auto=format&fit=crop&q=80&w=800",
        diseaseVulnerability: [
            { diseaseName: "SCTLD", riskLevel: "medium", recommendedStrain: "Pseudoalteromonas McH1-7" },
            { diseaseName: "White Band Disease", riskLevel: "high", recommendedStrain: "Cytobacillus firmus" }
        ]
    },
    {
        id: "sp_brain",
        commonName: "Grooved Brain Coral",
        scientificName: "Diploria labyrinthiformis",
        growthRate: 1.2,
        preferredDepth: [2, 30],
        resilienceScore: 90,
        imageUrl: "https://images.unsplash.com/photo-1644315260173-042125642730?auto=format&fit=crop&q=80&w=800",
        diseaseVulnerability: [
            { diseaseName: "Black Band Disease", riskLevel: "high" }
        ]
    },
    {
        id: "sp_mesa",
        commonName: "Mesa Coral",
        scientificName: "Acropora hyacinthus",
        growthRate: 12,
        preferredDepth: [5, 15],
        resilienceScore: 55,
        imageUrl: "https://images.unsplash.com/photo-1516682858273-063372fdeced?auto=format&fit=crop&q=80&w=800",
        diseaseVulnerability: [
            { diseaseName: "Coral Bleaching", riskLevel: "high" }
        ]
    }
];

export const PROBIOTIC_CONSORTIA: ProbioticConsortium[] = [
    {
        name: "Caribbean Shield v1",
        strains: ["Cytobacillus firmus", "Pseudoalteromonas McH1-7", "Endozoicomonas acroporae", "Halomonas smyrnensis"],
        targetDisease: "SCTLD",
        geographicFocus: ["Caribbean", "Florida Keys", "Gulf of Mexico"]
    },
    {
        name: "Indo-Pacific Resilience",
        strains: ["Cytobacillus firmus", "Endozoicomonas acroporae", "Halomonas smyrnensis", "Pseudoalteromonas sp."],
        targetDisease: "General Pathogen Resistance",
        geographicFocus: ["Great Barrier Reef", "Maldives", "Indonesia"]
    },
    {
        name: "Red Sea Bio-Defense",
        strains: ["Halomonas sp.", "Vibrio alginolyticus (non-pathogenic)", "Alteromonas sp."],
        targetDisease: "Heat Stress Resistance",
        geographicFocus: ["Red Sea", "Gulf of Aden"]
    }
];

export const REGIONAL_DISEASE_RISK: Record<string, { disease: string; risk: "low" | "medium" | "high" }> = {
    "Florida Keys, USA": { disease: "SCTLD", risk: "high" },
    "Key Largo, FL, USA": { disease: "SCTLD", risk: "high" },
    "Baa Atoll, Maldives": { disease: "General Pathogens", risk: "low" },
    "Queensland, Australia": { disease: "Black Band Disease", risk: "medium" },
    "Sharm El-Sheikh, Egypt": { disease: "Heat Stress", risk: "high" }
};

export const C_BRICK_TYPES: CBrickType[] = [
    {
        id: "cb_hex_v4",
        name: "Hex-Lattice v4",
        description: "High surface area reticulated structure optimized for branching corals.",
        suitability: ["sp_acropora", "sp_elkhorn", "sp_mesa"],
        costPerUnit: 45,
        co2Sequestration: 18.5
    },
    {
        id: "cb_dome_v2",
        name: "Bio-Dome v2",
        description: "Solid base structure with micro-crevices for massive coral recruitment.",
        suitability: ["sp_boulder", "sp_brain"],
        costPerUnit: 60,
        co2Sequestration: 24.0
    },
    {
        id: "cb_reef_shield",
        name: "ReefShield Max",
        description: "Industrial grade modular protective unit with high thermal mass.",
        suitability: ["sp_boulder", "sp_porites"],
        costPerUnit: 85,
        co2Sequestration: 32.2
    }
];

