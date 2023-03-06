const app = () => {
  GM_addStyle(`
    #myMenu {
      position: absolute;
      background-color: #fff;
      border: 1px solid #ccc;
      padding: 5px;
    }
    
    #myMenu li {
      list-style-type: none;
      padding: 5px;
    }
    
    #myMenu li:hover {
      background-color: #ccc;
    }`)

  function addContextMenu(link: Element) {
    const ul1 = document.createElement('ul')
    ul1.innerHTML = `<ul id="myMenu" style="display:none;">
    <li><a href="#">copy</a></li>
  </ul>`
    document.body.appendChild(ul1)
    const menu = document.getElementById('myMenu')
    if (!link) return
    if (!menu) return

    link.addEventListener('contextmenu', (e) => {
      // 阻止默认的上下文菜单
      e.preventDefault()
      // 计算菜单的位置并显示出来
      const ee = e as MouseEvent
      menu.style.left = ee.pageX + 'px'
      menu.style.top = ee.pageY + 'px'
      menu.style.display = 'block'
    })

    // 当菜单中的选项被点击时，执行相应的操作
    menu.addEventListener('click', (e: MouseEvent) => {
      // 阻止链接的默认行为
      e.preventDefault()
      // 执行相应的操作
      console.log('执行操作：' + (e.target as HTMLElement).innerText)

      // 隐藏菜单
      menu.style.display = 'none'
    })
  }

  kintone.events.on('app.record.index.show', (ke) => {
    // const r1 = ke.recor+ds[0]
    // console.log(r1)
    // console.log(ke)

    for (const kk of ke.records) {
      for (const pn in kk) {
        if (kk[pn].type === 'RECORD_NUMBER') {
          console.log(kk[pn].value)
        }
      }
    }
    const els = document.querySelectorAll('td.recordlist-cell-gaia a.recordlist-show-gaia')
    // console.log(els)
    for (let i = 0; i < els.length; i++) {
      const el = els[i]
      addContextMenu(el)
      console.log(els[i])
    }
    // const button = document.createElement('button')
    // button.innerText = 'CP'
    // button.classList.add('btn-gradient')
    // button.classList.add('purple')
    // button.classList.add('mini')
    // el?.appendChild(button)
    // el.style.width = '1000px'
  })
}

export default app
