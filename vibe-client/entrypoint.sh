#!/bin/sh

case "${RTE}" in

    dev)
        echo "====== Development mode ======"
        npm run dev
        ;;
    test)
        echo "====== Test mode ======"

        ;;
    prod)
        echo "====== Production mode ======"
        
        ;;

esac
