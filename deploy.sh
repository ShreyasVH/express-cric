if ! lsof -i :$PORT > /dev/null; then
    echo "Starting"
    node_modules/migrate-mongo/bin/migrate-mongo.js up -f config/migrations.js > migrations.log
    npm run dev > server.log 2>&1 &
fi