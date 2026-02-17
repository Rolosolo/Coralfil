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

            // Realistic mock data derived from current GBR / Tropical averages
            const metrics: NOAAData = {
                sst: 28.4 + (Math.random() * 0.5),
                sst_anomaly: 0.82 + (Math.random() * 0.1),
                dhw: 4.2 + (Math.random() * 0.3),
                bleaching_risk: "Alert Level 1",
                lastUpdated: new Date().toISOString()
            };

            return metrics;
        } catch (e) {
            console.error("NOAA Data Retrieval Error:", e);
            return null;
        }
    }
};
