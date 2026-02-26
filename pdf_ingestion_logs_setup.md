# PDF Ingestion Pipeline Execution Logs and Monitoring

## Overview
This document outlines the setup for comprehensive execution logs and monitoring for the PDF ingestion pipeline. 

## Logging Strategy

### Log Format
- Use a structured log format (e.g., JSON) to facilitate parsing and querying.
- Include the following fields in each log entry:
  - Timestamp (in UTC)
  - Log Level (INFO, WARNING, ERROR)
  - Message
  - Process ID
  - User ID (if applicable)

### Log Levels
- INFO: Informative messages that highlight the progress of the application.
- WARNING: Indications that something unexpected happened, or indicative of some problem in the near future.
- ERROR: Runtime errors that do not require immediate action but need to be logged for troubleshooting.

## Monitoring Setup

### Metrics to Monitor
- Total number of PDFs ingested.
- Processing duration of each PDF.
- Error rates during ingestion.
- Resource usage (CPU, memory, etc.) during the ingestion process.

### Monitoring Tools
- Integrate with monitoring platforms (e.g., Prometheus, Grafana) for real-time analytics.
- Set up alerts for anomalies (e.g., ingestion failures, high processing times).

## Example Logging Implementation
```python
import logging
import json
from datetime import datetime

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(message)s')

def log_event(level, message, user_id=None):
    log_entry = {
        "timestamp": datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S"),
        "level": level,
        "message": message,
        "process_id": os.getpid(),
        "user_id": user_id
    }
    logging.info(json.dumps(log_entry))

# Usage example
log_event("INFO", "Starting PDF ingestion", user_id="Rolosolo")
``` 
