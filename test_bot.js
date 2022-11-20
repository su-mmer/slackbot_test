require('dotenv').config();

const { RTMClient } = require('@slack/rtm-api');
const fs = require('fs');

let status = -1;
let token;

try {
  token = fs.readFileSync('./test_bot_token').toString('utf-8');
} catch (error) {
  console.error(error);
}
token = token.trim();

const testChannel = 'C04A2C19U31';
const testUserId = 'U047AEG245C';

const rtm = new RTMClient(token);
rtm.start();

rtm.on('ready', async () => {
  await rtm.sendMessage('테스트를 시작합니다.', testChannel);
  console.log('테스트 루틴이 시작되었습니다.');
  // status는 0
  status += 1;
  await rtm.sendMessage('hi', testChannel);
  // status는 1
  status += 1;
  await rtm.sendMessage('오늘 점심 뭐야', testChannel);
  // status는 3
  status += 1;
});

rtm.on('message', async (message) => {
  const { text } = message;
  console.log('받은 메시지: ', text);

  if (message.user === testUserId) {
    if (status === 0) {
      if (text === 'I`m alive') {
        console.log('[default 테스트 성공]');
      } else {
        console.log('[default 테스트 실패]');
      }
    } else if (status === 1) {
      if (text === 'Hello' || text === '안녕하세요' || text === 'hola') {
        console.log('[인사 테스트 성공]');
      } else {
        console.log('[인사 테스트 실패]');
      }
    } else if (status === 2) {
      // TODO 평일 진수원 점심 메뉴 안내 & 평가 테스트
      if (text === '토요일과 일요일은 진수원 휴무입니다.') {
        console.log('[메뉴 안내 & 평가 테스트 성공]');
      } else {
        console.log('[메뉴 안내, 평가 테스트 실패]');
      }
    }
  } else {
    rtm.sendMessage('테스트 중입니다', testChannel);
    console.log('테스트가 방해받았습니다');
  }
});
