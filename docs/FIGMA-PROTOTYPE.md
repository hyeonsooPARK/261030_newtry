# Figma 연결 안내

현재 세션에는 Figma 읽기·쓰기 도구가 없어 원본 파일의 Prototype 설정은 변경하지 않았습니다. 아래는 제공된 원본 화면과 기획안을 기준으로 **직접 연결할 수 있는 명세**입니다. 코드 버전은 이미 같은 흐름으로 동작합니다.

## 가져오기

1. Figma 파일의 새 페이지를 `SOL AI Coach / Prototype`으로 만듭니다.
2. `figma-screens`의 PNG 13개를 페이지에 드래그합니다. 이미지는 390px 너비로 캡처했습니다.
3. 각 PNG를 **390 × 844 프레임** 안에 넣고 상단 정렬합니다. 긴 이미지는 세로 스크롤이 되도록 프레임 높이를 844로 유지하고 `Clip content` 및 Prototype의 Vertical scrolling을 설정합니다.
4. 캡처의 하단 내비게이션은 긴 이미지 맨 아래에 있습니다. 모바일 고정 내비게이션을 시연하려면 원본 내비게이션을 별도 컴포넌트로 복제해 각 프레임 하단에 고정합니다. 이미지 안쪽 중복 부분은 마스크로 가립니다.
5. 버튼 위에 투명 사각형 hotspot을 놓고 아래 표대로 연결합니다. 편집 가능한 원본 Figma 컴포넌트가 있다면 이미지 대신 원본 프레임에 직접 연결하는 편이 좋습니다.
6. 시작 프레임은 `01-home`. `On click → Navigate to`, 전환 `Dissolve 150ms`를 기본으로 사용합니다. 뒤로가기는 `Back` 액션을 씁니다. 웹 데모는 모션 감소 설정을 지원합니다.

## 화면 연결표

|출발 프레임|눌러야 하는 요소|도착 프레임 / 동작|
|---|---|---|
|01 Home|AI 금융코치 바로가기|02 Coach|
|01 Home|상세 분석|04 Spending|
|02 Coach (미연결)|나의 금융 연결하기|03 Connect|
|03 Connect|동의 체크 + 기관 선택 + 데모 연결|02 Coach (연결 완료)|
|02 Coach|소비 카드 / 카테고리|04 Spending|
|02 Coach|보유 카드 조회|05 Cards|
|02 Coach|미래 소비 탭 / 소비 예측|10 Future|
|02 Coach|AI 종합 분석 탭|13 Briefing|
|04 Spending|보유 카드별 실적 & 혜택 조회|05 Cards|
|05 Cards|Deep Dream 카드|06 Detail|
|05 Cards|Mr.Life 카드|07 Detail|
|06·07 Detail|지난달 놓친 혜택 요약|08 Report|
|06·07 Detail|카테고리별 추천|09 Optimize 또는 원본 추천 탭 variant|
|08 Report|전략 보기|09 Optimize|
|09 Optimize|혜택 확인|06 Detail (선택 카드 variant)|
|09 Optimize|추천 루틴 설정|확인 overlay → 적용 완료 variant|
|10 Future|소비 예측 결과 보기|11 Prediction|
|11 Prediction|조건 바꿔 다시 예측|10 Future|
|11 Prediction|맞춤형 소비 전략|12 Strategy|
|12 Strategy|보유 카드로 혜택 최적화|09 Optimize|
|12 Strategy|AI 종합 브리핑|13 Briefing|
|13 Briefing|소비·예측·카드·누락·전략 항목|각 상세 프레임|
|모든 화면|홈·카드·AI 코치 하단 메뉴|01 / 05 / 02|
|모든 상세|상단 뒤로가기|Back|

## 원본 프레임으로 작업할 때 권장 variants

- 금융코치: 미연결 / 연결 완료
- 카드 목록: 전체 / 신용 / 체크 / 필터 결과 없음
- 카드 상세: 혜택 요약 / 실적 현황 / 카테고리 추천
- 소비: 전체 / 선택 카테고리 / 기간 비교 펼침
- 예측 입력: 기본 / 직접 기간 / 필수 항목 오류
- 루틴: 적용 전 / 적용 완료

Figma의 기본 연결만으로는 수치 계산·다중 필터·localStorage를 재현하지 않습니다. 그 부분은 실행 가능한 웹 프로토타입으로 확인하세요. 캡처는 실제 앱 결과이며 Figma에서 직접 편집·연결한 결과를 의미하지 않습니다.
