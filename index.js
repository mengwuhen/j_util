import _ from 'lodash'
/* 格式化后台返回的金钱数额
/number: 表示传入的金额
/place： 保留位数默认2位
/symbol: 金额的样式 美元或者人民币  默认￥
/thounsand： 千分位的标识符  默认，
/decimal：小数点 默认.
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

export function updateUrl(url,key,value){
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
export function getUrlParmVal(url,name){
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	url = url || window.location.href; 
	url = ('?'+url.split('?')[1]) || window.location.search(); 
	var result = url.substr(1).match(reg);
	return result != null ? unescape(result[2]) : null;
}

/**
 * 将一个对象按照某一个key 的属性值进行排序
 * area：{'上海': 0.0208, '云南': 0.0156, '其他': 0.2292, '内蒙古': 0.0156, '北京': 0.0417, '台湾': 0.0052,'吉林': 0.0156, '四川': 0.0365,'天津':0.0156,'安徽':0.0156,'山东':0.0729,'山西':0.026,'广东':0.0885,'广西':0.0156,'新疆':0.0052,'江苏':0.0417,'江西':0.026,'河北':0.0365,'河南':0.0469,'浙江':0.0313,'海南':0.0052,'海外':0.0365,'湖北':0.026,'湖南':0.0469,'甘肃':0.0156,'贵州':0.0052,'辽宁':0.0208,'重庆':0.0104,'陕西':0.0208,'黑龙江':0.0104}
 */
export function orderObject(obj){
	let b =_.map(obj, (val, key) => {
		return { name: key, value: val }
	}) // 返回的格式{'name':上海,'value':0.0208}
	let c =_.orderBy(b, ['value'], ['desc'])//将value属性值按照降序排序
	let d =_.reject(c, ['name', '其他']) //将排序后的数组 删除name 等于 其他的 那个对象 ,与filter 方法相反
	let e =_.slice(d, 0, 5) //获取排名前五的省份
	return e
}
/**
 * 根据name 获取cookie
 * @param {string} name 
 */
export function getCookie(name) {
    var arr = document.cookie.replace(/\s/g, "").split(';');
    for (var i = 0; i < arr.length; i++) {
        var tempArr = arr[i].split('=');
        if (tempArr[0] == name) {
            return decodeURIComponent(tempArr[1]);
        }
    }
    return '';
}

/**
 * 设置cookie
 * @param {string} name 
 * @param {string} value 
 * @param {number} days
 */
export function setCookie(name, value, days) {
    var date = new Date();
    date.setDate(date.getDate() + days);
    document.cookie = name + '=' + value + ';expires=' + date;
}

/**
 * 格式化数字
 */
export function formatNumber(str) {
	 str =	isNaN(+str) ? undefined : str
		// 对于小数位数超过三位的会默认保留三位小数	  
	 return (typeof str == 'object' || typeof str == 'boolean' || typeof str == 'undefined' ) ? '--' : (+str).toLocaleString('en-US') 
	}




