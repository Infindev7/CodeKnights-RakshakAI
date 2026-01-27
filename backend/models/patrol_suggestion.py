from sqlalchemy import Column, Integer, String, ForeignKey, Enum, Text
from sqlalchemy.orm import relationship
from database import Base
from models.prediction import RiskLevel

class PatrolSuggestion(Base):
    __tablename__ = "patrol_suggestions"
    
    id = Column(Integer, primary_key=True, index=True)
    zone_id = Column(Integer, ForeignKey("zones.id"), nullable=False, index=True)
    risk_level = Column(Enum(RiskLevel), nullable=False)
    suggestion_text = Column(Text, nullable=False)
    prediction_id = Column(Integer, ForeignKey("predictions.id"), nullable=False)
    
    # Relationships
    zone = relationship("Zone", backref="patrol_suggestions")
    prediction = relationship("Prediction", backref="patrol_suggestions")