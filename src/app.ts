import Swal from 'sweetalert2'
const app = () => {
  let timer: NodeJS.Timeout
  GM_addStyle(`
 `)

  const showPreCopyDialog = (copyText: string): void => {
    let timerInterval: NodeJS.Timeout
    Swal.fire({
      html: '<b></b>毫秒后自动拷贝!',
      timer: 700,
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

  const addMouseOver = (elementToBind: HTMLElement, appCode: string): void => {
    const hrefString = elementToBind.getAttribute('href')
    console.log(elementToBind.getAttribute('href'))
    const regExpRecordId = /(?<=record=)\d+/
    const matches = hrefString?.match(regExpRecordId)
    if (!matches || matches.length !== 1) {
      return
    }
    const appId: string = matches[0]
    elementToBind.onmouseover = () => {
      // console.log('hover in')
      timer = setTimeout(() => {
        showPreCopyDialog(`${appCode}-${appId}`)
      }, 800)
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
        text: '拷贝完成',
        showConfirmButton: false,
        timer: 400,
      })
    } catch (e) {
      Swal.fire({
        text: '拷贝失败，拷贝时当前页面必须处于focus状态下',
        showConfirmButton: false,
      })
      console.log(e)
      console.error('拷贝失败，拷贝时当前页面必须处于focus状态下')
    }
  }

  kintone.events.on('app.record.index.show', async (ke) => {
    const appCode = await getAppCode()
    if (!appCode) return
    const els = document.querySelectorAll('td.recordlist-cell-gaia a.recordlist-show-gaia')
    // console.log(els)
    if (els.length < 1) return
    for (let i = 0; i < els.length; i++) {
      const el = els[i] as HTMLElement
      console.log(el.title)
      el.title = `${el.title} \n悬停拷贝记录编号`
      addMouseOver(el, appCode)
      addMouseOut(el)
    }
    return ke
  })
}

export default app
