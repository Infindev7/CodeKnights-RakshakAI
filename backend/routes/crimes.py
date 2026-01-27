from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from services.crime_service import CrimeService
from schemas import CrimeCreate, CrimeUpdate, CrimeResponse
from models.crime import CrimeType

router = APIRouter(prefix="/api/crimes", tags=["Crimes"])

@router.get("/", response_model=List[CrimeResponse])
async def get_all_crimes(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, le=500),
    db: Session = Depends(get_db)
):
    """Get all crimes with pagination"""
    return CrimeService.get_all(db, skip, limit)

@router.get("/{crime_id}", response_model=CrimeResponse)
async def get_crime(crime_id: int, db: Session = Depends(get_db)):
    """Get crime by ID"""
    return CrimeService.get_by_id(db, crime_id)

@router.post("/", response_model=CrimeResponse, status_code=201)
async def create_crime(crime_data: CrimeCreate, db: Session = Depends(get_db)):
    """Create new crime record"""
    return CrimeService.create(db, crime_data)

@router.put("/{crime_id}", response_model=CrimeResponse)
async def update_crime(
    crime_id: int,
    crime_data: CrimeUpdate,
    db: Session = Depends(get_db)
):
    """Update crime record"""
    return CrimeService.update(db, crime_id, crime_data)

@router.delete("/{crime_id}")
async def delete_crime(crime_id: int, db: Session = Depends(get_db)):
    """Delete crime record"""
    CrimeService.delete(db, crime_id)
    return {"message": "Crime record deleted successfully"}

# ========== Custom Endpoints ==========

@router.get("/zone/{zone_id}", response_model=List[CrimeResponse])
async def get_crimes_by_zone(zone_id: int, db: Session = Depends(get_db)):
    """Get all crimes in a zone"""
    return CrimeService.get_by_zone(db, zone_id)

@router.get("/type/{crime_type}", response_model=List[CrimeResponse])
async def get_crimes_by_type(crime_type: CrimeType, db: Session = Depends(get_db)):
    """Get crimes by type"""
    return CrimeService.get_by_type(db, crime_type)

@router.get("/stats/by-zone")
async def get_crime_stats_by_zone(db: Session = Depends(get_db)):
    """Get crime count grouped by zone"""
    return CrimeService.get_crime_count_by_zone(db)