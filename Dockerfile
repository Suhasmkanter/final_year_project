# Use an official Python image
FROM python:3.11-slim

# Set working directory inside the container
WORKDIR /app

# Copy your server code and model into container
# Copy only server.py and model.h5
COPY cnn_model/Server.py /app/server.py


# Install dependencies
# Adjust according to what server.py needs
RUN pip install --no-cache-dir flask flask-cors tensorflow

# Expose port (adjust if your server.py uses a different port)
EXPOSE 5000

# Command to run your server
CMD ["python", "server.py"]
