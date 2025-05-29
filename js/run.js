((document, window, framework, log) => {
  function xssLog(view, msg, className) {
    const msgBox = document.createElement('div');
    msgBox.className = className;
    msgBox.innerHTML = msg;
    view.appendChild(msgBox);
  }

  function terminal(view) {
    xssLog(view, 'opening terminal ~20sec');
    framework.sendEventToMmui('syssettings', 'SelectDiagnostics');
    setTimeout(() => {
      framework.sendEventToMmui('diag', 'ActivateJCITest');
      xssLog(view, 'ActivateJCITest');
      setTimeout(() => {
        framework.sendEventToMmui('diag', 'ReadDTC', { payload: { testId: 11 } });
        xssLog(view, 'activate test 11 ReadDTC');
      }, 7000);
    }, 7000);
  }

  function UIxssLog(view) {
    if (!log.xsspatched) {
      const UIXssLogWrapper = document.createElement('div');
      UIXssLogWrapper.className = 'xss-wrapper xss-ui-logger';
      log.xsspatched = true;
      const originLogError = log.error;
      log.error = function (msg) {
        xssLog(UIXssLogWrapper, msg, 'xss-ui-logger_error');
        originLogError(msg);
      }.bind(log);
      const originLogWarn = log.warn;
      log.warn = function (msg) {
        xssLog(UIXssLogWrapper, msg, 'xss-ui-logger_warn');
        originLogWarn(msg);
      }.bind(log);
      const originLogInfo = log.info;
      log.info = function (msg) {
        xssLog(UIXssLogWrapper, msg, 'xss-ui-logger_info');
        originLogInfo(msg);
      }.bind(log);

      window.document.body.appendChild(UIXssLogWrapper);
      xssLog(view, 'enable UI logs');
    }
  }

  function restart(view) {
    xssLog(view, 'restart....');
    framework._showFatalErrorWink('reboot', 'xss');
    framework._restartCMU('XSS');
  }

  function xssDestroy() {
    window.xssMounted = false;
    window.XSSwrapper.remove();
    window.XSStoggle.remove();
  }

  function setXSSRegion(view) {
    framework.localize._currentRegion = 'Region_Europe';
    xssLog(view, 'region Region_Europe');
  }

  function action(parent, name, cb, view) {
    const xActionBtn = document.createElement('div');
    xActionBtn.innerHTML = name;
    xActionBtn.className = 'xss-action';
    xActionBtn.addEventListener(
      'mousedown',
      () => {
        view.innerHTML = '';
        cb(view);
      },
      false
    );
    parent.appendChild(xActionBtn);
  }

  function createMenu() {
    const XSSwrapper = document.createElement('div');
    XSSwrapper.className = 'xss-wrapper';
    const XSSactions = document.createElement('div');
    XSSactions.className = 'xss-actions';
    const view = document.createElement('div');
    view.className = 'xss-view';
    XSSwrapper.appendChild(XSSactions);
    XSSwrapper.appendChild(view);

    action(XSSactions, 'Open terminal', terminal, view);
    action(XSSactions, 'Ui logs', UIxssLog, view);
    action(XSSactions, 'Set UI region: EU', setXSSRegion, view);
    action(XSSactions, 'Restart', restart, view);
    action(XSSactions, 'Destroy', xssDestroy, view);

    return XSSwrapper;
  }

  function mount() {
    const wrapper = createMenu();

    const toggle = document.createElement('div');
    toggle.innerHTML = '^';
    toggle.className = 'xss-toggle';
    toggle.addEventListener(
      'mousedown',
      () => {
        window.XSSwrapper.classList.toggle('xss-collapse');
      },
      false
    );
    window.document.body.appendChild(toggle);

    window.document.body.appendChild(wrapper);
    window.xssMounted = true;
    window.XSSwrapper = wrapper;
    window.XSStoggle = toggle;
  }

  let isDevXss = !window.document.body;
  if (isDevXss) {
    if (!window.framework) {
      const framework = {};
      framework.sendEventToMmui = function () {};
    }
    if (!window.log) {
      var log = {
        error(msg) {},
        warn(msg) {},
        info(msg) {},
      };
    }
    window.onload = function run() {
      mount();
      window.xssCssReady = true;
    };
  } else {
    if (!window.xssCssReady) {
      utility.loadCss('../../../mnt/sda1/css/init.css');
      utility.loadCss('../../../mnt/sdb1/css/init.css');
      utility.loadCss('../../../mnt/sdc1/css/init.css');
      utility.loadCss('../../../mnt/sdd1/css/init.css');
      window.xssCssReady = true;
    }
    if (!window.xssMounted) {
      mount();
    }
  }
})(document, window, window.framework, window.log);
