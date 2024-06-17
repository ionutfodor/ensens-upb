import http from 'k6/http';
import { check } from 'k6';

const jwtToken = __ENV.JWT_TOKEN;

export let options = {
  vus: 500,
  duration: '30s'
};

export default function() {
  let url = `http://localhost:3000/api/data`;

  let payload = JSON.stringify({
    measurement: "lora.tts.smartparking.sp4",
    projections: [
      "ack",
      "parking_slot_status"
    ],
    filters: [
      {
        filterField: "ack",
        filterValue: "0",
        filterOperation: "EQ",
        operatorEnum: "OR"
      },
      {
        filterField: "parking_slot_status",
        filterValue: "1",
        filterOperation: "EQ",
        operatorEnum: "AND"
      },
      {
        filterField: "time",
        filterValue: "2024-03-19T20:43:20.418Z",
        filterOperation: "LT",
        operatorEnum: "AND"
      }
    ],
    sorter: {
      sortDirection: "DESC"
    },
    pagination: {
      all: false,
      offset: 100,
      limit: 20
    }
  });

  let params = {
    headers: {
      'Authorization': `Bearer ${jwtToken}`,
      'Content-Type': 'application/json',
      'accept': '*/*'
    },
  };

  let res = http.post(url, payload, params);

  check(res, {
    'status is 200': (r) => r.status === 200,
  })
};