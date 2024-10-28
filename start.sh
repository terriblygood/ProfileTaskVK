# start.sh
#!/bin/bash
docker-compose up -d
sleep 5  
open http://localhost:3000
