// 오늘 날짜 받아오기 위함
const todayDate = new Date();
// 오늘 요일 받아오기 위함
const todayDay = todayDate.getDay();

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
  console.log('테스트 루틴이 시작되었습니다.');
  await rtm.sendMessage('테스트를 시작합니다.', testChannel);
  // status는 0
  status += 1;
  await rtm.sendMessage('hi', testChannel);
  // status는 1
  status += 1;
  await rtm.sendMessage('오늘 점심 뭐야', testChannel);
  // status는 2
  status += 1;
  await rtm.sendMessage('이번주 뭐 나와', testChannel);
  // status는 3
  status += 1;
  await rtm.sendMessage('5', testChannel);
  // status는 4
  status += 1;
  await rtm.sendMessage('학과 안내', testChannel);
  // status는 5
  status += 1;
  await rtm.sendMessage('Computer Science Engineering', testChannel);
  // status는 6
  status += 1;
  await rtm.sendMessage('학과 안내', testChannel);
  // status는 7
  status += 1;
  await rtm.sendMessage('Computer Science Eng', testChannel);
  // status는 8
  status += 1;
});

rtm.on('message', async (message) => {
  const { text } = message;
  console.log('받은 메시지: ', text);

  if (message.user === testUserId) {
    if (status === 0) {
      if (text === 'I`m alive') { // alive 테스트
        console.log('[default 테스트 성공]');
      } else {
        console.log('[default 테스트 실패]');
      }
    } else if (status === 1) { // 인사 테스트
      if (text === 'Hello' || text === '안녕하세요' || text === 'hola') {
        console.log('[인사 테스트 성공]');
      } else {
        console.log('[인사 테스트 실패]');
      }
    } else if (status === 2) { // 점심 메뉴 안내 테스트
      // 주말 안내
      if (todayDay === 0 || todayDay === 6) {
        if (text === '토요일과 일요일은 진수원 휴무입니다.') {
          console.log('[주말 예외 처리 성공]');
        } else {
          console.log('[주말 예외 처리 실패]');
        }
      } else { // 평일 안내
        console.log('[평일 점심 안내]:', text);
      }
    } else if (status === 3) { // 이번주 뭐 나와
      console.log(text);
      console.log('[이번주 메뉴 별점 안내 완료]');
    } else if (status === 4) { // square
      if (text === (text * text)) {
        console.log('[제곱 테스트 성공]');
      } else {
        console.log('[제곱 테스트 실패]');
      }
    } else if (status === 5) { // 학과 안내
      if (text === '학과를 입력해주세요') {
        console.log('[학과 사무실 안내 테스트 시작]');
      }
    } else if (status === 6) { // 올바른 학과명
      if (text === 'College of Engineering Building 7, 224') {
        console.log('[올바른 학과명 학과 사무실 안내 테스트 성공]');
      }
    } else if (status === 7) { // 학과 안내
      if (text === '학과를 입력해주세요') {
        console.log('[학과 사무실 안내 테스트 시작]');
      }
    } else if (status === 8) { // 틀린 학과명
      if (text === 'Computer Science and Engineering을 말씀하시는 건가요? College of Engineering Building 7, 224입니다.') {
        console.log('[틀린 학과명 학과 사무실 안내 테스트 성공]');
      }
    }
  } else {
    rtm.sendMessage('테스트 중입니다. 나가십시오 휴먼', testChannel);
  }
});
