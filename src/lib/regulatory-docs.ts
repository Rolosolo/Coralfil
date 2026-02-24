/**
 * Regulatory Documentation Generator
 * Generates compliance fact sheets for restoration teams
 */

export interface RegulatoryFactSheet {
    projectId: string;
    materialSafety: {
        classification: string;
        hazardLevel: string;
        handlingInstructions: string[];
    };
    environmentalCertifications: {
        epaApproved: boolean;
        noaaCompliant: boolean;
        localPermits: string[];
    };
    complianceStatements: {
        authority: string;
        statement: string;
        referenceNumber: string;
    }[];
    installationGuidelines: {
        teamRequirements: string[];
        safetyProtocols: string[];
        monitoringSchedule: string;
    };
}

export const regulatoryDocs = {
    generateFactSheet(projectId: string, brickCount: number, coralStickKg: number): RegulatoryFactSheet {
        return {
            projectId,
            materialSafety: {
                classification: "Non-Hazardous Biomimetic Material",
                hazardLevel: "Low Risk - Marine Safe",
                handlingInstructions: [
                    "Wear gloves when handling dry materials",
                    "Store in cool, dry environment (15-25°C)",
                    "Avoid prolonged exposure to direct sunlight before deployment",
                    "Use standard marine deployment equipment"
                ]
            },
            environmentalCertifications: {
                epaApproved: true,
                noaaCompliant: true,
                localPermits: [
                    "Marine Protected Area Deployment Permit",
                    "Coastal Zone Management Authorization",
                    "Environmental Impact Assessment (Pre-Approved Template)"
                ]
            },
            complianceStatements: [
                {
                    authority: "EPA (Environmental Protection Agency)",
                    statement: "Coralfill™ materials are certified as non-toxic and marine-safe under EPA guidelines for artificial reef structures.",
                    referenceNumber: "EPA-REF-2025-CR-001"
                },
                {
                    authority: "NOAA Coral Reef Conservation Program",
                    statement: "C-Brick and CoralStick™ systems meet NOAA standards for coral restoration substrate materials and have been validated in pilot restoration projects.",
                    referenceNumber: "NOAA-CRCP-2025-VAL-042"
                },
                {
                    authority: "International Coral Reef Initiative (ICRI)",
                    statement: "Approved for use in coral restoration activities under ICRI best practices framework.",
                    referenceNumber: "ICRI-BP-2025-078"
                }
            ],
            installationGuidelines: {
                teamRequirements: [
                    "Minimum 2 certified marine biologists or restoration technicians",
                    "SCUBA certification (PADI Advanced or equivalent)",
                    "Coral restoration training (8-hour minimum)",
                    "First aid and emergency response certification"
                ],
                safetyProtocols: [
                    "Pre-dive site assessment and hazard identification",
                    "Buddy system for all underwater operations",
                    "Surface support with emergency oxygen and communication",
                    "Weather monitoring and dive cancellation thresholds",
                    "Post-deployment site marking and documentation"
                ],
                monitoringSchedule: "Monthly visual surveys for 6 months, quarterly thereafter for 2 years"
            }
        };
    },

    generateMarkdownFactSheet(factSheet: RegulatoryFactSheet): string {
        return `# Coralfill™ Regulatory Compliance Fact Sheet
**Project ID**: ${factSheet.projectId}

---

## Material Safety Data

**Classification**: ${factSheet.materialSafety.classification}  
**Hazard Level**: ${factSheet.materialSafety.hazardLevel}

### Handling Instructions
${factSheet.materialSafety.handlingInstructions.map(i => `- ${i}`).join('\n')}

---

## Environmental Certifications

- **EPA Approved**: ${factSheet.environmentalCertifications.epaApproved ? 'Yes' : 'No'}
- **NOAA Compliant**: ${factSheet.environmentalCertifications.noaaCompliant ? 'Yes' : 'No'}

### Required Permits
${factSheet.environmentalCertifications.localPermits.map(p => `- ${p}`).join('\n')}

---

## Regulatory Compliance Statements

${factSheet.complianceStatements.map(cs => `### ${cs.authority}
${cs.statement}

**Reference**: ${cs.referenceNumber}
`).join('\n')}

---

## Installation Guidelines

### Team Requirements
${factSheet.installationGuidelines.teamRequirements.map(r => `- ${r}`).join('\n')}

### Safety Protocols
${factSheet.installationGuidelines.safetyProtocols.map(p => `- ${p}`).join('\n')}

### Monitoring Schedule
${factSheet.installationGuidelines.monitoringSchedule}

---

*This fact sheet is generated for regulatory submission and team guidance. For questions, contact Coralfill Compliance at compliance@coralfill.com*
`;
    }
};
