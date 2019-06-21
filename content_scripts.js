window.onload = function () {
  const calcHour = function () {
    const selector = "#ghx-content-group > div.ghx-sprint-group > div.ghx-backlog-container.js-sprint-container.ui-droppable > div.ghx-meta > div.ghx-issues > div.ghx-backlog-card"
    const backlog = document.querySelectorAll(selector)
    let totalHour = 0
    Array.from(backlog).forEach(function (line) {
      const doc = line.getElementsByClassName("ghx-extra-field")
      Array.from(doc).forEach(function (container) {
        const attr = container.getAttribute("data-tooltip")
        const result = attr.match(/初期見積: ([\d\.]+)時間/)
        if (result) {
          totalHour += parseFloat(result[1])
        }
      })
    })
    return totalHour
  }

  const setCalculatedHour = function (totalHour) {
    const pageTitle = document.querySelectorAll("#subnav-title > span")[0]
    if (pageTitle) {
      pageTitle.innerHTML = `バックログ <span class="aui-badge ghx-in-progress" title="">${totalHour}</span>`
    }
  }

  const selector = "#ghx-content-group"
  const target = document.querySelectorAll(selector)[0]
  const observer = new MutationObserver(records => {
    setCalculatedHour(calcHour())
  });

  const options = {
    characterData: true,
    childList: true,
    subtree: true
  };

  observer.observe(target, options)
  setCalculatedHour(calcHour())
}