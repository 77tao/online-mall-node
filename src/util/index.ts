export function createRandom(min, max) {
  //可以生成随机密码的相关数组
  let num: Array<String> = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  let english: Array<String> = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  let ENGLISH: Array<String> = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
  let special: Array<String> = ["-", "_", "#"];
  let config = num.concat(english).concat(ENGLISH).concat(special);

  //先放入一个必须存在的
  let arr: Array<String> = [];
  arr.push(getOne(num));
  arr.push(getOne(english));
  arr.push(getOne(ENGLISH));
  arr.push(getOne(special));

  //获取需要生成的长度
  let len = min + Math.floor(Math.random() * (max - min + 1));

  for (let i = 4; i < len; i++) {
    //从数组里面抽出一个
    arr.push(config[Math.floor(Math.random() * config.length)]);
  }

  //乱序
  let newArr = [];
  for (let j = 0; j < len; j++) {
    newArr.push(arr.splice(Math.random() * arr.length, 1)[0]);
  }

  //随机从数组中抽出一个数值
  function getOne(arr: Array<String>) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  return newArr.join("");
}

export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null;
  }
  const format = cFormat || "{y}-{m}-{d} {h}:{i}:{s}";
  let date;
  if (typeof time === "object") {
    date = time;
  } else {
    if (typeof time === "string") {
      if (/^[0-9]+$/.test(time)) {
        time = parseInt(time);
      } else {
        time = time.replace(new RegExp(/-/gm), "/");
      }
    }

    if (typeof time === "number" && time.toString().length === 10) {
      time = time * 1000;
    }
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  };
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key];
    if (key === "a") {
      return ["日", "一", "二", "三", "四", "五", "六"][value];
    }
    return value.toString().padStart(2, "0");
  });
  return time_str;
}