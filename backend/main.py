from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base

# Import all models to register them with SQLAlchemy
from models import Zone, Crime, CrimeStat, Prediction, PatrolSuggestion

# Import routers
from routes.zones import router as zones_router
from routes.crimes import router as crimes_router

# Create all tables in the database
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Rakshak AI",
    description="Crime Analytics & Patrol Management System for Mumbai",
    version="1.0.0"
)

# Define the origins that are allowed to make requests
origins = [
    "http://localhost:3000",  # React frontend
    "http://localhost:8000",
    "http://127.0.0.1:8000",
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

@app.get("/")
async def root():
    return {"status": "ok", "message": "Rakshak AI Backend"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "database": "connected"}