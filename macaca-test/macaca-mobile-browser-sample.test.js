'use strict';

const xml2map = require('xml2map');
const webdriverClient = require('webdriver-client');

const data = require('./data');
const _ = require('./common/helper');

describe('macaca multi task sample', function() {

  this.timeout(10 * 60 * 1000);

  var options = {
    platformName: 'Android',
    package: 'xdf.simple_chat_android_client',
    activity: 'xdf.simple_chat_android_client.MainActivity'
  };

  if (process.env.UDID) {
    options.udid = process.env.UDID;
  }

  const wd = webdriverClient(options);

  wd.addPromiseChainMethod('chat', function() {
    var _historyNum = 0;
    var _send = (reject, num) => {
      return this
        .native()
        .waitForElementByClassName('android.widget.EditText')
        .sendKeys(`${data.getRandom()}\n`)
        .sleep(1000)
        .then(() => {
          _historyNum += num;
          reject();
        });
    };

    return _.retry(() => {
      return new Promise((resolve, reject) => {
        this
          .webview()
          .source()
          .then(html => {
            const json = xml2map.tojson(html);
            const li = json.html.body.div[0].div[1].ul.li;

            if (li) {
              const historyNum = li.length || 1;

              if (historyNum > _historyNum) {
                return _send(reject, 2);
              }
              reject();
            } else {
              _send(reject, 1);
            }
          });
      });
    }, 100, Infinity);
  });

  const driver = wd.initPromiseChain();

  before(function() {
    return driver
      .initDriver();
  });

  after(function() {
    return driver
      //.quit();
  });

  it('should chat now haha~', function() {
    return driver
      .chat();
  });
});
