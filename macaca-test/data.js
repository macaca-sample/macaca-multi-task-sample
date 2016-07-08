'use strict';

const _ = require('./common/helper');

const items = [
  'Hi, Hello! how are you?',
  '一言不合就发代码\n',
  'testtesttesttest',
  '据说Macaca蛮好用哦\n',
  '哎呦，试试看\n',
  'Which language do you like? Java Py JS...',
  'I like 中文\n',
  '想喝点儿什么?',
  '橙汁er\n',
  '欢迎加入支付宝\n'
];

exports.getRandom = () => {
  var i = _.random(items.length - 1);
  return items[i];
};
