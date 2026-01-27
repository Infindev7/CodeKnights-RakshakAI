from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Enum
from sqlalchemy.orm import relationship
from database import Base
from models.crime import CrimeType

class CrimeStat(Base):
    __tablename__ = "crime_stats"
    
    id = Column(Integer, primary_key=True, index=True)
    zone_id = Column(Integer, ForeignKey("zones.id"), nullable=False, index=True)
    crime_type = Column(Enum(CrimeType), nullable=False)
    crime_count = Column(Integer, nullable=False)
    start_date = Column(DateTime, nullable=False)
    end_date = Column(DateTime, nullable=False)
    
    # Relationship
    zone = relationship("Zone", backref="crime_stats")