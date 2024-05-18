# Restore influxDB from backup
## 1. Start database
```shell
docker-compose -f src/main/docker/influxdb.yml up -d
```
## 2. Open terminal and position to parent folder of backup folder
## 3. Copy backup folder in container
#### (replace "docker-ensens-influxdb-1" with your container name)
```
docker cp backup docker-ensens-influxdb-1:/backup
```
## 4. Restore db
#### (replace "docker-ensens-influxdb-1" with your container name)
```
docker exec -it docker-ensens-influxdb-1 influxd restore -portable -db iot /backup
```
## 5. Connect to database in cli:
```
docker exec -it <container_name_or_id> influx

influx -username 'iot_admin' -password 'iot_admin'

show databases

use iot

show measurements 

...
```
## Tutorial source:

[medium.com : backup and restore influxDB](https://medium.com/@creil/backup-and-restore-influxdb-database-into-a-docker-container-932b1468b2cf)