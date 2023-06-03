#!/bin/bash

BASE_URL="http://localhost:3000/api/v1"  # Update with your server URL
TOKEN=""  

# Function to send POST request using cURL
function sendPostRequest() {
  local URL=$1
  local DATA=$2

  curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer $TOKEN" -d "$DATA" "$URL"
}

# Add events
for ((i=1; i<=6; i++)); do
  EVENT_NAME="Event $i"
  EVENT_DATE=$(date -d "+$i days" +"%Y-%m-%d")
  EVENT_PLACE="Venue $i"
  EVENT_DESCRIPTION="Description for Event $i"

  EVENT_DATA="{\"name\": \"$EVENT_NAME\", \"date\": \"$EVENT_DATE\", \"place\": \"$EVENT_PLACE\", \"description\": \"$EVENT_DESCRIPTION\"}"
  sendPostRequest "$BASE_URL/event" "$EVENT_DATA"

  # Add tickets for each event
  for ((j=1; j<=4; j++)); do
    TICKET_NAME="Ticket $i-$j"
    TICKET_PRICE=$((10 + i + j))

    TICKET_DATA="{\"name\": \"$TICKET_NAME\", \"price\": $TICKET_PRICE}"
    sendPostRequest "$BASE_URL/$i/ticket" "$TICKET_DATA"
  done
done

echo "Dummy data has been successfully added to the database."
