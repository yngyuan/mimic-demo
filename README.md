# mimic-dashboard
This is a dashboard visualization using mimic-iii demo data.
## 1 tech

- Backend
    - PostgreSQL
    - Cube.js
    - GraphQL
- Frontend
    - React.js
    - Recharts
    - Ant Design

## 2 start dev environment 
1. start postgres server
```
pg_ctl -D /usr/local/var/postgres start
```
2. connect to database demo
```
psql -d demo -U postgres -W
```
3. set default schema to mimiciii
```
demo=# SET search_path TO mimiciii;
```
4. start cube.js running on localhost:4000
```
cd capstone-dashboard
npm run dev
```
5. start dashboard app running on localhost:3000
```
cd dashboard-app
npm run start 
```
6. stop postgres server
```
pg_ctl -D /usr/local/var/postgres stop
```
## 3 Preview
![demo](https://github.com/yngyuan/mimic-demo/blob/main/demo.gif?raw=true)