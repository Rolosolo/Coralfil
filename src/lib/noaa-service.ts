/**
 * NOAA Coral Reef Watch (CRW) Service
 * Provides satellite-derived environmental intelligence for coral restoration sites.
 */

export interface NOAAData {
    sst: number;           // Sea Surface Temperature (°C)
    sst_anomaly: number;   // Deviation from average (°C)
    dhw: number;           // Degree Heating Weeks (Accumulated heat stress)
    bleaching_risk: string; // Alert level (No Stress, Watch, Warning, Alert Level 1/2)
    lastUpdated: string;
}

export const noaaService = {
    /**
     * Fetches NOAA CRW data for a specific set of coordinates.
     * Note: This uses the NOAA ERDDAP 5km dataset structure.
     */
    async getCoralMetrics(lat: number, lon: number): Promise<NOAAData | null> {
        try {
            // In a production environment, we would query the NOAA ERDDAP REST API:
            // https://pae-paha.pacioos.hawaii.edu/erddap/griddap/coral_reef_watch_5km.json

            // For the prototype 'ReefMaker' experience, we simulate the live feed 
            // based on realistic ranges for the restoration zones.

            // Simulate network latency
            await new Promise(resolve => setTimeout(resolve, 800));

            // Realistic mock data derived from current averages for the region
            const isPacificCold = lat > 40;
            const sst = isPacificCold ? 8.2 + (Math.random() * 1.5) : 28.4 + (Math.random() * 0.8);
            const dhw = isPacificCold ? 0.0 : 4.2 + (Math.random() * 0.3);
            const bleaching_risk = isPacificCold ? "Cold Water Optimal" : "Alert Level 1";

            const metrics: NOAAData = {
                sst,
                sst_anomaly: isPacificCold ? 0.15 + (Math.random() * 0.05) : 0.82 + (Math.random() * 0.1),
                dhw,
                bleaching_risk,
                lastUpdated: new Date().toISOString()
            };

            return metrics;
        } catch (e) {
            console.error("NOAA Data Retrieval Error:", e);
            return null;
        }
    }
};
