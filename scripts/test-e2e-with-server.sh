#!/bin/bash

# Script to run Playwright tests with external server management

echo "Starting Nuxt dev server..."
pnpm dev &
SERVER_PID=$!

# Wait for server to be ready
echo "Waiting for server to be ready..."
while ! curl -s http://localhost:3000 > /dev/null; do
  sleep 1
done

echo "Server is ready! Running Playwright tests..."

# Run tests
pnpm exec playwright test "$@"
TEST_EXIT_CODE=$?

# Kill the server
echo "Stopping server..."
kill $SERVER_PID

exit $TEST_EXIT_CODE