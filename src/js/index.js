const popup = (options) => {

	let defaultSettings = {
  	container: ".popup-container",
    elements: ".popup-element",
    closeElements: ".popup-close",
    animationTime: 400,
    animationType: "ease",
  };

  let settings = Object.assign({}, defaultSettings, options);
  let isOpen = false;
  let modalBg = document.querySelector(".modal-bg");

  const _hasClass = (_el, _cls) => {
    return _el.classList.contains(_cls);
  }

  const _addClass = (_el, _cls) => {
    if(!_hasClass(_el, _cls)) {
      _el.classList.add(_cls);
    }
  }

  const _removeClass = (_el, _cls) => {
    if (_hasClass(_el, _cls)) {
      _el.classList.remove(_cls);
    }
    if (_el.classList.item(0) === null) {
      _el.removeAttribute("class");
    }
  }

  const openPopup = (_el, _popupModal, _content) => {
    let modalContent = _popupModal.querySelector(".modal-content");

    _popupModal.style.width    = _el.offsetWidth + 'px';
    _popupModal.style.height   = _el.offsetHeight + 'px';
    _popupModal.style.top      = _el.getBoundingClientRect().top + 'px';
    _popupModal.style.left     = _el.getBoundingClientRect().left + 'px'
    _popupModal.style.transition = `all .${settings.animationTime}s ${settings.animationType}`;

    /*ВНИМАНИЕ КОСТЫЛЬ*/
   /* popupModal.style.display = "block";
    popupModal.style.visibility = "hidden";
    setTimeout(()=>{
      popupModal.style.visibility = "visible";
      _addClass(popupModal, "open");
    },100)*/

    _popupModal.style.display = "block";
    _popupModal.offsetHeight; // И тут костыль
    _addClass(_popupModal, "open");
  
    setTimeout(() => {
      _addClass(_content, "open");
      modalBg.style.display = "block";
      modalBg.offsetHeight; // И здесь тоже
      _addClass(modalBg, "open");
    },settings.animationTime);

    /*===============*/
  }
  
  const closePopup = (_el, _popupModal, _content) => {
		if(_hasClass(_popupModal, "open")) {
      _removeClass(_popupModal, "open");
      _removeClass(modalBg, "open");
      _removeClass(_content, "open");
    }
    setTimeout(() => {
      _popupModal.style.display = "none";
       modalBg.style.display = "none";
    }, settings.animationTime);
  }
  
  window.onclick = (event) => {
  	let target = event.target;
    let popupId = event.target.dataset.modalId;

    if(_hasClass(target, "popup-element") && isOpen == false) {
      let popupModal = document.querySelector(`.modal[data-id="${popupId}"]`);
      let content = popupModal.querySelector('.modal-content');
    	openPopup(target, popupModal, content);
      isOpen = true;
    }
   
    if(_hasClass(target, "popup-closeIcon") && isOpen == true ) {
    	let activePopup = document.querySelector('.modal.open');
      let content = activePopup.querySelector('.modal-content');
    	closePopup(target, activePopup, content);
      isOpen = false;
    }
  }

}

popup({
	animation: "ease-out"
});