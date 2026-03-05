from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base

# Import all models to register them with SQLAlchemy
from models import Zone, Crime, CrimeStat, Prediction, PatrolSuggestion

# Import routers
from routes.zones import router as zones_router
from routes.crimes import router as crimes_router
from routes.predictions import router as predictions_router
from routes.patrol_suggestions import router as patrol_suggestions_router
from routes.crime_stats import router as crime_stats_router

# Create all tables in the database
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Rakshak AI",
    description="Crime Analytics & Patrol Management System for Mumbai",
    version="1.0.0"
)

# Define the origins that are allowed to make requests
origins = [
    'https://rakshak-ai-bay.vercel.app'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers (like @ComponentScan in Spring Boot)
app.include_router(zones_router)
app.include_router(crimes_router)
app.include_router(predictions_router)
app.include_router(patrol_suggestions_router)
app.include_router(crime_stats_router)

@app.get("/")
async def root():
    return {"status": "ok", "message": "Rakshak AI Backend"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "database": "connected"}

# Run with: python main.py
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)