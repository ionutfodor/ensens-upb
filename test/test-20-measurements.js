import http from 'k6/http';
import { check } from 'k6';

const jwtToken = __ENV.JWT_TOKEN;

export let options = {
  vus: 20,
  duration: '30s'
};

export default function() {
  let url = `http://localhost:3000/api/measurements`;

  let params = {
    headers: {
      'Authorization': `Bearer ${jwtToken}`,
      'Content-Type': 'application/json',
    },
  };

  let res = http.get(url, params);

  check(res, {
    'status is 200': (r) => r.status === 200,
  })
};