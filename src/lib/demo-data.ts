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
        riskLevel: "low" | "medium" | "high" | "critical";
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
        name: "Barkley Sound Sponge Reefs",
        location: "British Columbia, Canada",
        client: "Pacific Marine Science Institute",
        status: "analyzing",
        progress: 32,
        lastUpdated: "2 mins ago",
        coordinates: [48.8333, -125.1333],
        targetSpecies: ["sp_glass_sponge", "sp_cold_water_coral"],
        environmentType: "cold_nutrient_rich"
    },
    {
        id: "proj_002",
        name: "Exuma Cays Foundation",
        location: "Exuma, Bahamas",
        client: "Bahamas National Trust",
        status: "designing",
        progress: 68,
        lastUpdated: "4 hours ago",
        coordinates: [23.5000, -75.8333],
        targetSpecies: ["sp_acropora", "sp_elkhorn"],
        environmentType: "shallow_tropical"
    },
    {
        id: "proj_003",
        name: "Hecate Strait Restoration",
        location: "Haida Gwaii, BC, Canada",
        client: "Parks Canada / Haida Nation",
        status: "monitoring",
        progress: 95,
        lastUpdated: "1 day ago",
        coordinates: [52.8333, -131.0000],
        targetSpecies: ["sp_glass_sponge"],
        environmentType: "deep_shelf"
    },
    {
        id: "proj_004",
        name: "Maldives Resort Restoration",
        location: "Baa Atoll, Maldives",
        client: "Six Senses Laamu",
        status: "planning",
        progress: 15,
        lastUpdated: "Just now",
        coordinates: [5.3333, 73.0000],
        targetSpecies: ["sp_porites"],
        environmentType: "shallow_tropical"
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
    },
    {
        id: "sp_glass_sponge",
        commonName: "Cloud Sponge",
        scientificName: "Aphrocallistes vastus",
        growthRate: 2,
        preferredDepth: [20, 200],
        resilienceScore: 95,
        imageUrl: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&q=80&w=800",
        diseaseVulnerability: [
            { diseaseName: "Mechanical Damage", riskLevel: "high" }
        ]
    },
    {
        id: "sp_cold_water_coral",
        commonName: "Red Tree Coral",
        scientificName: "Primnoa pacifica",
        growthRate: 0.5,
        preferredDepth: [15, 800],
        resilienceScore: 80,
        imageUrl: "https://images.unsplash.com/photo-1621244290451-872f23f66318?auto=format&fit=crop&q=80&w=800",
        diseaseVulnerability: [
            { diseaseName: "Bottom Trawling", riskLevel: "critical" }
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

