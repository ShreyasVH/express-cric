if ! lsof -i :$PORT > /dev/null; then
    echo "Starting"
    node_modules/migrate-mongo/bin/migrate-mongo.js up -f config/migrations.js > migrations.log
    pm2 start app.js -i 6 > server.log 2>&1 &
fi