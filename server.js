const express = require('express');
const path = require('path');

const app = express();

// middleware 설정
// __dirname 을 포함하는 것이 정석
// '/static' 으로 시작되는 경로로 접속 시 front/static이 기본 고정 경로가 됨.
app.use('/static', express.static(path.resolve(__dirname, 'front', 'static')));

// Single Page 이기 때문에 모든 경로에서 index.html을 불러온다.
app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, "front", "index.html"));
});

app.listen(process.env.PORT || 5000, () => {
  console.log('Server running...');
});
