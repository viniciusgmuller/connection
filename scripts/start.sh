#!/bin/sh
echo "Starting Next.js..."
npm start &
PID=$!

# Wait for server to be ready
echo "Waiting for server..."
SERVER_READY=false
for i in $(seq 1 90); do
  if curl -sf http://localhost:3000/api/health > /dev/null 2>&1; then
    echo "Server ready after $((i * 2)) seconds"
    SERVER_READY=true
    break
  fi
  sleep 2
done

if [ "$SERVER_READY" = false ]; then
  echo "ERROR: Server failed to start within 180 seconds"
  kill $PID 2>/dev/null
  exit 1
fi

# Push schema to database (creates missing tables/columns)
echo "Running schema push..."
RESULT=$(curl -s -w "\n%{http_code}" -X POST http://localhost:3000/api/fix-schema 2>&1)
HTTP_CODE=$(echo "$RESULT" | tail -1)
BODY=$(echo "$RESULT" | sed '$d')
echo "Schema push result (HTTP $HTTP_CODE): $BODY"

if [ "$HTTP_CODE" != "200" ]; then
  echo "WARNING: Schema push failed, retrying in 10 seconds..."
  sleep 10
  RESULT=$(curl -s -w "\n%{http_code}" -X POST http://localhost:3000/api/fix-schema 2>&1)
  HTTP_CODE=$(echo "$RESULT" | tail -1)
  BODY=$(echo "$RESULT" | sed '$d')
  echo "Schema push retry result (HTTP $HTTP_CODE): $BODY"
fi

wait $PID
