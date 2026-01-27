from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional
from enum import Enum

class CrimeType(str, Enum):
    THEFT = "theft"
    ASSAULT = "assault"
    ACCIDENT = "accident"

class CrimeBase(BaseModel):
    crime_type: CrimeType
    latitude: float = Field(..., ge=-90, le=90)
    longitude: float = Field(..., ge=-180, le=180)
    date_time: datetime
    area_name: str
    zone_id: int

class CrimeCreate(CrimeBase):
    """Request body for creating a crime"""
    pass

class CrimeUpdate(BaseModel):
    """Request body for updating - all fields optional"""
    crime_type: Optional[CrimeType] = None
    latitude: Optional[float] = Field(None, ge=-90, le=90)
    longitude: Optional[float] = Field(None, ge=-180, le=180)
    date_time: Optional[datetime] = None
    area_name: Optional[str] = None
    zone_id: Optional[int] = None

class CrimeResponse(CrimeBase):
    """Response body"""
    id: int
    
    class Config:
        from_attributes = True