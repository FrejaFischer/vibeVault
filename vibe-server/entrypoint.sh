#!/bin/sh

# File for storing authentication cookie
COOKIE_JAR="cookies.txt"
# Remove file if it already exist (clean up from the past runs)
rm -f $COOKIE_JAR

get_script() {
    URL="${BASE_URL}$1"
    PATTERN=$2
    EXPECTED_STATUS=$3

    # Get response body and status code, include cookies from cookie jar file
    RESPONSE=$(curl -s -w "\n%{http_code}" \
        -b $COOKIE_JAR \
        "$URL")
    
    BODY=$(echo "$RESPONSE" | head -n -1)
    STATUS=$(echo "$RESPONSE" | tail -n1)

    echo "Response from server: $RESPONSE"

    if [ "$STATUS" -ne "$EXPECTED_STATUS" ]; then
        echo "❌ Test failed: Expected status $EXPECTED_STATUS but got $STATUS."
        exit 1
    fi

    if echo "$BODY" | grep -q "$PATTERN"; then
        echo "✅ Test passed: Found pattern '$PATTERN' in response."
    else
        echo "❌ Test failed: Pattern '$PATTERN' not found in response."
        exit 1
    fi
}

post_script() {
    URL="${BASE_URL}$1"
    DATA=$2
    EXPECTED_STATUS=$4

    if [ "$1" = "login" ]; then
        # Save cookies after login in cookie jar file, if request is to login
        RESPONSE=$(curl -s -w "\n%{http_code}" -X POST \
            -H "Content-Type: application/json" \
            -d "$DATA" \
            -c $COOKIE_JAR \
            "$URL")
    else
        # Send request and read cookie from cookie jar file (like get_script request)
        RESPONSE=$(curl -s -w "\n%{http_code}" -X POST \
            -H "Content-Type: application/json" \
            -d "$DATA" \
            -b $COOKIE_JAR \
            "$URL")
    fi

    BODY=$(echo "$RESPONSE" | head -n -1)
    STATUS=$(echo "$RESPONSE" | tail -n1)

    echo "Response from server: $RESPONSE"

    if [ "$STATUS" -ne "$EXPECTED_STATUS" ]; then
        echo "❌ Test failed: Expected status $EXPECTED_STATUS but got $STATUS."
        exit 1
    fi

    if echo "$BODY" | grep -q "$3"; then
        echo "✅ Test passed: Found pattern '$3' in response."
    else
        echo "❌ Test failed: Pattern '$3' not found in response."
        exit 1
    fi
}

case "${RTE}" in

dev)
    echo "====== SERVER || Development mode starting... ======"
    npm install
    npm run start
    ;;
test)
    echo "====== SERVER || Test mode starting... ======"
    apk add --no-cache curl grep

    sleep 10

    npm run test &

    sleep 10

    BASE_URL="http://nginx/api/"
    
    post_script "users" '{"first_name":"Mr.", "last_name":"Test", "email":"test@test.dk", "password":"Password123!"}' "User created successfully" 201
    post_script "login" '{"email":"test@test.dk", "password":"Password123!"}' "Login successful" 200

    get_script "artists/1/albums" "For Those About To Rock We Salute You" 200
    get_script "albums?search=lover" "Pure Cult: The Best Of The Cult (For Rockers, Ravers, Lovers & Sinners)" 200
    get_script "albums/1/tracks" "Put The Finger On You" 200
    get_script "artists?search=audios" "Audioslave" 200
    get_script "tracks?search=old-fashioned" "Good Old-Fashioned Lover Boy" 200

    post_script "users" '{"first_name":"Mr.", "last_name":"Test", "email":"test@test.dk", "password":"Password123!"}' "Email already in use" 400

    ;;
prod)
    echo "====== SERVER || Production mode starting... ======"

    ;;

esac
