# Run load tests
## 1. Start grafana & influx for k6
```shell
cd ..\src\main\docker\testing\
docker-compose up -d influxdb grafana
```
## 2. Open terminal and position to ./test folder
## 3. Obtain a valid JWT token
## 4. Run test files
### 4.1 Without outputting to influxdb, results visible in CLI
```
k6 run --env JWT_TOKEN=[jwt_token_value] test-10-data.js
```
### 4.2 With output in influxdb, results visible in grafana
```
k6 run --env JWT_TOKEN=[valoarea_token_jwt_valid] test-10-data.js --insecure-skip-tls-verify --out influxdb=http://localhost:8087/k6
```
## 5. Check results
```http request
https://localhost:3001
```