module.exports = function advHtml() {

  /**
   * 广告列表
   */
  let sidebarArray = [
  ]

  /**
   * 必然显示的广告列表
   */
  let mustShowArray = [
    `<a href="https://iotdoc.sagoo.cn/?from=rulego" target="_blank">
     <img class="no-zoom" style="width:100%;" src="/img/sponsors/shaguo-banner.png">
   </a>`
  ]

  let _html = `<div style="width:230px;margin:0 auto;display:flex;flex-direction: column;"> 
                ${mustShowArray.concat(sidebarArray).join("")}
                <div style="order: 9999;">
                  <br/> 
                  <span style='color: gray;font-size: smaller;'>广告采用随机轮播方式显示</span>
                  <span style='color: #E01E5A;font-size: smaller;font-weight: bolder;float: right'>❤️<a href='/pages/ccf224/'>成为赞助商</a></span>
                  <br/>
                </div>
                <div style="order: 100000;background-color:var(--borderColor);width:100%;height:1px;margin: 30px 0px 0px 0px;position:relative;">
                  <button style='border-radius: 100%;padding: 0;text-align: center;border: none;background-color: #11a8cd;cursor: pointer;position: absolute;left: calc(50% - 15px);top: -15px;height: 30px;width: 30px;color: #fff;' onclick='document.querySelector(".sidebar-slot-top").style.display="none"'>收</button>
                </div>
              </div>
              `

  return _html;
}