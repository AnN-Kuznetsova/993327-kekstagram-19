'use strict';

(function () {
  var body = document.querySelector('body');
  var pictures = document.querySelector('.pictures');

  var imgUpload = pictures.querySelector('.img-upload'); //  Поле для загрузки нового изображения на сайт
  var uploadFileInput = imgUpload.querySelector('#upload-file');
  var imgUploadOverlay = imgUpload.querySelector('.img-upload__overlay'); //  Форма редактирования изображения
  var uploadCancel = imgUploadOverlay.querySelector('#upload-cancel');

  var scaleControlSmaller = imgUploadOverlay.querySelector('.scale__control--smaller');
  var scaleControlBigger = imgUploadOverlay.querySelector('.scale__control--bigger');
  var effectsRradioButtons = imgUploadOverlay.querySelectorAll('.effects__radio');
  var effectLevel = imgUploadOverlay.querySelector('.effect-level');
  var effectLevelPin = effectLevel.querySelector('.effect-level__pin');

  var imgUploadForm = pictures.querySelector('.img-upload__form');
  var textHashtagsInput = imgUploadForm.querySelector('.text__hashtags');
  var textDescriptionInput = imgUploadForm.querySelector('.text__description');

  //  mountedImgUploadOverlay() - всё добавляет
  var mountedImgUploadOverlay = function () {
    uploadCancel.addEventListener('click', onUploadCancelClick);
    document.addEventListener('keydown', onImgUploadOverlayEscPress);

    scaleControlSmaller.addEventListener('click', onScaleControlSmallerClick);
    scaleControlBigger.addEventListener('click', onScaleControlBiggerClick);

    for (var i = 0; i < effectsRradioButtons.length; i++) {
      effectsRradioButtons[i].addEventListener('change', onEffectsRradioButtonsChange);
    }

    effectLevelPin.addEventListener('mousedown', onSliderPinMouseDown);
    effectLevel.addEventListener('click', onEffectLevelLineClick);
    imgUploadForm.addEventListener('submit', onFormSubmit);
    textHashtagsInput.addEventListener('input', onTextHashtagsInput);
    textDescriptionInput.addEventListener('input', onTextDescriptionInput);
    uploadFileInput.addEventListener('change', onUploadFileInputChange);
  };

  //  destroyedImgUploadOverlay() - всё удаляет
  var destroyedImgUploadOverlay = function () {
    document.removeEventListener('keydown', onImgUploadOverlayEscPress);
  };

  //  Сброс параметров окна редактирования изображени в начальные установки
  var resetImgUploadOverlay = function () {
    uploadFileInput.value = '';
    window.scale.render(window.parameters.scale.DEFAULT);
    window.effect.reset();
    textHashtagsInput.value = '';
    window.validation.hashtags(textHashtagsInput);
    textDescriptionInput.value = '';
    window.validation.description(textDescriptionInput);
  };

  var closeImgUploadOverlay = function () {
    body.classList.remove('modal-open');
    imgUploadOverlay.classList.add('hidden');
    resetImgUploadOverlay();
    destroyedImgUploadOverlay();
    window.windowFocus.focusIn();
  };

  var onUploadCancelClick = function () {
    closeImgUploadOverlay();
  };

  var onImgUploadOverlayEscPress = function (evt) {
    window.util.onPopupEscPress(evt, evt.target, closeImgUploadOverlay);
  };

  var openImgUploadOverlay = function () {
    body.classList.add('modal-open');
    imgUploadOverlay.classList.remove('hidden');
    mountedImgUploadOverlay();
    window.windowFocus.focusOut(imgUpload.querySelector('.img-upload__label'));
    window.effect.reset();
  };


  var onScaleControlSmallerClick = function () {
    window.scale.decrease();
  };

  var onScaleControlBiggerClick = function () {
    window.scale.increase();
  };

  var onEffectsRradioButtonsChange = function (evt) {
    window.effect.set(evt);
  };

  var onSliderPinMouseDown = function (evt) {
    window.slider.onPinMouseDown(evt);
  };

  var onEffectLevelLineClick = function (evt) {
    window.slider.onLineClick(evt);
  };

  var onTextHashtagsInput = function (evt) {
    window.validation.hashtags(evt.target);
  };

  var onTextDescriptionInput = function (evt) {
    window.validation.description(evt.target);
  };

  var onUploadFileInputChange = function (evt) {
    window.validation.uploadFile(evt.target);
  };

  var onFormSubmit = function (evt) {
    evt.preventDefault();
    window.console.log(window.validation.uploadFile(uploadFileInput));
    if (window.validation.uploadFile(uploadFileInput) && window.validation.hashtags(textHashtagsInput) && window.validation.description(textDescriptionInput)) {
      evt.target.submit();
      closeImgUploadOverlay();
    }
  };


  window.uploadForm = openImgUploadOverlay;
})();
