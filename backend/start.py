#!/usr/bin/env python3
"""
StartUp script for the Flood Detection backend API
"""

from fastapi import Path
import uvicorn
import os
import sys
from pathlib import Path

# adds a parent directory
sys.path.append(str(Path(__file__).parent))


if __name__=="__main__":
    port=int(os.getenv("PORT",8001))
    host=os.getenv("HOST","0.0.0.0")

    print(f"Starting Flood Detection Backend API on {host}:{port}")
    print("API Documentation will be available at:")
    print(f" - Swagger UI: http://{host}:{port}/docs")
    print(f" - ReDoc: http://{host}:{port}/redoc")
    print(f" - OpenAPI JSON: http://{host}:{port}/openapi.json")


    uvicorn.run(
        "main:app",
        host=host,
        port=port,
        reload=True,
        log_level="info"
    )