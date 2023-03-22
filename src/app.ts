import Swal from 'sweetalert2'
const app = () => {
  let timer: NodeJS.Timeout
  GM_addStyle(`
 `)
  const MOUSE_HOLD_TIME = 2500
  const COPY_T_MINUS = 1700
  const SHOW_COPYED_LENGTH = 800
  const NO_FOCUS_ERR_MSG = '拷贝失败，拷贝时当前页面必须处于focus状态下'
  const COPY_T_MINUS_MSG = '毫秒后自动复制记录编号!'
  const HOLD_TO_COPY_MSG = '悬停拷贝记录编号'
  const COPY_OVER_MSG = {
    setLang: function (): string {
      if (navigator.language === 'en-US') return this['en-US']
      if (navigator.language === 'zh-CN') return this['zh-CN']
      return this['en-US']
    },
    'en-US': 'Copyied',
    'zh-CN': '复制完成',
  }
  console.log(navigator.language)
  const showPreCopyDialog = (copyText: string): void => {
    let timerInterval: NodeJS.Timeout
    Swal.fire({
      html: `<b></b>${COPY_T_MINUS_MSG}`,
      timer: COPY_T_MINUS,
      timerProgressBar: true,
      position: 'center',
      didOpen: () => {
        Swal.showLoading()
        const b = Swal.getHtmlContainer()?.querySelector('b')
        timerInterval = setInterval(() => {
          if (b) {
            const leftSec = Swal.getTimerLeft() as number
            b.textContent = leftSec.toString()
          }
        }, 50)
      },
      willClose: () => {
        clearInterval(timerInterval)
      },
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        doCopy(copyText)
      }
    })
  }

  const getAppCode = async (): Promise<string | null> => {
    const params = {
      id: kintone.app.getId()?.toString(),
    }
    const appInfo = await kintone.api(kintone.api.url('/k/v1/app.json', true), 'GET', params)
    if (!appInfo || typeof appInfo !== 'object' || appInfo.code === '') {
      console.log('app code is not setted')
      return null
    }
    return appInfo.code
  }
  function addMouseOver(elementToBind: HTMLElement, appCode: string): void
  function addMouseOver(elementToBind: HTMLElement): void

  function addMouseOver(elementToBind: HTMLElement, appCode?: string): void {
    if (appCode) {
      const hrefString = elementToBind.getAttribute('href')
      const regExpRecordId = /(?<=record=)\d+/
      const matches = hrefString?.match(regExpRecordId)
      if (!matches || matches.length !== 1) {
        return
      }
      const appId: string = matches[0]
      elementToBind.onmouseover = () => {
        timer = setTimeout(() => {
          showPreCopyDialog(`${appCode}-${appId}`)
        }, MOUSE_HOLD_TIME)
      }
    } else {
      console.log(elementToBind.innerText)
      elementToBind.onmouseover = () => {
        timer = setTimeout(() => {
          showPreCopyDialog(elementToBind.innerText)
        }, MOUSE_HOLD_TIME)
      }
    }
  }

  const addMouseOut = (elementToBind: HTMLElement): void => {
    elementToBind.onmouseout = () => {
      clearTimeout(timer)
    }
  }

  const doCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      Swal.fire({
        text: `${COPY_OVER_MSG.setLang()}`,
        showConfirmButton: false,
        timer: SHOW_COPYED_LENGTH,
      })
    } catch (e) {
      Swal.fire({
        text: NO_FOCUS_ERR_MSG,
        showConfirmButton: false,
      })
      console.log(e)
      console.error(NO_FOCUS_ERR_MSG)
    }
  }

  kintone.events.on('app.record.index.show', async (ke) => {
    const appCode = await getAppCode()
    if (!appCode) return
    // register view detail button
    const viewDetailButtonEle = document.querySelectorAll('td.recordlist-cell-gaia a.recordlist-show-gaia')
    if (viewDetailButtonEle.length < 1) return
    for (let i = 0; i < viewDetailButtonEle.length; i++) {
      const el = viewDetailButtonEle[i] as HTMLElement
      console.log(el.title)
      el.title = `${el.title} \n${HOLD_TO_COPY_MSG}`
      addMouseOver(el, appCode)
      addMouseOut(el)
    }

    const recordNumberCellEle = document.querySelectorAll('td.recordlist-cell-gaia.recordlist-record_id-gaia')
    for (let i = 0; i < recordNumberCellEle.length; i++) {
      const el = recordNumberCellEle[i] as HTMLElement
      addMouseOver(el)
      addMouseOut(el)
    }
    return ke
  })
}

export default app
