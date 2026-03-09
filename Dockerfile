# Use official Python image
FROM python:3.12-slim

# Set working directory
WORKDIR /app

# Copy and install dependencies from backend folder
COPY ThriftStore/backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY ThriftStore/backend/ ./backend

# Expose the port your app runs on
EXPOSE 8000

# Command to run the app (update path to manage.py)
CMD ["gunicorn", "backend.manage:application", "--bind", "0.0.0.0:8000"]