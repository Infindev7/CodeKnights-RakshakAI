from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional
from enum import Enum

class RiskLevel(str, Enum):
    LOW = "Low"
    MEDIUM = "Medium"
    HIGH = "High"

class PredictionBase(BaseModel):
    zone_id: int
    predicted_month: str  # Format: YYYY-MM
    risk_level: RiskLevel
    risk_score: float = Field(..., ge=0.0, le=1.0)
    expected_crimes: int

class PredictionCreate(PredictionBase):
    pass

class PredictionResponse(PredictionBase):
    id: int
    generated_at: datetime
    
    class Config:
        from_attributes = True