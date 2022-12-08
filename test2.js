// 오늘 날짜 받아오기 위함
const todayDate = new Date();
// 오늘 요일 받아오기 위함
const todayDay = todayDate.getDay();

require('dotenv').config();

const { RTMClient } = require('@slack/rtm-api');
const fs = require('fs');

let status = 0;
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
  await rtm.sendMessage('테스트를 시작한다.', testChannel);
  console.log('테스트 루틴이 시작되었습니다.');
  status += 1;
});

rtm.on('message', async (message) => {
  const { text } = message;

  console.log('받은 메시지: ', text);

  if (message.user === testUserId) {
    switch (status) {
      case 1: // alive 테스트
        if (text === 'I`m alive') {
          console.log('[default 테스트 성공]');
        } else {
          console.log('[default 테스트 실패]');
        }
        await rtm.sendMessage('hi', testChannel);
        status += 1;
        break;

      case 2: // 인사 테스트
        if (text === 'Hello' || text === '안녕하세요' || text === 'hola') {
          console.log('[인사 테스트 성공]');
        } else {
          console.log('[인사 테스트 실패]');
        }
        await rtm.sendMessage('오늘 점심 뭐야', testChannel);
        status += 1;
        break;

      case 3: // 오늘 점심 식단 안내 테스트
        if (todayDay === 0 || todayDay === 6) { // 주말 안내
          if (text === '토요일과 일요일은 진수원 휴무입니다.') {
            console.log('[주말 예외 처리 성공]');
          } else {
            console.log('[주말 예외 처리 실패]');
          }
        } else { // 평일 안내
          console.log('[평일 점심 안내 완료]');
        }
        status += 1;
        break;

      case 4: // 오늘 점심 평가 테스트
        if (todayDay !== 0 || todayDay !== 6) {
          if (text === '오늘의 식단은 1점' || text === '오늘의 식단은 2점' || text === '오늘의 식단은 3점') {
            console.log('[오늘 점심 평가 성공]');
          } else {
            console.log('[오늘 점심 평가 실패]');
          }
        }
        await rtm.sendMessage('이번주 뭐 나와', testChannel);
        status += 1;
        break;

      case 5: // 월요일 별점
        if (text === '월요일 - 1점' || text === '월요일 - 2점' || text === '월요일 - 3점') {
          console.log('[월요일 평가 성공]');
        } else {
          console.log('[월요일 평가 실패]');
        }
        status += 1;
        break;

      case 6: // 화요일 별점
        if (text === '화요일 - 1점' || text === '화요일 - 2점' || text === '화요일 - 3점') {
          console.log('[화요일 평가 성공]');
        } else {
          console.log('[화요일 평가 실패]');
        }
        status += 1;
        break;

      case 7: // 수요일 별점
        if (text === '수요일 - 1점' || text === '수요일 - 2점' || text === '수요일 - 3점') {
          console.log('[수요일 평가 성공]');
        } else {
          console.log('[수요일 평가 실패]');
        }
        status += 1;
        break;

      case 8: // 목요일 별점
        if (text === '목요일 - 1점' || text === '목요일 - 2점' || text === '목요일 - 3점') {
          console.log('[목요일 평가 성공]');
        } else {
          console.log('[목요일 평가 실패]');
        }
        status += 1;
        break;

      case 9: // 금요일 별점
        if (text === '금요일 - 1점' || text === '금요일 - 2점' || text === '금요일 - 3점') {
          console.log('[금요일 평가 성공]');
        } else {
          console.log('[금요일 평가 실패]');
        }
        status += 1;
        console.log('[이번주 메뉴 별점 안내 완료]');
        await rtm.sendMessage('5', testChannel);
        break;

      case 10: // 제곱
        if (text === ('The result is 25')) {
          console.log('[제곱 테스트 성공]');
        } else {
          console.log('[제곱 테스트 실패]');
        }
        status += 1;
        await rtm.sendMessage('학과 사무실 안내', testChannel);
        break;

      case 11: // 학과 안내
        if (text === '학과를 입력해주세요') {
          console.log('[올바른 학과 사무실 안내 테스트 시작]');
        } else {
          console.log('[학과 사무실 안내 테스트 실패]');
        }
        status += 1;
        await rtm.sendMessage('Computer Science and Engineering', testChannel);
        break;

      case 12: // 올바른 학과명
        if (text.trim() === 'College of Engineering Building 7, 224') {
          console.log('[올바른 학과명 학과 사무실 안내 테스트 성공]');
        } else {
          console.log('[올바른 학과명 학과 사무실 안내 테스트 실패]');
        }
        status += 1;
        await rtm.sendMessage('학과 사무실 안내', testChannel);
        break;

      case 13: // 학과 안내
        if (text === '학과를 입력해주세요') {
          console.log('[틀린 학과 사무실 안내 테스트 시작]');
        } else {
          console.log('[학과 사무실 안내 테스트 실패]');
        }
        status += 1;
        await rtm.sendMessage('Computer Science and', testChannel);
        break;

      default:
        if (text.trim() === 'Computer Science and Engineering을 말씀하시는 건가요? College of Engineering Building 7, 224입니다.') {
          console.log('[틀린 학과명 학과 사무실 안내 테스트 성공]');
        } else {
          console.log('[틀린 학과명 학과 사무실 안내 테스트 실패]');
        }
        process.exit(1);
    }
  } else {
    rtm.sendMessage('테스트 중입니다. 나가십시오 휴먼', testChannel);
    console.log('테스트가 방해받았습니다. 테스트를 종료합니다.');
    process.exit(1);
  }
});
