from playwright.sync_api import sync_playwright
from pathlib import Path
import json
root=Path(__file__).resolve().parents[1]
with sync_playwright() as p:
 browser=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 page=browser.new_page(viewport={'width':390,'height':844},device_scale_factor=1)
 errors=[]
 page.on('pageerror',lambda e:errors.append(str(e)))
 page.goto('http://127.0.0.1:5173')
 page.get_by_role('button',name='AI 금융코치 바로가기').click()
 page.get_by_role('button',name='나의 금융 연결하기').click()
 page.locator('#consent').check()
 page.get_by_role('button',name='동의하고 데모 연결하기').click()
 page.wait_for_url('**/#coach')
 assert page.get_by_text('이번 달 총 지출').is_visible()
 page.goto('http://127.0.0.1:5173/#cards')
 page.get_by_role('tab',name='체크 1').click()
 assert page.locator('.wallet-card').count()==1
 page.get_by_role('tab',name='전체 4').click()
 page.locator('#specialty').select_option(label='외식')
 assert page.locator('.wallet-card').count()==1
 page.locator('#specialty').select_option(label='전체')
 page.locator('#fit').select_option(label='하')
 assert page.get_by_text('조건에 맞는 카드가 없어요.',exact=False).is_visible()
 page.locator('#fit').select_option(label='전체')
 page.locator('.wallet-card').first.click()
 page.get_by_role('tab',name='실적 현황').click()
 assert page.get_by_text('전월 실적 인정액',exact=True).is_visible()
 page.locator('#card-picker').select_option('life')
 assert page.get_by_text('실적 미달성',exact=True).is_visible()
 page.goto('http://127.0.0.1:5173/#future')
 assert not page.locator('#custom-months-label').is_visible()
 page.locator('#months').select_option('0')
 assert page.locator('#custom-months-label').is_visible()
 page.locator('[name=customMonths]').fill('12')
 page.locator('[name=extra]').fill('500000')
 page.locator('[name=event]').fill('제주도 여행')
 page.get_by_role('button',name='소비 예측 결과 보기').click()
 page.wait_for_url('**/#prediction')
 assert page.get_by_text('12개월 예상 총 지출',exact=True).is_visible()
 assert page.get_by_text('제주도 여행 포함',exact=True).is_visible()
 page.get_by_role('button',name='조건 바꿔 다시 예측').click()
 assert page.locator('#months').input_value()=='0'
 assert page.locator('[name=customMonths]').input_value()=='12'
 page.locator('#months').select_option('1')
 page.get_by_role('button',name='소비 예측 결과 보기').click()
 page.goto('http://127.0.0.1:5173/#optimize')
 page.get_by_role('button',name='추천 카드 결제 루틴 한 번에 설정하기').click()
 page.reload()
 assert page.get_by_role('button',name='추천 결제 루틴 적용됨').is_visible()
 page.get_by_role('button',name='혜택 확인').click()
 page.wait_for_url('**/#detail?id=id')
 page.goto('http://127.0.0.1:5173/#spending')
 page.get_by_role('button',name='기간 비교',exact=True).click()
 assert page.get_by_text('전월보다',exact=False).is_visible()
 page.get_by_role('button',name='식비',exact=True).click()
 assert page.locator('.legend span').count()==1
 page.get_by_role('button',name='전체 지출').click()
 page.goto('http://127.0.0.1:5173/#report')
 page.locator('[data-action=report-filter]').first.click()
 assert page.locator('main>.card').count()==3
 page.get_by_role('button',name='전체보기',exact=True).click()
 # Modal keyboard close
 page.get_by_role('button',name='알림',exact=True).click()
 assert page.locator('dialog').is_visible()
 page.keyboard.press('Escape')
 assert not page.locator('dialog').is_visible()
 # Screenshots for Figma import, stable sample settings
 out=root/'docs'/'figma-screens';out.mkdir(exist_ok=True)
 page.evaluate("localStorage.setItem('sol-plan','false')")
 for i,r in enumerate(['home','coach','connect','spending','cards','detail?id=dream','detail?id=life','report','optimize','future','prediction','strategy','briefing']):
  page.goto('http://127.0.0.1:5173/#'+r)
  if r.startswith('detail'):page.get_by_role('tab',name='혜택 요약').click()
  page.screenshot(path=str(out/(f'{i+1:02}-{r.split("?")[0]}.png')),full_page=True,style=".screen{animation:none!important;opacity:1} main:focus{outline:none} .bottom-nav{position:absolute;bottom:0}")
 # All screens responsive at phone, landscape, desktop
 for w,h in [(320,740),(375,812),(844,390),(1280,900)]:
  page.set_viewport_size({'width':w,'height':h})
  page.emulate_media(reduced_motion='reduce')
  for r in ['home','coach','spending','cards','detail','report','future','prediction','strategy','briefing','all']:
   page.goto('http://127.0.0.1:5173/#'+r)
   assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'),f'overflow {r} {w}'
 assert not errors,errors
 print(json.dumps({'result':'PASS','flows':['consent','card filters','card switch','12-month forecast','forecast persistence','routine persistence','period comparison','category filter','report filter','keyboard modal'],'responsive_viewports':4,'screenshots':13,'js_errors':errors},ensure_ascii=False))
 browser.close()
