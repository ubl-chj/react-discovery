## React Discovery
[![CircleCI](https://circleci.com/gh/ubl-chj/react-discovery.svg?style=shield)](https://circleci.com/gh/ubl-chj/react-discovery)
[![Netlify Status](https://api.netlify.com/api/v1/badges/c5727bf2-2ed5-42f7-a8c1-274871f0c3ea/deploy-status)](https://app.netlify.com/sites/react-discovery/deploys)
### Quick Start

#### Create Environment
- configure `search api host` and `collection` in `.env` file in test app root
```yaml
REACT_APP_SEARCH_API_HOST=http://localhost/solr/
REACT_APP_SEARCH_API_COLLECTION=test01
```
##### Setup Test Solr Instance
- start docker composition 
    ```bash
    $ docker-compose up
    ```
- create core in docker:
    ```
    $ docker exec solr1 /opt/solr/bin/solr create_collection -c test01
    ```
- load sample data
    ```bash
    $ curl -X POST -H"Content-Type: application/json" http://localhost/solr/test01/update/json?commit=true --data-binary @test-data/solr-test-data.json
    ```
- OR execute 
    ```bash
    $ ./build.sh
    ```
    
### Build and Start React App
 ```bash
 $ npm install
 $ lerna bootstrap --hoist
 $ lerna run build
 $ lerna run start
```

### Continuous Deployment
https://react-discovery.netlify.com/

### Testing
```bash
 $ lerna run test
```
