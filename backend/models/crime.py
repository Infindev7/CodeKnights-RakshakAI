from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Enum
from sqlalchemy.orm import relationship
from database import Base
from datetime import datetime
import enum

class CrimeType(str, enum.Enum):
    THEFT = "theft"
    ASSAULT = "assault"
    ACCIDENT = "accident"

class Crime(Base):
    __tablename__ = "crimes"
    
    id = Column(Integer, primary_key=True, index=True)
    crime_type = Column(Enum(CrimeType), nullable=False, index=True)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    date_time = Column(DateTime, nullable=False, index=True)
    area_name = Column(String, nullable=False)
    zone_id = Column(Integer, ForeignKey("zones.id"), nullable=False, index=True)
    
    # Relationship
    zone = relationship("Zone", backref="crimes")