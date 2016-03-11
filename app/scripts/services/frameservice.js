'use strict';

/**
 * @ngdoc service
 * @name initApp.frameService
 * @description
 * # frameService
 * Factory in the initApp.
 ***********
 * 기본 정보
 ***********
 * 바사이즈 최소 barMin
 * 바사이즈 최대 barMax
 * 사이즈 폭 width
 * 사이즈 높이 height
 * 편개/양개 dookType
 * 원클릭 입력 published
 * 종류 type
 * 철판두께 thick
 *
 ***********
 * 가격 정보
 ***********
 * 단가 orgPrice
 * 단가적용시작일 fromDate
 * 단가적용종료일 endDate
 * 부가세별도가격 tax
 * 부가세 taxRate
 * 분체도장 op1
 * 재료분리대 op2
 * 철판마감 op3
 * 바킹 op4
 * 조방 op5
 * 스텐식기 op6
 * 중간바 op7
 * 통식기 op8
 * 전자키타공 op9
 * 정첩 op10
 * 후렘가공 op11
 * 철식기 op12
 * 유리마감 op13
 * 통바 op14
 * 카드키타공 op15
 * 오토파워힌 op16
 *
 * 2/23
 *
 */
angular.module('initApp')
  .factory('FrameService', function ($q, FBURL, $firebaseArray) {
    var framesRef = new Firebase(FBURL).child('frames');
    var frmOptionRef = new Firebase(FBURL).child('frameOptions');

    var onComplete = function(error) {
      if (error) {
        alert('[에러]:'+error);

      } else {
        $location.path('customer');
        alert('성공적으로 저장되었습니다.');
      }
    };
    // Public API here
    return {
      addNewFrame: function (frameObj) {
        var deferred = $q.defer();
        deferred.notify('addNewFrame working with: ' + frameObj.type + '.');
        var newFrame = framesRef.push();
        newFrame.set(frameObj, function(error) {
          if (error) {
            deferred.reject(error);
          } else {
            deferred.resolve('성공적으로 저장되었습니다.')
          }
        });
        return deferred.promise;
      },
      updateFrame: function(frameId, frameObj) {

      },
      deleteFrame: function(frameId){

      },
      findFrame: function(frameId){

      },
      listFrame: function(limit, type){
        return $firebaseArray(framesRef);
      },
      listOptions: function(){
        var deferred = $q.defer();
        $firebaseArray(frmOptionRef).$loaded()
          .then(function(data){
            deferred.resolve(data)
          })
          .catch(function(error) {
            deferred.reject(error);
          });
        return deferred.promise;
      },
      createOptions: function(name){
        var deferred = $q.defer();
        var obj = {name:name, price:0, published: true};
        //deferred.notify('addNewFrame working with: ' + obj.name + '.');
        var newOption = frmOptionRef.child(obj.name)
        newOption.set(obj, function(error) {
          if (error) {
            deferred.reject(error);
          } else {
            deferred.resolve('성공적으로 저장되었습니다.')
          }
        });
        return deferred.promise;
      },
      deleteOptions: function(objId){
        var deferred = $q.defer();
        var target = frmOptionRef.child(objId);
        var onComplete = function(error) {
          if (error) {
            deferred.reject(error);
          } else {
            deferred.resolve('해당 옵션을 삭제 하였습니다.')
          }
        };
        target.remove(onComplete);
        return deferred.promise;
      },
      updateOptions: function(objId, obj){
        var deferred = $q.defer();
        var target = frmOptionRef.child(objId);
        var onComplete = function(error) {
          if (error) {
            deferred.reject(error);
          } else {
            deferred.resolve('해당 옵션을 저장하였습니다.');
          }
        };
        target.update(obj, onComplete);
        return deferred.promise;
      },
    };
  });
