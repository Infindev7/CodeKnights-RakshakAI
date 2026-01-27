from sqlalchemy.orm import Session
from sqlalchemy import func
from fastapi import HTTPException
from models.crime import Crime, CrimeType
from schemas.crime import CrimeCreate, CrimeUpdate
from datetime import datetime, timedelta
from typing import List, Optional

class CrimeService:
    """
    Service class for Crime business logic
    Similar to @Service in Spring Boot
    """
    
    # ========== CRUD Operations ==========
    
    @staticmethod
    def get_by_id(db: Session, crime_id: int) -> Crime:
        """Get crime by ID"""
        crime = db.query(Crime).filter(Crime.id == crime_id).first()
        if not crime:
            raise HTTPException(status_code=404, detail="Crime record not found")
        return crime
    
    @staticmethod
    def get_all(
        db: Session, 
        skip: int = 0, 
        limit: int = 100
    ) -> List[Crime]:
        """Get all crimes with pagination"""
        return db.query(Crime).offset(skip).limit(limit).all()
    
    @staticmethod
    def create(db: Session, crime_data: CrimeCreate) -> Crime:
        """Create new crime record"""
        crime = Crime(
            crime_type=crime_data.crime_type,
            latitude=crime_data.latitude,
            longitude=crime_data.longitude,
            date_time=crime_data.date_time,
            area_name=crime_data.area_name,
            zone_id=crime_data.zone_id
        )
        db.add(crime)
        db.commit()
        db.refresh(crime)
        return crime
    
    @staticmethod
    def update(db: Session, crime_id: int, crime_data: CrimeUpdate) -> Crime:
        """Update existing crime record"""
        crime = CrimeService.get_by_id(db, crime_id)
        
        # Update only provided fields
        update_data = crime_data.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(crime, field, value)
        
        db.commit()
        db.refresh(crime)
        return crime
    
    @staticmethod
    def delete(db: Session, crime_id: int) -> Crime:
        """Delete crime record"""
        crime = CrimeService.get_by_id(db, crime_id)
        db.delete(crime)
        db.commit()
        return crime
    
    # ========== Business Logic ==========
    
    @staticmethod
    def get_by_zone(
        db: Session, 
        zone_id: int, 
        skip: int = 0, 
        limit: int = 100
    ) -> List[Crime]:
        """Get all crimes in a specific zone"""
        return db.query(Crime)\
            .filter(Crime.zone_id == zone_id)\
            .offset(skip).limit(limit).all()
    
    @staticmethod
    def get_by_type(
        db: Session, 
        crime_type: CrimeType
    ) -> List[Crime]:
        """Get crimes filtered by type"""
        return db.query(Crime)\
            .filter(Crime.crime_type == crime_type).all()
    
    @staticmethod
    def get_recent(
        db: Session, 
        days: int = 30
    ) -> List[Crime]:
        """Get crimes from last N days"""
        since_date = datetime.now() - timedelta(days=days)
        return db.query(Crime)\
            .filter(Crime.date_time >= since_date)\
            .order_by(Crime.date_time.desc()).all()
    
    @staticmethod
    def get_crime_count_by_zone(db: Session) -> List[dict]:
        """Get crime count grouped by zone"""
        results = db.query(
            Crime.zone_id,
            func.count(Crime.id).label("count")
        ).group_by(Crime.zone_id).all()
        
        return [{"zone_id": r.zone_id, "count": r.count} for r in results]
    
    @staticmethod
    def get_crimes_in_radius(
        db: Session,
        lat: float,
        lng: float,
        radius_km: float = 1.0
    ) -> List[Crime]:
        """Get crimes within a radius (simplified calculation)"""
        # Approximate degree to km conversion
        lat_range = radius_km / 111.0
        lng_range = radius_km / 85.0  # Approximate for Mumbai's latitude
        
        return db.query(Crime).filter(
            Crime.latitude.between(lat - lat_range, lat + lat_range),
            Crime.longitude.between(lng - lng_range, lng + lng_range)
        ).all()