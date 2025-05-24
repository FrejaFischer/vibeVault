#!/bin/sh

case "${RTE}" in

dev)
    echo "====== CLIENT || Development mode starting... ======"
    npm run dev
    ;;
test)
    echo "====== CLIENT || Test mode starting... ======"
    sleep 5000
    ;;
prod)
    echo "====== CLIENT || Production mode starting... ======"

    ;;

esac
