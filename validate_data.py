# ml/tests/validate_data.py
import pandas as pd
import sys

def validate():
    df = pd.read_csv('data/coral_species_database.csv')
    
    # Check 1: All Species IDs are unique
    if df['Species_ID'].duplicated().any():
        print("FAIL: Duplicate Species IDs found")
        sys.exit(1)
    
    # Check 2: Temperature Ranges are logical (Min < Max)
    if (df['Temp_Min_C'] >= df['Temp_Max_C']).any():
        print("FAIL: Invalid Temperature Ranges")
        sys.exit(1)
        
    # Check 3: Required Columns exist
    required = ['Species_ID', 'Skeleton_Composition', 'Symbiont_Type']
    if not all(col in df.columns for col in required):
        print("FAIL: Missing Required Columns")
        sys.exit(1)
        
    print("PASS: Data validation successful")

if __name__ == "__main__":
    validate()