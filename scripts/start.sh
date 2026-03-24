#!/bin/sh
echo "Starting Next.js..."
npm start &
PID=$!

# Wait for server
echo "Waiting for server..."
for i in $(seq 1 60); do
  if curl -sf http://localhost:3000/api/users > /dev/null 2>&1; then
    echo "Server ready"
    break
  fi
  sleep 2
done

wait $PID
