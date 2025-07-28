if lsof -i :$PORT > /dev/null; then
    echo "Stopping"
    pm2 stop app
    pm2 kill
fi