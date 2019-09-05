(function() {
    let locationArray = ["新北市", "臺北市", "新竹市"];
    let north = document.querySelector("#north");
    let areaName = document.querySelector("#areaName");
    let content = document.querySelector(".content");

    function makeRequest() {
        xhr = new XMLHttpRequest();
        xhr.onload = function() {
            // 這邊處理傳回來的東西
            let response = JSON.parse(this.responseText);
            let location = response.records.location;
            location.forEach(e => {
                locationArray.forEach(item => {
                    if (e.locationName === item) {
                        let list = document.createElement("li");
                        list.setAttribute("class", "menuItem");
                        let link = document.createElement("a");
                        link.setAttribute("href", "javascript:;");
                        // 建立標籤，並給予className
                        list.appendChild(link);
                        // 將link放入list之中
                        // console.log(e.locationName);
                        link.textContent = item;
                        north.appendChild(list);
                    }
                });
            });
            // 將資料撈租來比對，將符合locationArray裡面字串的顯示出來
            let button = document.querySelectorAll(".sub-menu > li");
            button.forEach(btn => {
                btn.addEventListener("click", function() {
                    areaName.textContent = btn.innerText;
                    location.forEach(e => {
                        if (btn.innerText === e.locationName) {
                            let startTime = e.weatherElement[0].time[0].startTime;
                            let endtTime = e.weatherElement[0].time[0].endTime;
                            content.classList.add("active");
                            // 新增class
                            content.innerHTML = `
                            <p>日期 {</p>
                             <p class="dateTime">${startTime} ~ ${endtTime};</p>
                            <p>
                                }
                              </p>
                              </br>
                            <p>天氣狀況 {</p>
                            <p>${e.weatherElement[0].time[0].parameter.parameterName};</p>
                            <p>}</p>
                            `;
                        }
                    });
                });
            });
            // 當選擇右方地區時,與資料做比對,顯示對應的地區的氣象資訊
            // console.log(location);
        };
        xhr.open(
            "GET",
            "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-556DA08A-8988-4AE2-B2D0-24940D3CB06E",
            true
        );
        // 串接氣象資料開放平台
        xhr.send();
    }
    makeRequest();
})();