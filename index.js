/* 格式化后台返回的金钱数额
number: 表示传入的金额
place： 保留位数默认2位
symbol: 金额的样式 美元或者人民币  默认￥
thounsand： 千分位的标识符  默认，
decimal：小数点 默认.
*/
export function formatMoney(number, places, symbol, thousand, decimal) {
    number = number || 0;
    places = !isNaN(places = Math.abs(places)) ? places : 2;
    symbol = symbol !== undefined ? symbol : "￥";
    thousand = thousand || ",";
    decimal = decimal || ".";
    var negative = number < 0 ? "-" : "",
        i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
    return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
}

// 向url中添加参数，如果参数存在替换参数的值

function updateUrl(url,key,value){
	var newUrl = url;
	if(newUrl.indexOf('?') == -1) {
		newUrl += '?' + key + '=' + value;
	} else {
		if (newUrl.indexOf("&" + key + "=") == -1) {
			if (newUrl.indexOf("?" + key + "=") == -1) {
				newUrl += "&" + key + "=" + value;
			} else {
				newUrl = newUrl.replace(eval('/(' + key + '=)([^&]*)/gi'), "?" + key + "=" + value);
			}
		} else {
			newUrl = newUrl.replace(eval('/(' + key + '=)([^&]*)/gi'), "&" + key + "=" + value);
		}
	}
	return newUrl;
}

/*获取url内的参数的值
	url: type string,
	name: type string
*/
function getUrlParmVal(url,name){
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	url = url || window.location.href; 
	url = ('?'+url.split('?')[1]) || window.location.search(); 
	var result = url.substr(1).match(reg);
	return result != null ? unescape(result[2]) : null;
}

