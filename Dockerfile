FROM python:3.12-slim

# Set working directory
WORKDIR /app

# Copy requirements and install
COPY ThriftStore/backend/requirements.txt .
RUN python -m pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY ThriftStore/backend/ ./backend

# Add backend to Python path so Django modules are visible
ENV PYTHONPATH=/app/backend

# Expose port
EXPOSE 8000

# Run Gunicorn using the correct WSGI module
CMD ["gunicorn", "thriftstore_api.wsgi:application", "--bind", "0.0.0.0:8000"]