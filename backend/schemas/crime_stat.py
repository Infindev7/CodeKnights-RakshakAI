from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from schemas.crime import CrimeType

class CrimeStatBase(BaseModel):
    zone_id: int
    crime_type: CrimeType
    crime_count: int
    start_date: datetime
    end_date: datetime

class CrimeStatCreate(CrimeStatBase):
    pass

class CrimeStatResponse(CrimeStatBase):
    id: int
    
    class Config:
        from_attributes = True